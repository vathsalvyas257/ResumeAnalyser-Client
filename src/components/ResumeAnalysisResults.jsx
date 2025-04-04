import "react-circular-progressbar/dist/styles.css";
import "../styles/ResumeAnalysisResults.css";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import React from "react";

const ResumeAnalyzer = ({ scores }) => {
  return (
    <div className="resume-analyzer">
      <div className="score-section">
        <h3>Resume Analysis Results</h3>
        <p>Your resume score and insights</p>
        <div className="main-score">
          <CircularProgressbar
            value={scores.overall}
            text={`${scores.overall}%`}
            styles={buildStyles({
              textColor: "#2c6791	",
              // pathColor: `rgba(62, 122, 189, ${scores.overall / 100})`
              pathColor: "#2b7fb8	",
              trailColor: "#d6d6d6",
              strokeLinecap: 'butt',
              textSize: '16px',
              pathTransitionDuration: 0.5,
            })}
          />
        </div>
      </div>

      <div className="performance-section">
        <h4>Overall Performance</h4>
        <div className="metrics">
          {scores.categories.map((category, index) => (
            <div className="metric" key={index}>
              <CircularProgressbar
                value={category.value}
                text={`${category.value}%`}
                styles={buildStyles({
                  textColor: category.value > 50 ? "#4CAF50" : "#FF5733",
                  pathColor: category.value > 50 ? "#4CAF50" : "#FF5733",
                  trailColor: "#d6d6d6",
                })}
              />
              <p>{category.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
