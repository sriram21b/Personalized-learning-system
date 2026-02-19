import { Link, useNavigate } from "react-router-dom";
import "./index.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-logo">LearnAI</Link>
      </div>

      <div className="nav-links">
        <Link to="/" className="nav-link">Quiz</Link>
        <Link to="/progress" className="nav-link">Progress</Link>
        <Link to="/recommendation" className="nav-link">Recommendation</Link>
      </div>

      <div className="nav-right">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;