import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { Line } from "rc-progress";
import GradientProgressBar from "../components/ProgressBar";
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
import toast from "react-hot-toast";

const ProfilePage = () => {
  const API_URL = import.meta.env.VITE_API_URL;
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
    const fetchProfile = async () => {
      const token = Cookies.get("token");
      if (!token) {
        console.error("Token is missing.");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`${API_URL}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data.user);
        setRole(response.data.user.role);
        setFirstName(response.data.user.firstName);
        setLastName(response.data.user.lastName);
        setLastTwoResumes(response.data.lastTwoResumes || []);
      setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error.response?.data || error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleEditProfile = () => setOpenEditModal(true);
  const handleSaveProfile = async () => {
    try {
      const token = Cookies.get("token");
      const updated_user = await axios.put(`${API_URL}/user/update-profile`, { firstName, lastName }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser({ ...user, firstName, lastName });
      setOpenEditModal(false);
      toast.success("Profile Updated Successfully!",{position:"bottom-right", duration:2000});
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error Updating the Profile!", {position:"bottom-right", duration:2000});
    }
  };

  const handleOpenResumeModal = () => setOpenResumeModal(true);
  const handleCloseResumeModal = () => setOpenResumeModal(false);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress className="-mt-36" />
      </div>
    );
  }

  return (
    <div className="bg-neutral-180 min-h-screen flex justify-center items-center mt-[-100px] px-4">
  <div className="bg-neutral-50 w-full max-w-5xl rounded-2xl mt-[100px] px-4 md:px-10 py-8 mb-16">
    <h1 className="font-medium text-3xl text-center">Profile Page</h1>

    {/* Personal Info */}
    <div className="text-2xl md:text-3xl text-[#4040f8] mt-4 ml-2">
      Hello, {user.firstName} {user.lastName}! 
      <Edit 
        title="Edit Profile"
        className="text-orange-500 cursor-pointer ml-2 inline-block align-middle"
        onClick={handleEditProfile}
      />
      <p className="text-sm sm:text-base text-neutral-500 mt-2">{user.emailId}</p>
    </div>

    {/* Resume Stats */}
    <div className="mt-6">
      <div className="border border-neutral-600 p-6 sm:p-10 rounded-2xl shadow-2xl">
        {lastTwoResumes.length > 0 ? (
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#7F56D9]">Last Resume Info</h2>
            <div className="py-5 text-base sm:text-lg">Metrics</div>

            <div className="flex flex-col gap-5">
              <GradientProgressBar value={lastTwoResumes[0].analysis.score} label={"ATS Score"} />
              <hr color="gray" />
              <GradientProgressBar value={lastTwoResumes[0].analysis.readabilityScore} label={"Readability "} />
              <hr color="gray" />

              <div className="text-base sm:text-lg">Suggested Jobs</div>
              <div className="flex gap-2 flex-wrap">
                {lastTwoResumes[0].analysis.suggestedJobs.map((keyword, index) => (
                  <Chip key={index} label={keyword} className="m-1" color="success" clickable />
                ))}
              </div>
              <hr color="gray" />

              <div className="text-base sm:text-lg">Missing Keywords</div>
              <div className="flex gap-2 flex-wrap">
                {lastTwoResumes[0].analysis.missingKeywords.map((keyword, index) => (
                  <Chip key={index} label={keyword} className="m-1" color="warning" clickable />
                ))}
              </div>

              <div className="mt-4">
                <Button variant="outlined" onClick={handleOpenResumeModal}>
                  View Recent Uploaded Resumes
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <p>No Resumes Uploaded Yet</p>
        )}
      </div>
    </div>

    {/* Resume Modal */}
    <Dialog open={openResumeModal} onClose={handleCloseResumeModal} maxWidth="sm" fullWidth>
      <DialogTitle className="text-purple-700 font-semibold">Uploaded Resumes</DialogTitle>
      <DialogContent dividers>
        {lastTwoResumes.length > 0 ? (
          lastTwoResumes.map((resume, idx) => (
            <div key={idx} className="mb-4 flex flex-col sm:flex-row sm:items-center">
              <p className="font-semibold mb-2 sm:mb-0">Resume {idx + 1}:</p>
              <a href={resume.file} target="_blank" rel="noopener noreferrer" className="ml-0 sm:ml-2 text-blue-600">
                View Resume PDF
              </a>
            </div>
          ))
        ) : (
          <p>No resumes uploaded yet.</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseResumeModal} color="primary">Close</Button>
      </DialogActions>
    </Dialog>

    {/* Edit Profile Modal */}
    <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
      <DialogTitle className="font-medium font-sans text-purple-700">Edit Profile</DialogTitle>
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
        <Button onClick={() => setOpenEditModal(false)} color="secondary" variant="contained">
          Cancel
        </Button>
        <Button onClick={handleSaveProfile} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  </div>
</div>
  );
};

export default ProfilePage;
