import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import QuizForm from "./components/QuizForm";
import ProgressDashboard from "./components/ProgressDashboard";
import RecommendationCard from "./components/RecommendationCard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔓 Public */}
        <Route path="/login" element={<LoginForm />} />

        {/* 🔒 Protected */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <QuizForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/progress"
          element={
            <ProtectedRoute>
              <ProgressDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recommendation"
          element={
            <ProtectedRoute>
              <RecommendationCard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;