import React, { useState } from "react";
import { Radar } from "react-chartjs-2";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { API_BASE_URL } from "../services/api";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js";

import "./LifestyleGuidance.css";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function LifestyleGuidance() {

  const [input, setInput] = useState({
    age: 25,
    sleep_avg: 3,
    food_avg: 3,
    exercise_avg: 3,
    stress_avg: 3,
    energy_avg: 3,
    water_avg: 3
  });

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: Number(e.target.value)
    });
  };

  const handleSubmit = async () => {

    setLoading(true);
    setResult(null);

    try {

      const res = await fetch(
        `${API_BASE_URL}/lifestyle`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify(input)
        }
      );

      const data = await res.json();

      if (data.success) {
        setResult(data.data);
      } else {
        console.error("Error:", data.message);
      }

    } catch (err) {
      console.error("Request error:", err);
    }

    setLoading(false);
  };

  const getStatusClass = (status) => {

    if (status === "Needs improvement")
      return "status-card status-need";

    if (status === "Moderately balanced")
      return "status-card status-moderate";

    if (status === "Balanced lifestyle")
      return "status-card status-balanced";

    return "status-card";
  };

  // Radar chart data
  const radarData =
    result && result.metrics
      ? {
          labels: [
            "Sleep",
            "Food",
            "Exercise",
            "Stress",
            "Energy",
            "Water"
          ],
          datasets: [
            {
              label: "Your Lifestyle Score",
              data: [
                result.metrics.sleep || 0,
                result.metrics.food || 0,
                result.metrics.exercise || 0,
                result.metrics.stress || 0,
                result.metrics.energy || 0,
                result.metrics.water || 0
              ],
              backgroundColor: "rgba(54,162,235,0.2)",
              borderColor: "rgba(54,162,235,1)",
              borderWidth: 2
            }
          ]
        }
      : null;

  return (

    <div className="lifestyle-container">

      <h1>Lifestyle Guidance AI</h1>

      {/* INPUT SECTION */}

      <div className="input-section">

        <h2>📊 Your Lifestyle Metrics</h2>

        {Object.keys(input).map((key) => (

          <div key={key} className="input-group">

            <label>
              {key.replace("_avg", "").replace("_", " ").toUpperCase()}
            </label>

            <input
              type="number"
              name={key}
              value={input[key]}
              onChange={handleChange}
              min="0"
              max="5"
              title={`Rate your ${key.replace("_avg", "")} level (0-5)`}
            />

          </div>

        ))}

        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "⏳ Analyzing..." : "🚀 Get Guidance"}
        </button>

      </div>

      {/* RESULTS */}

      {result && (

        <div className="result-container">

          <div className={getStatusClass(result.status)}>
            Status: {result.status}
            <br />
            Score: {result.score}
          </div>

          {/* Radar Chart */}

          <div className="chart-container">

            {radarData && <Radar data={radarData} />}

          </div>

          {/* Suggestions */}

          <h3>Suggestions</h3>

          <ul className="suggestions-list">

            {result.suggestions.map((s, i) => (

              <li key={i}>{s}</li>

            ))}

          </ul>

          {/* Gemini Advice */}

          <h3>AI Detailed Advice</h3>

          <div className="advice-cards-container">

            {result.enhancedSuggestions && result.enhancedSuggestions.map((item, i) => (

              <div key={i} className="advice-card">

                <h4>{item.original}</h4>

                <div className="advice-content">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {item.advice}
                  </ReactMarkdown>
                </div>

              </div>

            ))}

          </div>

        </div>

      )}

    </div>
  );
}

export default LifestyleGuidance;