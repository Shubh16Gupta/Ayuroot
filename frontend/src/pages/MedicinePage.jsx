import React, { useState } from "react";
import { API_BASE_URL } from "../services/api";
import "./MedicinePage.css";

function MedicinePage() {
  const [symptom, setSymptom] = useState("");
  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!symptom.trim()) return setError("Please enter a symptom");

    setError("");
    setLoading(true);
    setMedicine(null);

    try {
      const res = await fetch(`${API_BASE_URL}/medicine/recommend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ symptom })
      });

      const data = await res.json();
      if (data.success) {
        setMedicine(data.medicine);
      } else {
        setError(data.message || "No recommendation found");
      }

    } catch (err) {
      console.error(err);
      setError("Server error. Try again.");
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="medicine-page">
      <div className="medicine-container">
        <div className="medicine-header">
          <h1>💊 Ayurvedic Medicine Finder</h1>
          <p>Enter your symptom to get AI-powered medicine recommendations</p>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="e.g., headache, cold, digestion, joint pain..."
            value={symptom}
            onChange={e => setSymptom(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <button onClick={handleSearch} disabled={loading} className="search-btn">
            {loading ? "🔍 Searching..." : "🔍 Search"}
          </button>
        </div>

        {error && <p className="error-message">⚠️ {error}</p>}

        {medicine && (
          <div className="medicine-result">
            <div className="result-header">
              <h2>💚 {medicine.name}</h2>
            </div>

            <div className="result-content">
              <div className="result-field">
                <h3>📋 Description</h3>
                <p>{medicine.description}</p>
              </div>

              <div className="result-field">
                <h3>⚕️ Dosage</h3>
                <p>{medicine.dosage}</p>
              </div>

              <div className="result-field">
                <h3>🌿 Ingredients</h3>
                <p>{medicine.ingredients}</p>
              </div>

              <div className="result-field">
                <h3>✨ Benefits</h3>
                <p>{medicine.benefits}</p>
              </div>

              <div className="result-field">
                <h3>⚠️ Precautions</h3>
                <p>{medicine.precautions}</p>
              </div>

              <a 
                href={medicine.buyLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="buy-button"
              >
                🛒 Buy on Amazon
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MedicinePage;