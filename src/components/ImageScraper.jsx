import { useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, FileText, ArrowRight } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";

const ImageScraper = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [display, setDisplay] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

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
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleAnalyzeImage = async () => {
    if (!selectedFile) {
      alert("Please select an image first!");
      return;
    }

    setLoading(true);
    setDisplay(false);
    try {
      const token = Cookies.get("token");
      if (!token) {
        alert("User not authenticated. Please log in again.");
        return;
      }

      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await axios.post("http://localhost:7777/resume/image/scraper", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setResult(response.data);
      alert("Image analysis successful!");
      setDisplay(true);
    } catch (error) {
      console.error("Error analyzing image:", error);
      alert("Failed to analyze image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-indigo-500 text-white px-4">
      <motion.h1
        className="text-5xl font-bold text-center mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        AI-Powered Image Analyzer
      </motion.h1>
      <p className="text-red text-lg text-center max-w-xl mb-8">
        [ Yet To Come, Don't Use It ]
      </p>
      <p className="text-lg text-center max-w-xl mb-6">
        Upload your image and let AI analyze its text and content, providing insights to enhance your understanding.
      </p>
      <motion.label
        htmlFor="image-upload"
        className={`w-80 md:w-126 h-68 bg-white/10 border ${dragActive ? "border-white/40 bg-white/20" : "border-white/20"} rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-white/20 transition-all`}
        whileHover={{ scale: 1.05 }}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {selectedFile ? (
          <div className="flex items-center gap-2 text-white">
            <FileText size={24} />
            <span className="text-sm">{selectedFile.name}</span>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <UploadCloud size={78} className="text-white mb-2" />
            <p className="text-sm">{dragActive ? "Drop the file here" : "Drag & drop or click to upload an image (JPG, PNG)"}</p>
          </div>
        )}
      </motion.label>
      <input type="file" id="image-upload" className="hidden" accept=".jpg,.jpeg,.png" onChange={handleFileChange} />

      {selectedFile && (
        <motion.button
          className="mt-6 bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-indigo-100 transition-all"
          whileHover={{ scale: 1.1 }}
          onClick={handleAnalyzeImage}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Image"} <ArrowRight size={20} />
        </motion.button>
      )}

      {result && display && (
        <div className="mt-6 bg-white text-gray-700 p-4 rounded-lg shadow mb-16">
          <h2 className="text-lg font-bold text-indigo-600">Image Analysis Report</h2>
          <p className="whitespace-pre-line mt-2">{JSON.stringify(result, null, 2)}</p>
        </div>
      )}
    </div>
  );
};

export default ImageScraper;