import { motion } from "framer-motion";
import { UploadCloud, FileText } from "lucide-react";

const ResumeUploadForm = ({
  resume,
  setResume,
  handleResumeUpload,
  handleDragOver,
  handleDragEnter,
  handleDragLeave,
  handleDrop,
  dragActive,
  jobRole,
  setJobRole,
  handleAnalyze,
  resumeUploaded,
  loading,
}) => {
  return (
    <div className="flex justify-center items-start min-h-screen">
      <div className="w-full max-w-xl flex flex-col gap-6 items-center">
        {/* Drag & Drop + Click Upload Box */}
        <motion.label
          htmlFor="resume-upload"
          className={`w-80 md:w-126 h-68 bg-[#7F56D9]/70 border ${
            dragActive ? "border-[#7F56D9] bg-blue-300" : "border-blue-500"
          } rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-[#7F56D9]/100 transition-all ${
            loading ? "pointer-events-none opacity-60" : ""
          }`}
          whileHover={!loading ? { scale: 1.05 } : {}}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {resume ? (
            <div className="flex items-center gap-2 text-white">
              <FileText size={24} />
              <span className="text-sm">{resume.name}</span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <UploadCloud size={78} className="text-white mb-2" />
              <p className="text-sm text-white px-16">
                {dragActive
                  ? "Drop the file here"
                  : "Drag & drop or click to upload your resume (PDF, DOCX)"}
              </p>
            </div>
          )}
        </motion.label>

        {/* Hidden file input */}
        <input
          type="file"
          id="resume-upload"
          className="hidden"
          accept=".pdf,.doc,.docx"
          onChange={handleResumeUpload}
          disabled={loading}
        />

        {/* Job Role Input */}
        <div className="w-full">
          <label
            htmlFor="job-role"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Enter Target Job Role:
          </label>
          <input
            id="job-role"
            type="text"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            placeholder="e.g., Frontend Developer"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7F56D9]"
            disabled={loading}
          />
        </div>

        {/* Analyze Button */}
        {resumeUploaded && jobRole.trim() !== "" && (
          <button
            onClick={handleAnalyze}
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition cursor-pointer disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ResumeUploadForm;
