import "react-circular-progressbar/dist/styles.css";
import "../styles/ResumeAnalysisResults.css";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import React, { useState } from "react";

const ResumeAnalyzer = () => {
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [scores, setScores] = useState(null);

  // Dummy API simulation
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Simulate API call
      const dummyResumeScore = {
        overall: 78.6,
        categories: [
          { label: "Skills", value: 85.2 },
          { label: "Experience", value: 65.7 },
          { label: "Education", value: 38.3 },
        ],
      };

      setTimeout(() => {
        setScores(dummyResumeScore);
        setResumeUploaded(true);
      }, 1000);
    }
  };

  return (
    <div className="analyzer-wrapper">
      {!resumeUploaded ? (
        <div className="upload-container">
        <div className="upload-box">
          <div className="upload-icon">📄</div>
          <h2>Upload Your Resume</h2>
          <p>Accepted formats: PDF, DOC, DOCX</p>
          <label htmlFor="resume-upload" className="upload-button">
            Select File
          </label>
          <input
            id="resume-upload"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleResumeUpload}
            className="upload-input"
          />
        </div>
      </div>
      
      ) : (
        <>
          <div className="resume-analyzer">
            <div className="score-section">
              <h3>Resume Analysis Results</h3>
              <p>Your resume score and insights</p>
              <div className="main-score">
                <CircularProgressbar
                  value={scores.overall}
                  text={`${scores.overall}%`}
                  styles={buildStyles({
                    textColor: "#2c6791",
                    pathColor: "#2b7fb8",
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

          <div className="plain-box"></div>
        </>
      )}
    </div>
  );
};

export default ResumeAnalyzer;

