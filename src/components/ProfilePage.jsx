import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
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
  const [loading, setLoading] = useState(true);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
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
      setLoading(false);
    }, 1000);

    // Real fetch logic (commented out for development)
    /*
    const fetchProfile = async () => {
      const token = Cookies.get("token");
      if (!token) {
        console.error("Token is missing.");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get("http://localhost:7777/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);
        setUser(response.data.user);
        setRole(response.data.user.role);
        setLastTwoResumes(response.data.lastTwoResumes || []);
        setFirstName(response.data.user.firstName);
        setLastName(response.data.user.lastName);
      } catch (error) {
        console.error("Error fetching profile:", error.response?.data || error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
    */
  }, []);

  const handleEditProfile = () => setOpenEditModal(true);

  const handleSaveProfile = async () => {
    try {
      // Simulated update (replace with real API call if needed)
      setUser((prev) => ({ ...prev, firstName, lastName }));
      setOpenEditModal(false);

      // Uncomment for real API call
      /*
      const token = Cookies.get("token");
      await axios.put(
        "http://localhost:7777/user/update-profile",
        { firstName, lastName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      */
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleViewAllResumes = () => {
    navigate("/allResumes");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mt-6 mb-16 mx-auto rounded-3xl shadow-2xl p-10 border border-1 border-[gray]">
      {/* Header */}
      <div className="px-8 py-8 rounded-3xl mb-6">
        <h3 className="text-4xl text-blue-700 font-semibold mb-2">
          Hi, {user.lastName} {user.firstName}
        </h3>
        <p className="text-lg text-gray-600 mb-4">{user.emailId}</p>

        {/* Admin button */}
        {role === "admin" && (
          <Button
            variant="outlined"
            startIcon={<Edit />}
            className="text-green-500 border-red-500 hover:bg-red-300"
            onClick={handleViewAllResumes}
          >
            View All Resumes
          </Button>
        )}

        <Button
          variant="outlined"
          startIcon={<Edit />}
          className="text-blue-500 border-blue-500 hover:bg-blue-300 ml-4"
          onClick={handleEditProfile}
        >
          Edit Profile
        </Button>
      </div>

      {/* Personal Info */}
      <div className="border p-6 rounded-2xl shadow-md border-1 border-gray-400">
        <h3 className="text-2xl font-semibold text-blue-600 mb-4">
          Personal Information
        </h3>
        <div className="flex gap-3 mb-2 items-center">
          <span>Name:</span>
          <span className="text-2xl text-[blue] font-bold">
            {user.firstName} {user.lastName}
          </span>
        </div>
        <div className="flex gap-3">
          <span>Email:</span>
          <span className="text-2xl text-[blue] font-bold">{user.emailId}</span>
        </div>
      </div>

      {/* Resume Stats */}
      {lastTwoResumes.length > 0 && (
        <div className="border p-6 rounded-2xl shadow-md mt-6">
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">
            Last Resume Stats
          </h3>

          <div className="flex gap-4 mb-2 items-center">
            <span>ATS Score:</span>
            <span className="text-[blue] font-bold text-3xl">
              {lastTwoResumes[0]?.analysis?.score || "N/A"}
            </span>
          </div>
          <div className="flex gap-4 mb-2">
            <span>Readability Score:</span>
            <span className="text-[blue] font-bold text-3xl">
              {lastTwoResumes[1]?.analysis?.readabilityScore || "N/A"}
            </span>
          </div>

          {/* Suggested Jobs */}
          {lastTwoResumes[0]?.suggestedJobs?.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium">Suggested Jobs:</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {lastTwoResumes[0].suggestedJobs.map((job, index) => (
                  <Chip key={index} label={job} color="primary" />
                ))}
              </div>
            </div>
          )}

          {/* Missing Keywords */}
          {lastTwoResumes[0]?.missingKeywords?.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium">Missing Keywords:</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {lastTwoResumes[0].missingKeywords.map((keyword, index) => (
                  <Chip key={index} label={keyword} color="warning" />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Resume Links */}
      <div className="border p-6 rounded-2xl shadow-md mt-6">
        <h3 className="text-2xl font-semibold text-blue-600 mb-4">
          Recent Resumes
        </h3>
        {lastTwoResumes.length > 0 ? (
          lastTwoResumes.map((resume, index) => (
            <div key={index} className="mb-2">
              <p>Resume {index + 1}:</p>
              <Button
                variant="contained"
                color="primary"
                href={resume.file}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1"
              >
                View Resume {index + 1}
              </Button>
            </div>
          ))
        ) : (
          <p>No resumes uploaded yet.</p>
        )}
      </div>

      {/* Edit Modal */}
      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)}>Cancel</Button>
          <Button
            onClick={handleSaveProfile}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfilePage;
