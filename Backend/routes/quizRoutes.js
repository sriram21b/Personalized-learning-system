const express = require("express");
const router = express.Router();
const db = require("../db");

// AI helper functions

const questionTopicMap = {
  1: { topic: "Data Structures", video: "https://youtu.be/B31LgI4Y4DQ" },
  2: { topic: "Algorithms", video: "https://youtu.be/P3YID7liBug" },
  3: { topic: "React", video: "https://youtu.be/bMknfKXIFA8" },
  4: { topic: "JavaScript", video: "https://youtu.be/W6NZfCO5SIk" },
  5: { topic: "HTML", video: "https://youtu.be/UB1O30fR-EE" },
  6: { topic: "JavaScript", video: "https://youtu.be/W6NZfCO5SIk" },
  7: { topic: "CSS", video: "https://youtu.be/yfoY53QXEnI" },
  8: { topic: "JavaScript Arrays", video: "https://youtu.be/R8rmfD9Y5-c" },
  9: { topic: "React", video: "https://youtu.be/bMknfKXIFA8" },
  10: { topic: "HTTP", video: "https://youtu.be/iYM2zFP3Zn0" },
  11: { topic: "React Hooks", video: "https://youtu.be/TNhaISOUy6Q" },
  12: { topic: "SQL", video: "https://youtu.be/HXV3zeQKqGY" },
  13: { topic: "JavaScript", video: "https://youtu.be/W6NZfCO5SIk" },
  14: { topic: "CSS Grid", video: "https://youtu.be/jV8B24rSN5o" },
  15: { topic: "HTTP", video: "https://youtu.be/iYM2zFP3Zn0" },
};

function getLevel(accuracy) {
  if (accuracy < 0.4) return "Beginner";
  if (accuracy < 0.75) return "Intermediate";
  return "Advanced";
}

function adjustDifficulty(accuracy) {
  if (accuracy < 0.4) return "Decrease";
  if (accuracy < 0.75) return "Maintain";
  return "Increase";
}

// MAIN API — submit quiz

router.post("/quiz/submit", async (req, res) => {
  try {
    const { user_id, topic_id, score, total_questions, wrong_questions } = req.body;

  
    if (
      user_id === undefined ||
      topic_id === undefined ||
      score === undefined ||
      total_questions === undefined
    ) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    const accuracy = score / total_questions;
    const level = getLevel(accuracy);
    const difficulty = adjustDifficulty(accuracy);

    // insert quiz attempt
    const insertQuiz = `
      INSERT INTO quiz_attempts
      (user_id, topic_id, score, total_questions, accuracy)
      VALUES (?, ?, ?, ?, ?)
    `;

    await db
      .promise()
      .query(insertQuiz, [
        user_id,
        topic_id,
        score,
        total_questions,
        accuracy,
      ]);

    // smart recommendation based on wrong answers
    let recommendedTopic = accuracy < 0.5 ? "Basics Revision" : "Advanced Practice";
    let recommendedVideo = "";

    if (wrong_questions && wrong_questions.length > 0) {
      const firstWrong = wrong_questions[0];
      const rec = questionTopicMap[firstWrong];
      if (rec) {
        recommendedTopic = rec.topic;
        recommendedVideo = rec.video;
      }
    }

    const insertRec = `
      INSERT INTO recommendations
      (user_id, recommended_topic, difficulty_adjustment)
      VALUES (?, ?, ?)
    `;

    await db
      .promise()
      .query(insertRec, [user_id, recommendedTopic, difficulty]);

    return res.json({
      message: "Quiz submitted successfully",
      accuracy,
      level,
      recommended_topic: recommendedTopic,
      recommended_video: recommendedVideo,
      difficulty_adjustment: difficulty,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Server error",
    });
  }
});

router.get("/progress/:userId", async(req, res) => {
    try{
        const {userId} = req.params;
        const userProgressQuery = `
        SELECT
        COUNT(*) AS total_attempts,
        AVG(accuracy) AS average_accuracy
        FROM quiz_attempts
        WHERE user_id = ?
        `;
        const [rows] = await db.promise().query(userProgressQuery, [userId])

        const totalAttempts = rows[0].total_attempts || 0;
        const avgAccuracy = rows[0].average_accuracy || 0;
        let level = "Beginner";

if (avgAccuracy >= 0.75) {
  level = "Advanced";
} else if (avgAccuracy >= 0.4) {
  level = "Intermediate";
}

res.json({
  user_id: userId,
  total_attempts: totalAttempts,
  average_accuracy: avgAccuracy,
  level: level
});
    }
    catch(error){
        console.log(error)
        res.status(500).json({error: "Server error"})
    }
    
})

router.get("/recommendations/:userId", async (req, res) => {
  try {
const { userId } = req.params;
const recommendationQuery = `
  SELECT recommended_topic, difficulty_adjustment
  FROM recommendations
  WHERE user_id = ?
  ORDER BY created_at DESC
  LIMIT 1
`;

const [rows] = await db.promise().query(recommendationQuery, [userId]);
if (rows.length === 0) {
  return res.json({
    user_id: userId,
    recommended_topic: "No recommendation yet",
    recommended_video: "",
  });
}

const topic = rows[0].recommended_topic;
const video = Object.values(questionTopicMap).find(
  (item) => item.topic === topic
)?.video || "";

res.json({
  user_id: userId,
  recommended_topic: topic,
  recommended_video: video,
  difficulty_adjustment: rows[0].difficulty_adjustment,
});

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
module.exports = router;