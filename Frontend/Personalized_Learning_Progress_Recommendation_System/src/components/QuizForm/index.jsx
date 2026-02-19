import { Component } from "react";
import BASE_URL from "../../api";
import Navbar from "../Navbar";
import "./index.css";

class QuizForm extends Component {
  state = {
    answers: {},
    result: null,
  };

  
  getUserId = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.user_id;
  };

  
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
    {
      id: 4,
      question: "Which keyword is used to declare a constant in JavaScript?",
      options: ["let", "var", "const", "static"],
      answer: "const",
    },
    {
      id: 5,
      question: "Which HTML tag is used for the largest heading?",
      options: ["<h6>", "<heading>", "<h1>", "<head>"],
      answer: "<h1>",
    },
    {
      id: 6,
      question: "Which method converts JSON to a JavaScript object?",
      options: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "JSON.toObject()"],
      answer: "JSON.parse()",
    },
    {
      id: 7,
      question: "Which CSS property controls text size?",
      options: ["font-style", "text-size", "font-size", "text-style"],
      answer: "font-size",
    },
    {
      id: 8,
      question: "Which array method adds an element to the end?",
      options: ["push()", "pop()", "shift()", "unshift()"],
      answer: "push()",
    },
    {
      id: 9,
      question: "Which company developed React?",
      options: ["Google", "Facebook", "Microsoft", "Amazon"],
      answer: "Facebook",
    },
    {
      id: 10,
      question: "Which HTTP status code means 'Not Found'?",
      options: ["200", "301", "404", "500"],
      answer: "404",
    },
    {
      id: 11,
      question: "Which hook is used for side effects in React?",
      options: ["useState", "useEffect", "useContext", "useMemo"],
      answer: "useEffect",
    },
    {
      id: 12,
      question: "Which SQL command is used to retrieve data?",
      options: ["GET", "SELECT", "FETCH", "OPEN"],
      answer: "SELECT",
    },
    {
      id: 13,
      question: "Which JavaScript function converts string to integer?",
      options: ["parseInt()", "toString()", "Number.toInt()", "int()"],
      answer: "parseInt()",
    },
    {
      id: 14,
      question: "Which CSS layout uses rows and columns?",
      options: ["Flexbox", "Grid", "Float", "Inline"],
      answer: "Grid",
    },
    {
      id: 15,
      question: "Which protocol is used to transfer web pages?",
      options: ["FTP", "SMTP", "HTTP", "TCP"],
      answer: "HTTP",
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

    const userId = this.getUserId();
    const topicId = 1;

    if (!userId) {
      alert("Please login first");
      return;
    }

    let score = 0;
    const total = this.questions.length;
    const wrongQuestions = [];

    this.questions.forEach((q) => {
      if (answers[q.id] === q.answer) {
        score++;
      } else {
        wrongQuestions.push(q.id);
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
          wrong_questions: wrongQuestions,
        }),
      });

      const data = await response.json();
      this.setState({
        result: {
          ...data,
          score,
          total_questions: total,
        },
      });
    } catch (error) {
      console.error(error);
      alert("Failed to submit quiz");
    }
  };

  render() {
    const { result } = this.state;

    return (
      <>

        <Navbar />

        <div className="quiz-page">
          <div className="quiz-container">
          <h2 className="quiz-title">Quiz</h2>

          {this.questions.map((q) => (
            <div key={q.id} className="question-card">
              <p>
                <strong>{q.question}</strong>
              </p>

              {q.options.map((opt) => {
                const isSelected =
                  this.state.answers[q.id] === opt;
                const isCorrect = opt === q.answer;
                const showResult = result !== null;

                return (
                  <label
                    key={opt}
                    className={`option-label ${
                      showResult && isCorrect ? "correct-option" : ""
                    } ${
                      showResult && isSelected && !isCorrect
                        ? "wrong-option"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={opt}
                      checked={isSelected}
                      disabled={showResult}
                      onChange={(e) =>
                        this.handleOptionChange(q.id, e.target.value)
                      }
                    />{" "}
                    {opt}
                  </label>
                );
              })}

              {result && (
                <p className="answer-text">
                  Correct Answer: <span><strong>{q.answer}</strong></span>                </p>
              )}
            </div>
          ))}

          <button className="submit-btn" onClick={this.handleSubmit}>
            Submit Quiz
          </button>
        </div>

        {result && (
          <div className="result-box">
            <p>
              <strong>Message:</strong> {result.message}
            </p>
            <p>
              <strong>Accuracy:</strong> {result.accuracy}
            </p>
            <p>
              <strong>Score:</strong> {result.score} / {result.total_questions}
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
            {result.recommended_video && (
              <p>
                <strong>Recommended Video:</strong>{" "}
                <a
                  href={result.recommended_video}
                  target="_blank"
                  rel="noreferrer"
                >
                  Watch Here
                </a>
              </p>
            )}
          </div>
        )}
        </div>
      </>
    );
  }
}

export default QuizForm;