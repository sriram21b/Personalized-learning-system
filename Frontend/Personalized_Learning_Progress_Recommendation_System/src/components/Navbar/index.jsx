import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import profileImg from "../../assets/profile.avif";

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

      <Link to='/profile' >
      <div className="nav-right">
        <button className="Profile-section">
         <img className='profile-img' src={profileImg}></img>
        </button>
      </div>
      </Link>
    </nav>
  );
};

export default Navbar;