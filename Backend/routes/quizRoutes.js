const express = require("express");
const router = express.Router();
const db = require("../db");

// 🧠 AI helper functions

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

// 🚀 MAIN API — submit quiz

router.post("/quiz/submit", async (req, res) => {
  try {
    const { user_id, topic_id, score, total_questions } = req.body;

    // ✅ validation
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

    // ✅ insert quiz attempt
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

    // ✅ simple recommendation logic
    const recommendedTopic =
      accuracy < 0.5 ? "Basics Revision" : "Advanced Practice";

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
        AVG(accuracy) AS avg_accuracy
        FROM quiz_attempts
        WHERE user_id = ?
        `;
        const [rows] = await db.promise().query(userProgressQuery, [userId])

        const totalAttempts = rows[0].total_attempts || 0;
        const avgAccuracy = rows[0].avg_accuracy || 0;
        let level = "Beginner";

if (avgAccuracy >= 0.75) {
  level = "Advanced";
} else if (avgAccuracy >= 0.4) {
  level = "Intermediate";
}

res.json({user_id: 
    userId, total_attempts: totalAttempts, avg_accuracy: avgAccuracy, current_level: level
})
    }
    catch(error){
        console.log(error)
        res.status(500).json({error: "Server error"})
    }
    
})

router.get("/recommendation/:userId", async (req, res) => {
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
  return res.json({ message: "No recommendations yet" });
}

res.json({
  user_id: userId,
  recommended_topic: rows[0].recommended_topic,
  difficulty_adjustment: rows[0].difficulty_adjustment,
});

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
module.exports = router;