import { Component } from "react";
import BASE_URL from "../../api";
import "./index.css";
import Navbar from "../Navbar";

class RecommendationCard extends Component {
  state = {
    recommendation: null,
  };

  
  getUserId = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.user_id;
  };

  fetchRecommendation = async () => {
    try {
      const userId = this.getUserId();

      if (!userId) {
        alert("Please login first");
        return;
      }

      const response = await fetch(
        `${BASE_URL}/recommendations/${userId}`
      );

      
      if (!response.ok) {
        console.error("Recommendation API failed:", response.status);
        alert("Failed to fetch recommendation");
        return;
      }

      const data = await response.json();
      console.log("Recommendation data:", data);

      this.setState({ recommendation: data });
    } catch (error) {
      console.error("Recommendation fetch error:", error);
      alert("Failed to fetch recommendation");
    }
  };

  componentDidMount() {
    this.fetchRecommendation();
  }

  render() {
    const { recommendation } = this.state;

    return (
      <>
        <Navbar />
        <div className="recommend-container">
          <h2 className="recommend-title">Personalized Recommendation</h2>

          <button
            className="recommend-btn"
            onClick={this.fetchRecommendation}
          >
            Refresh Recommendation
          </button>

          {recommendation && (
            <div className="recommend-card">
              <p>
                <strong>Recommended Topic:</strong>{" "}
                {recommendation.recommended_topic}
              </p>

              {recommendation.recommended_video && (
                <p>
                  <strong>Recommended Video:</strong>{" "}
                  <a
                    href={recommendation.recommended_video}
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

export default RecommendationCard;