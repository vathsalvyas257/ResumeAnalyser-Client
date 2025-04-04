import "../styles/ResumeAnalysisResults.css";

import React from "react";

const ResumeAnalysisResults = () => {
  const performanceMetrics = [
    { label: "ATS Compatibility", score: 55.2, color: "#f4a261" },
    { label: "Keyword Optimization", score: 89.3, color: "#2a9d8f" },
    { label: "Content Quality", score: 95.3, color: "#4caf50" },
    { label: "Structure & Formatting", score: 38.9, color: "#e63946" },
  ];

  return (
    <div className="resume-analysis-container">
      {/* Title Section */}
      <div className="title-section">
        <h2>Resume Analysis Results</h2>
        <p>Your resume score and insights</p>
      </div>

      {/* Main Resume Score */}
      <div className="main-score">
        <div className="progress-circle large" style={{ "--percentage": 78.6, "--color": "#007bff" }}>
          <div className="progress-background"></div>
          <div className="progress-fill"></div>
          <span className="progress-text">78.6%</span>
        </div>
      </div>

      {/* Overall Performance Section */}
      <h3>Overall Performance</h3>
      <div className="performance-metrics">
        {performanceMetrics.map((metric, index) => (
          <div key={index} className="metric">
            <div 
              className="progress-circle small" 
              style={{ "--percentage": metric.score, "--color": metric.color }}
            >
              <div className="progress-background"></div>
              <div className="progress-fill"></div>
              <span className="progress-text">{metric.score}%</span>
            </div>
            <p>{metric.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeAnalysisResults;
