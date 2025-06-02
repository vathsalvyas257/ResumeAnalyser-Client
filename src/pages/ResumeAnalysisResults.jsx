import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, FileText, ArrowRight, User, GraduationCap, Briefcase, Settings, AlertCircle } from "lucide-react";
import {toast} from "react-hot-toast";
import Cookies from "js-cookie"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {uploadResumeSuccess} from "../redux/resumeSlice"
import { resetResume } from "../redux/resumeSlice";
import ProgressBar from "../components/ProgressBar"; // Import your ProgressBar component


const ResumeAnalyzer = () => {
  const API_URL = import.meta.env.VITE_API_URL;
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
  console.log("Resume Result:", resumeResult);

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
    
          const response = await axios.post(`${API_URL}/resume/analyse`, formData, {
            headers: {
              Authorization: `Bearer ${token}`, // Pass the token
              "Content-Type": "multipart/form-data",
            },
          });
          console.log("Response: ",response.data);
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
           console.log("new data: ", newData);
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
  <div className="min-h-screen bg-gray-50 p-6">
    {!uploaded ? (
      <div className="flex justify-center items-start min-h-screen">
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
                <p className="text-sm text-white px-16">{dragActive ? "Drop the file here" : "Drag & drop or click to upload your resume (PDF, DOCX)"}</p>
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
      </div>
    ) : (
      <div className="flex h-screen bg-gray-50">
        {/* Fixed Resume Analysis Sidebar */}
        <aside className="w-[375px] h-[600px] bg-[#256EFF15] rounded-[33px] border-2 border-gray-200 p-6 flex flex-col">
          <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Resume Analysis</h2>
          
          {/* Circular Progress */}
          <div className="flex flex-col items-center mb-4">
            <div className="relative w-36 h-36">
              <CircularProgressbar
                value={resumeResult.analysis.score}
                text=""
                styles={buildStyles({
                  pathColor: "#2563EB",       // Tailwind blue-600
                  trailColor: "#BFDBFE",      // Tailwind blue-200
                  strokeLinecap: "round",
                })}
                strokeWidth={10}
              />

              {/* Centered Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">{resumeResult.analysis.score}/100</span>
                <span className="text-[16px] font-semibold text-blue-600 mt-1">
                  {resumeResult.analysis.score >= 80
                    ? 'Excellent'
                    : resumeResult.analysis.score >= 60
                    ? 'Good'
                    : 'Needs Improvement'}
                </span>
              </div>
            </div>
            <div className="mt-3 text-center w-32">
              <span className="text-lg font-bold text-black">ATS Score</span>
              <hr className="mt-1 border-gray-400" />
            </div>
          </div>
          
          {/* Progress Bars */}
          <ProgressBar sectionScores={sectionScores} /> 
        </aside>

        {/* Scrollable Resume Report Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <h1 className="font-semibold text-[30px] leading-[100%] tracking-[0%] w-full h-[36px] bg-gradient-to-r from-[#256EFF] to-[#164299] text-transparent bg-clip-text font-['Inter'] text-center">Resume Report</h1>
            <div className="space-y-6 max-w-4xl mx-auto">
              {/* Candidate Profile Section */}
              <section className="bg-white rounded-4xl border border-gray-300 border-l-6 border-l-blue-600 p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-b from-[#256EFF] to-[#164299] text-white rounded-full p-2">
                    <User size={25} />
                  </div>

                  <h3 className="text-xl font-bold text-blue-600">Candidate Profile</h3>
                </div>
                <div className="text-gray-700 leading-relaxed space-y-3">
                  <p className="text-sm font-medium text-gray-600">Basic info overview</p>
                  <div className="space-y-1 text-md">
                    <ul className="list-disc list-inside">
                      <li><strong>Name:</strong> [Your Name]</li>
                      <li><strong>Email:</strong> [your.email@example.com]</li>
                      <li><strong>Phone:</strong> +91-XXXXXXXXXX</li>
                      <li><strong>Location:</strong> [City, State]</li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mt-4">
                    <p><strong>ATS Score:</strong> {resumeResult.analysis.score}/100</p>
                    <p><strong>Readability:</strong> {resumeResult.analysis.readabilityScore}/100</p>
                  </div>
                  <p className="text-md mt-3 text-gray-600">{resumeResult.analysis.detailedDescription}</p>
                </div>
              </section>

              {/* Education Section */}
              <section className="bg-white rounded-4xl border border-gray-300 border-l-6 border-l-blue-600 p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-b from-[#256EFF] to-[#164299] text-white rounded-full p-2">
                    <GraduationCap size={25} />
                  </div>
                  <h3 className="text-xl font-bold text-blue-600">Education</h3>
                </div>
                <div className="text-gray-700 text-md leading-relaxed space-y-1">
                  <p className="font-medium text-gray-600">Academic background</p>
                  <p><strong>[Your Degree] - [Your Branch]</strong></p>
                  <p>[University Name] - [Year]</p>
                  <p>CGPA: X.X / 10</p>
                  {/* <p className="mt-3">Based on resume analysis for <strong>{role}</strong> position</p> */}
                </div>
              </section>

              {/* Experience Section */}
              <section className="bg-white rounded-4xl border border-gray-300 border-l-6 border-l-blue-600 p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-b from-[#256EFF] to-[#164299] text-white rounded-full p-2">
                    <Briefcase size={25} />
                  </div>
                  <h3 className="text-xl font-bold text-blue-600">Experience</h3>
                </div>
                <div className="text-gray-700 text-md leading-relaxed space-y-1">
                  <p className="font-medium text-gray-600">Industry / Internship exposure</p>
                  <p><strong>[Role Title] at [Company]</strong></p>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>Handled end-to-end projects in real-world settings.</li>
                    <li>Collaborated with cross-functional teams.</li>
                    <li>Contributed to documentation, development, or design.</li>
                  </ul>
                </div>
              </section>

              {/* Core Skills Section */}
              <section className="bg-white rounded-4xl border border-gray-300 border-l-6 border-l-blue-600 p-5 shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-b from-[#256EFF] to-[#164299] text-white rounded-full p-2">
                    <Settings size={25} />
                  </div>
                  <h3 className="text-xl font-bold text-blue-600">Core Skills</h3>
                </div>
                <div className="text-sm text-gray-700 space-y-3">
                  <p className="font-medium text-gray-600">Technical and soft skills</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold mb-2">Hard Skills:</p>
                      <p>Java, C++, Python, AutoCAD, MATLAB, Analytical, Problem Solving, Logical Thinking</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Soft Skills:</p>
                      <p>Leadership, Public Speaking, Software: MS Office, Figma, Excel</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                    {sectionScores.map((section, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border">
                        <span className="font-semibold">{section.section}:</span>
                        <span className={`font-bold ${section.score > 70 ? 'text-green-600' : section.score > 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {section.score}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Missing Keywords Section */}
              <section className="bg-white rounded-4xl border border-gray-300 border-l-6 border-l-blue-600 p-5 shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-b from-[#256EFF] to-[#164299] text-white rounded-full p-2">
                    <AlertCircle size={25} />
                  </div>
                  <h3 className="text-xl font-bold text-blue-600">Missing Keywords</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">To enhance your resume visibility</p>
                <div className="flex flex-wrap gap-2">
                  {resumeResult.analysis.missingKeywords?.length > 0 ? (
                    resumeResult.analysis.missingKeywords.map((keyword, index) => (
                      <span key={index} className="px-4 py-2 bg-red-100 text-red-600 border border-red-300 rounded-full text-sm font-medium">
                        {keyword}
                      </span>
                    ))
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      <span className="px-4 py-2 bg-red-100 text-red-600 border border-red-300 rounded-full text-sm font-medium">Software Development</span>
                      <span className="px-4 py-2 bg-red-100 text-red-600 border border-red-300 rounded-full text-sm font-medium">Web Development</span>
                      <span className="px-4 py-2 bg-red-100 text-red-600 border border-red-300 rounded-full text-sm font-medium">Full Stack</span>
                      <span className="px-4 py-2 bg-red-100 text-red-600 border border-red-300 rounded-full text-sm font-medium">Problem Solving</span>
                    </div>
                  )}
                </div>
              </section>

              {/* Suggested Career Roles Section */}
              <section className="bg-white rounded-4xl border border-gray-300 border-l-6 border-l-blue-600 p-5 shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-b from-[#256EFF] to-[#164299] text-white rounded-full p-2">
                    <Briefcase size={25} />
                  </div>
                  <h3 className="text-xl font-bold text-blue-600">Suggested Career Roles</h3>
                </div>
                <p className="text-md text-gray-600 mb-4">Matching your resume content</p>
                <div className="text-md text-gray-700">
                  {resumeResult.analysis.suggestedJobs?.length > 0 ? (
                    <ul className="space-y-2">
                      {resumeResult.analysis.suggestedJobs.map((job, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                          {job}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        Graduate Trainee / Engineer
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        Research Assistant / Analyst
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        Software Developer / Engineer
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        Quality / Process Engineer
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        Academic Research Contributor
                      </li>
                    </ul>
                  )}
                </div>
              </section>
            </div>

            {/* Upload New Resume Button */}
            <div className="max-w-4xl mx-auto mt-8">
              <button
                onClick={() => dispatch(resetResume())}
                className="w-full py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm"
              >
                Upload New Resume
              </button>
            </div>
          </div>
        </main>
      </div>
    )}
  </div>
);};

export default ResumeAnalyzer;