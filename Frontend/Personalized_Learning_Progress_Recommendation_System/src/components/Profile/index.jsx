import { Component } from "react";
import Navbar from "../Navbar";
import "./index.css";


class Profile extends Component {
  getUser = () => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  };

  handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  render() {
    const user = this.getUser();

    return (
      <>
        <Navbar />
        <div className="profile-container">
          <h2 className="profile-title">My Profile</h2>

          <div className="profile-card">
            <p>
              <strong>Name:</strong>{" "}
              {user?.name || "N/A"}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              {user?.email || "N/A"}
            </p>

            <button
              className="profile-logout-btn"
              onClick={this.handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Profile;