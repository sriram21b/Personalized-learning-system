import { Component } from "react";
import BASE_URL from "../../api";
import "./index.css"


class QuizForm extends Component {
  state = {
    answers: {},
    result: null,
  };

  userId = 1;
  topicId = 1;

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

  handleOptionChange = (questionId, value) => {
  this.setState((prev) => ({
    answers: {
      ...prev.answers,
      [questionId]: value,
    },
  }));
};


  handleSubmit = async () => {
  const { answers } = this.state;

  let score = 0;
  const total = this.questions.length;

  this.questions.forEach((q) => {
    if (answers[q.id] === q.answer) {
      score++;
    }
  });

  const response = await fetch(`${BASE_URL}/quiz/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: this.userId,
      topic_id: this.topicId,
      score,
      total_questions: total,
    }),
  });

  const data = await response.json();
  this.setState({ result: data });
};

  render() {
    const { result } = this.state;

    return (
      <div className="quiz-container">
        <h2 className="quiz-title">Mini Quiz</h2>

        {this.questions.map((q) => (
          <div key={q.id} className="question-card">
            <p><strong>{q.question}</strong></p>

            {q.options.map((opt) => (
              <label key={opt} className="option-label">
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  value={opt}
                  onChange={(e) =>
                    this.handleOptionChange(q.id, e.target.value)
                  }
                />
                {" "}{opt}
              </label>
            ))}
          </div>
        ))}

        <button className="submit-btn" onClick={this.handleSubmit}>Submit Quiz</button>

        {result && (
          <div className="result-box">
            <p><strong>Message:</strong> {result.message}</p>
            <p><strong>Accuracy:</strong> {result.accuracy}</p>
            <p><strong>Level:</strong> {result.level}</p>
            <p><strong>Recommended Topic:</strong> {result.recommended_topic}</p>
            <p><strong>Difficulty Adjustment:</strong> {result.difficulty_adjustment}</p>
          </div>
        )}
      </div>
    );
  }
}

export default QuizForm;