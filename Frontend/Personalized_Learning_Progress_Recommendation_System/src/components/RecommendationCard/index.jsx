import { Component } from "react";
import BASE_URL from "../../api";
import "./index.css"


class RecommendationCard extends Component {
  state = {
    recommendation: null,
  };

  userId = 1;

  fetchRecommendation = async () => {
    const response = await fetch(
      `${BASE_URL}/recommendation/${this.userId}`
    );
    const data = await response.json();
    this.setState({ recommendation: data });
  };

  render() {
    const { recommendation } = this.state;

    return (
      <div className="recommend-container">
        <h2 className="recommend-title">Recommendation</h2>
        <button className="recommend-btn" onClick={this.fetchRecommendation}>
          Get Recommendation
        </button>

        {recommendation && (
          <pre>{JSON.stringify(recommendation, null, 2)}</pre>
        )}
      </div>
    );
  }
}

export default RecommendationCard;