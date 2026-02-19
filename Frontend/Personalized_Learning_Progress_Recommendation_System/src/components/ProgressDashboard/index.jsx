import { Component } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import BASE_URL from "../../api";
import Navbar from "../Navbar";
import "./index.css";

class ProgressDashboard extends Component {
  state = {
    progress: null,
    chartData: [],
  };

  // 🔐 dynamic user
  getUserId = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.user_id;
  };

  fetchProgress = async () => {
    try {
      const userId = this.getUserId();
      if (!userId) {
        alert("Please login first");
        return;
      }

      const response = await fetch(`${BASE_URL}/progress/${userId}`);
      const data = await response.json();

      const avgAcc = parseFloat(data.average_accuracy) || 0;
      const accuracyPercent = Number((avgAcc * 100).toFixed(2));

      console.log("Attempts:", data.total_attempts);
      console.log("Accuracy %:", accuracyPercent);

      const chartData = [
        {
          name: "Attempts",
          value: Number(data.total_attempts || 0),
        },
        {
          name: "Accuracy %",
          value: accuracyPercent,
        },
      ];

      this.setState({ progress: data, chartData });
    } catch (error) {
      console.error(error);
      alert("Failed to fetch progress");
    }
  };

  componentDidMount() {
    this.fetchProgress();
  }

  render() {
    const { progress, chartData } = this.state;

    return (
      <>
        <Navbar />
<div className="progress-bg-container">
        <div className="progress-container">
          <h2 className="progress-title">Progress Dashboard</h2>

          <button className="progress-btn" onClick={this.fetchProgress}>
            Refresh Progress
          </button>

          {progress && (
            <>
              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart
                    data={chartData}
                    margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Bar
                      dataKey="value"
                      fill="#2563eb"
                      radius={[6, 6, 0, 0]}
                      isAnimationActive={false}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </div>
        </div>
      </>
    );
  }
}

export default ProgressDashboard;