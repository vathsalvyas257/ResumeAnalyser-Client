import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, FileText, ArrowRight } from "lucide-react";
import {toast} from "react-hot-toast";
import Cookies from "js-cookie"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {uploadResumeSuccess} from "../redux/resumeSlice"
import { resetResume } from "../redux/resumeSlice";


const ResumeAnalyzer = () => {
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [jobRole, setJobRole] = useState("");
  const [analyzeClicked, setAnalyzeClicked] = useState(false);
  const [scores, setScores] = useState(null);
  const [resume, setResume] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { uploaded, resumeResult, role, sectionScores } = useSelector(state => state.resume);

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeUploaded(true);
      setResume(file);
      setAnalyzeClicked(false); // Reset on new file upload
    }
  };

  const handleAnalyze = async() => {

        if (!resume) {
          toast.error("Please select a resume first!", {duration:2000, position:"bottom-right"});
          return;
        }
    
        setLoading(true);
        // setDisplay(false);
        try {
          // Retrieve the JWT token from cookies
          const token = Cookies.get("token"); // Make sure you set this at login
          console.log(token) 
          if (!token) {
            toast.error(`User not authenticated. Please log in.`, {duration:2000, position:"bottom-right"});
            return;
          }
          // Create FormData to send file
          const formData = new FormData();
          formData.append("resume", resume);
          formData.append("jobDescription",jobRole);
          console.log(resume); // working
          // Send to backend
    
          const response = await axios.post("http://localhost:7777/resume/analyse", formData, {
            headers: {
              Authorization: `Bearer ${token}`, // Pass the token
              "Content-Type": "multipart/form-data",
            },
          });
          console.log(response.data.resume);
          // Set the received response
          setResult(response.data.resume);
          console.log("uploaded:", uploaded)
          // alert(response.data.message);
        
    
          // ✅ Fix: Define data inside useState
           const sectionScores = response.data.sectionScores;
           const newData = Object.keys(sectionScores).map((key) => ({
             section: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize first letter
             score: sectionScores[key],
           }));
           setData(newData); // ✅ Update state
           console.log(newData);
           const DummyResult = response.data.resume;
          const DummyRole = jobRole;
          dispatch(uploadResumeSuccess({DummyRole, DummyResult, newData}));
          toast.success(`${response.data.message}`, {duration:2000, position:"bottom-right"});
        } catch (error) {
          console.error("Error analyzing resume:", error);
          toast.error("Failed to analyze the resume", {duration:2000, position:"bottom-right"});
          toast.error(error.response.data.error,{duration:3000, position:"bottom-right"});
        } finally {
          setLoading(false);
        }

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
      setAnalyzeClicked(true);
    }, 1000);
  };

  // Drag and drop handlers
  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);

    const file = event.dataTransfer.files[0]; // Get the dropped file
    if (file) {
      setResumeUploaded(true);
      setResume(file);
      setAnalyzeClicked(false);
    }
  };

  const handleUploadNewResume = () =>{
    setAnalyzeClicked(false);
  }

  // Return statement updated to use Redux state instead of local state
