import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import QuizForm from "./components/QuizForm";
import ProgressDashboard from "./components/ProgressDashboard";
import RecommendationCard from "./components/RecommendationCard";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/login" element={<LoginForm />} />

        
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <QuizForm />
            </ProtectedRoute>
          }
        />
<Route path="/profile" element={
  <ProtectedRoute>
  
  <Profile/>
  </ProtectedRoute>
}/>
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