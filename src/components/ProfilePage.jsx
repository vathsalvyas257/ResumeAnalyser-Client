import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { Line } from "rc-progress";
import GradientProgressBar from "./ProgressBar";
import {
  Button,
  CircularProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { Edit } from "@mui/icons-material";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [lastTwoResumes, setLastTwoResumes] = useState([]);
  const [missingKeywords, setmissingKeywords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [openResumeModal, setOpenResumeModal] = useState(false); // New state for modal
  const navigate = useNavigate();

  useEffect(() => {
    // Mock data for development
    const mockData = {
      user: {
        firstName: "John",
        lastName: "Doe",
        emailId: "john.doe@example.com",
        role: "admin",
      },
      lastTwoResumes: [
        {
          file: "https://example.com/resume1.pdf",
          analysis: {
            score: 85,
            readabilityScore: 78,
          },
          suggestedJobs: [
            "Frontend Developer",
            "React Engineer",
            "UI Designer",
          ],
          missingKeywords: ["JavaScript", "Accessibility", "TypeScript"],
        },
        {
          file: "https://example.com/resume2.pdf",
          analysis: {
            score: 79,
            readabilityScore: 82,
          },
          suggestedJobs: [],
          missingKeywords: [],
        },
      ],
    };

    setTimeout(() => {
      setUser(mockData.user);
      setRole(mockData.user.role);
      setFirstName(mockData.user.firstName);
      setLastName(mockData.user.lastName);
      setLastTwoResumes(mockData.lastTwoResumes);
      setmissingKeywords(mockData.lastTwoResumes[0].missingKeywords);
      setLoading(false);
    }, 1000);
  }, []);

  const handleEditProfile = () => setOpenEditModal(true);
  const handleSaveProfile = async () => {
    try {
      setUser((prev) => ({ ...prev, firstName, lastName }));
      setOpenEditModal(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleViewAllResumes = () => {
    navigate("/allResumes");
  };

  const handleOpenResumeModal = () => setOpenResumeModal(true);
  const handleCloseResumeModal = () => setOpenResumeModal(false);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="bg-neutral-200 min-h-[100vh] mt-[-100px] flex justify-center items-center">
      <div className="container bg-neutral-50 w-[80%] rounded-2xl mt-[100px] px-[100px] py-8">
        <h1 className="font-medium text-3xl text-center">Profile Page</h1>

        {/* Personal information */}
        <div className="text-3xl text-[#4040f8]">
          Hello, {firstName} {lastName}!
          <br />
          <p className="text-[18px] text-neutral-500">{user.emailId}</p>
        </div>

        {role === "admin" && (
          <Button
            variant="contained"
            className="text-green-500 border-red-500 hover:bg-red-300"
            onClick={handleViewAllResumes}
          >
            View All Resumes
          </Button>
        )}

        {/* Resume Stats information */}
        <div className="mt-10">
          <div className="border border-1 border-neutral-600 p-10 rounded-2xl shadow-2xl">
            <h2 className="text-2xl font-semibold text-[#7F56D9]">
              Resume Info
            </h2>
            <div className="py-5">Metrics</div>
            <div className="flex gap-5 flex-col">
              <GradientProgressBar
                value={lastTwoResumes[0].analysis.readabilityScore}
                label={"Ats Score "}
              />
              <hr color="gray" />
              <GradientProgressBar
                value={lastTwoResumes[0].analysis.score}
                label={"Readability  Score "}
              />
              <hr color="gray" />

              <div>Missing Key Words</div>
              <div className="flex gap-1 flex-wrap">
                {missingKeywords.map((keyword, index) => (
                  <Chip
                    key={index}
                    label={keyword}
                    className="m-1"
                    color="primary"
                    clickable
                  />
                ))}
              </div>

              {/* New Button to View Uploaded Resumes */}
              <div className="mt-4">
                <Button variant="outlined" onClick={handleOpenResumeModal}>
                  View Uploaded Resumes
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Resume Modal */}
        <Dialog
          open={openResumeModal}
          onClose={handleCloseResumeModal}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Uploaded Resumes</DialogTitle>
          <DialogContent dividers>
            {lastTwoResumes.length > 0 ? (
              lastTwoResumes.map((resume, idx) => (
                <div key={idx} className="mb-4">
                  <p className="font-semibold mb-2">Resume {idx + 1}:</p>
                  <a
                    href={resume.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Resume PDF
                  </a>
                </div>
              ))
            ) : (
              <p>No resumes uploaded yet.</p>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseResumeModal} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default ProfilePage;
