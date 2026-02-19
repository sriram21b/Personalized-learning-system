import { Component } from "react";
import BASE_URL from "../../api";
import Navbar from "../Navbar";
import "./index.css";

class QuizForm extends Component {
  state = {
    answers: {},
    result: null,
  };

  // 🔐 get logged-in user
  getUserId = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.user_id;
  };

  // 🧠 quiz questions
  questions = [
    {
      id: 1,
      question: "Which data structure uses FIFO?",
      options: ["Stack", "Queue", "Tree", "Graph"],
      answer: "Queue",
    },
    {
      id: 2,
      question: "Which has O(log n) search?",
      options: ["Binary Search", "Linear Search", "Bubble Sort", "DFS"],
      answer: "Binary Search",
    },
    {
      id: 3,
      question: "React is mainly used for?",
      options: ["Database", "UI", "Networking", "OS"],
      answer: "UI",
    },
  ];

  // ✅ handle option select
  handleOptionChange = (questionId, value) => {
    this.setState((prev) => ({
      answers: {
        ...prev.answers,
        [questionId]: value,
      },
    }));
  };

  // 🚀 submit quiz
  handleSubmit = async () => {
    const { answers } = this.state;

    const userId = this.getUserId();
    const topicId = 1;

    if (!userId) {
      alert("Please login first");
      return;
    }

    let score = 0;
    const total = this.questions.length;

    this.questions.forEach((q) => {
      if (answers[q.id] === q.answer) {
        score++;
      }
    });

    try {
      const response = await fetch(`${BASE_URL}/quiz/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          topic_id: topicId,
          score,
          total_questions: total,
        }),
      });

      const data = await response.json();
      this.setState({ result: data });
    } catch (error) {
      console.error(error);
      alert("Failed to submit quiz");
    }
  };

  render() {
    const { result } = this.state;

    return (
      <>
        {/* 🔥 NAVBAR AT TOP */}
        <Navbar />

        <div className="quiz-container">
          <h2 className="quiz-title">Mini Quiz</h2>

          {this.questions.map((q) => (
            <div key={q.id} className="question-card">
              <p>
                <strong>{q.question}</strong>
              </p>

              {q.options.map((opt) => (
                <label key={opt} className="option-label">
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={opt}
                    onChange={(e) =>
                      this.handleOptionChange(q.id, e.target.value)
                    }
                  />{" "}
                  {opt}
                </label>
              ))}
            </div>
          ))}

          <button className="submit-btn" onClick={this.handleSubmit}>
            Submit Quiz
          </button>

          {result && (
            <div className="result-box">
              <p>
                <strong>Message:</strong> {result.message}
              </p>
              <p>
                <strong>Accuracy:</strong> {result.accuracy}
              </p>
              <p>
                <strong>Level:</strong> {result.level}
              </p>
              <p>
                <strong>Recommended Topic:</strong>{" "}
                {result.recommended_topic}
              </p>
              <p>
                <strong>Difficulty Adjustment:</strong>{" "}
                {result.difficulty_adjustment}
              </p>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default QuizForm;