return (
  <div className="flex justify-center items-start p-5 min-h-screen -mt-6">
    {!uploaded ? (
      <div className="w-full max-w-xl flex flex-col gap-6 items-center">
        {/* Drag & Drop + Click Upload Box */}
        <motion.label
          htmlFor="resume-upload"
          className={`w-80 md:w-126 h-68 bg-[#7F56D9]/70 border ${dragActive ? "border-[#7F56D9] bg-blue-300" : "border-blue-500"} rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-[#7F56D9]/100 transition-all`}
          whileHover={{ scale: 1.05 }}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {resume ? (
            <div className="flex items-center gap-2 text-white">
              <FileText size={24} />
              <span className="text-sm text-[#7F56D9]-300">{resume.name}</span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <UploadCloud size={78} className="text-white mb-2" />
              <p className="text-sm text-white">{dragActive ? "Drop the file here" : "Drag & drop or click to upload your resume (PDF, DOCX)"}</p>
            </div>
          )}
        </motion.label>
        <input
          type="file"
          id="resume-upload"
          className="hidden"
          accept=".pdf,.doc,.docx"
          onChange={handleResumeUpload}
        />

        <div className="w-full">
          <label htmlFor="job-role" className="block text-lg font-medium text-gray-700 mb-2">
            Enter Target Job Role:
          </label>
          <input
            id="job-role"
            type="text"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            placeholder="e.g., Frontend Developer"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7F56D9]"
          />
        </div>

        {resumeUploaded && jobRole.trim() !== "" && (
          <button
            onClick={handleAnalyze}
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition cursor-pointer"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        )}
      </div>
    ) : (
      <div className="w-full max-w-6xl bg-gradient-to-br from-gray-100 to-blue-100 p-6 md:p-8 rounded-lg shadow-md">
        <div className="text-center w-full">
          <h3 className="text-3xl font-bold text-blue-700 mb-2">Resume Analysis for: {role}</h3>
          <p className="text-lg text-blue-700 mb-4">Here's how your resume performs</p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6 w-full">
            <div className="w-64 h-44 animate-fadeIn flex flex-col items-center">
              <CircularProgressbar
                value={resumeResult.analysis.score}
                text={`${resumeResult.analysis.score}%`}
                styles={buildStyles({
                  textColor: "#7F56D9",
                  pathColor: "#7F56D9",
                  trailColor: "#d6d6d6",
                  textSize: "16px",
                  pathTransitionDuration: 0.5,
                })}
              />
              <h4 className="text-xl font-semibold mt-4">ATS Score</h4>
            </div>

            <div className="w-64 h-44 animate-fadeIn flex flex-col items-center">
              <CircularProgressbar
                value={resumeResult.analysis.readabilityScore}
                text={`${resumeResult.analysis.readabilityScore}%`}
                styles={buildStyles({
                  textColor: "#7F56D9",
                  pathColor: "#7F56D9",
                  trailColor: "#d6d6d6",
                  textSize: "16px",
                  pathTransitionDuration: 0.5,
                })}
              />
              <h4 className="text-xl font-semibold mt-4">Readability Score</h4>
            </div>
          </div>

        </div>

        {/* Missing Keywords */}
        <div className="bg-gray-100 p-4 rounded-lg mt-6 text-center">
          <h3 className="text-md font-semibold mb-5">Missing Keywords</h3>
          <div className="flex flex-wrap gap-2 mt-2 justify-center">
            {resumeResult.analysis.missingKeywords?.length > 0 ? (
              resumeResult.analysis.missingKeywords.map((keyword, index) => (
                <span key={index} className="px-3 py-1 bg-red-100 text-red-600 border border-red-300 rounded-full text-sm">
                  {keyword}
                </span>
              ))
            ) : (
              <span className="text-gray-500">No missing keywords found.</span>
            )}
          </div>
        </div>

        {/* Suggested Jobs */}
        <div className="bg-gray-100 p-4 rounded-lg text-center mt-2">
          <h3 className="text-md font-semibold mb-5">Suggested Jobs</h3>
          <div className="flex flex-wrap gap-2 mt-2 justify-center">
            {resumeResult.analysis.suggestedJobs?.length > 0 ? (
              resumeResult.analysis.suggestedJobs.map((keyword, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-600 border border-blue-500 rounded-full text-sm">
                  {keyword}
                </span>
              ))
            ) : (
              <span className="text-gray-500">No suggested jobs available.</span>
            )}
          </div>
        </div>

        {/* Section Wise Score */}
        <div className="w-full text-center mt-16">
          <h4 className="text-2xl font-semibold text-gray-800">Section Wise Score</h4>
          <div className="flex flex-wrap justify-center items-center gap-5 p-3">
            {sectionScores.map((category, index) => (
              <div
                className="w-44 text-center p-4 rounded-lg bg-white shadow-md transform transition-transform duration-300 hover:-translate-y-1"
                key={index}
              >
                <CircularProgressbar
                  value={category.score}
                  text={`${category.score}%`}
                  styles={buildStyles({
                    textColor: category.score > 50 ? "#4CAF50" : "#FF5733",
                    pathColor: category.score > 50 ? "#4CAF50" : "#FF5733",
                    trailColor: "#d6d6d6",
                  })}
                />
                <p className="text-sm mt-2 font-bold text-gray-700">{category.section}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Detailed Description */}
        <div className="bg-gray-100 p-4 rounded-lg mt-2 text-center">
          <h3 className="text-md font-semibold mb-5">Detailed Description</h3>
          <p className="text-gray-700 whitespace-pre-line">{resumeResult.analysis.detailedDescription}</p>
        </div>
        <button
            onClick={() => dispatch(resetResume())}
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition mt-6 cursor-pointer"
          >
            Upload New Resume
          </button>
      </div>
    )}
  </div>
);}

export default ResumeAnalyzer;