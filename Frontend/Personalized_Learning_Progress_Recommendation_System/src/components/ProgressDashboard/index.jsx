import { Component } from "react";
import BASE_URL from "../../api";
import Navbar from "../Navbar";
import "./index.css"


class ProgressDashboard extends Component {
  state = {
    progress: null,
  };

  userId = 1;

  fetchProgress = async () => {
    const response = await fetch(
      `${BASE_URL}/progress/${this.userId}`
    );
    const data = await response.json();
    this.setState({ progress: data });
  };

  render() {
    const { progress } = this.state;

    return (
      <>
      <Navbar/>
      <div className="progress-container">
        <h2 className="progress-title">Progress Dashboard</h2>
        <button className="progress-btn" onClick={this.fetchProgress}>Get Progress</button>

        {progress && <pre>{JSON.stringify(progress, null, 2)}</pre>}
      </div>
      </>
    );
  }
}

export default ProgressDashboard;