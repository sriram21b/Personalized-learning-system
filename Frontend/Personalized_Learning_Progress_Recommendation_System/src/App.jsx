import QuizForm from "./components/QuizForm";
import ProgressDashboard from "./components/ProgressDashboard";
import RecommendationCard from "./components/RecommendationCard";

function App() {
  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Personalized Learning System 🚀</h1>

      <QuizForm />
      <hr />
      <ProgressDashboard />
      <hr />
      <RecommendationCard />
    </div>
  );
}

export default App;