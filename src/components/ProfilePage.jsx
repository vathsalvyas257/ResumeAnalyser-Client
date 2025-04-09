import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { Card, CardContent, Typography, CircularProgress, Button, Avatar, Chip, LinearProgress, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { Edit } from "@mui/icons-material";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [lastTwoResumes, setLastTwoResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [role, setRole] = useState("");
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
        console.log("Started");
        const response = await axios.get("http://localhost:7777/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Ended");
        setUser(response.data.user);
        // user.role == "admin" ? setIsAdmin(true) : null ;
        // console.log(isAdmin);
        setRole(response.data.user.role);
        setLastTwoResumes(response.data.lastTwoResumes || []);
      } catch (error) {
        console.error("Error fetching profile:", error.response?.data || error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleEditProfile = () => {
    setOpenEditModal(true);
  };
  const handleViewAllResumes = () =>{
    navigate("/allResumes");
  }

  const handleSaveProfile = async () => {
    
    try {
      const token = Cookies.get("token");
      const updated_user = await axios.put("http://localhost:7777/user/update-profile", { firstName, lastName }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser({ ...user, firstName, lastName });
      setOpenEditModal(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mt-4 mb-16 rounded-3xl mx-auto">
      <div className="flex items-center justify-between mb-6 bg-blue-50 rounded-3xl px-8 py-8">
        <div className="items-center gap-4 w-[100%]">
          {/*Greetings*/}
          <h3 className="text-4xl mt-6 text-blue-700 font-medium">Hi, {user.firstName} {user.lastName}</h3>
          {/* Personal Information */}
          <div className="flex justify-between mt-6">
            <h3 className="text-3xl text-blue-500">Personal Information</h3>
            <Button variant="outlined" className="border-blue-400 px-6 py-1 rounded-xl text-blue-800 hover:bg-blue-900" startIcon={<Edit/>}>Edit</Button>
          </div>
          <div className="justify-between w-[100%] border border-black-600 rounded-2xl p-5 mt-4">
            <div className="flex justify-between">
              <p>Name</p>
              <p> {user.firstName} {user.lastName}</p>
            </div>
            <div className="border border-gray-400 mt-4 mb-4"></div>
            <div className="flex justify-between">
              <p>Email</p>
              <p>{user.emailId}</p>
            </div>
          </div>

          {/* Resume Stats */}
          <h3 className="text-3xl text-blue-500 mt-6">Last Resume Stats</h3>
          <div className="justify-between w-[100%] border border-black-600 rounded-2xl p-5 mt-4">
            <div>
              <p className="font-medium text-xl">Metrics</p>
              <div className="flex justify-between">
                <p>ATS Score</p>
                <p>{lastTwoResumes[0].analysis.score}</p>
              </div>
              <div className="flex justify-between">
                <p>Readability Score</p>
                <p>{lastTwoResumes[1].analysis.readabilityScore}</p>
              </div>
            </div>
            <div className="border border-gray-400 mt-4 mb-4"></div>
            <div>
              <p className="font-medium text-xl">Suggested Jobs</p>
              <div className="flex justify-between">
                {lastTwoResumes[0]?.suggestedJobs?.length > 0 && (
                <div className="mt-2">
                  <div className="flex flex-wrap gap-2 mt-1">
                    {lastTwoResumes[0].suggestedJobs.map((keyword, index) => (
                      <Chip key={index} label={keyword} color="success" />
                    ))}
                  </div>
                </div>
                )}
              </div>
            </div>
            <div className="border border-gray-400 mt-4 mb-4"></div>
            <div>
              <p className="font-medium text-xl">Missing Keywords</p>
              <div className="flex justify-between">
                {lastTwoResumes[0]?.missingKeywords?.length > 0 && (
                <div className="mt-2">
                  <div className="flex flex-wrap gap-2 mt-1">
                    {lastTwoResumes[0].missingKeywords.map((keyword, index) => (
                      <Chip key={index} label={keyword} color="error" />
                    ))}
                  </div>
                </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="mt-16 mb-16 max-w-4xl mx-auto p-6 shadow-lg rounded-lg bg-blue-200">
    //   {/* Header with Avatar & Edit Button */}
    //   <div className="flex items-center justify-between mb-6">
    //     <div className="flex items-center gap-4">
    //       {/* <Avatar src="/profile-placeholder.png" alt="Profile Picture" className="w-20 h-20" /> */}
    //       <div>
    //         <Typography variant="h4" className="font-bold">{user.firstName} {user.lastName}</Typography>
    //         <Typography variant="body1" className="text-gray-600">{user.emailId}</Typography>
    //       </div>
    //     </div>
    //    { role == "admin"  && (
    //       <Button variant="outlined" startIcon={<Edit />} className="text-green-500 border-red-500 hover:bg-red-300" onClick={handleViewAllResumes}>View All Resumes</Button>
    //     )
    //    }
    //     <Button variant="outlined" startIcon={<Edit />} className="text-blue-500 border-blue-500 hover:bg-blue-300" onClick={handleEditProfile}>Edit Profile</Button>
    //   </div>

    //   {/* Last Resume Stats */}
    //   {lastTwoResumes.length > 0 && (
    //     <Card className="shadow-md p-4 mb-4">
    //       <CardContent>
    //         <Typography variant="h5" className="font-bold mb-2">Last Resume Stats</Typography>
    //         <Typography variant="body1">Score: {lastTwoResumes[0]?.score}/100</Typography>
    //         <LinearProgress variant="determinate" value={lastTwoResumes[0]?.score} className="mb-2" />
    //         <Typography variant="body1">Readability: {lastTwoResumes[0]?.readabilityScore}/100</Typography>
    //         <LinearProgress variant="determinate" value={lastTwoResumes[0]?.readabilityScore} className="mb-2" />
    //         <Typography variant="body1">ATS Friendly: {lastTwoResumes[0]?.atsFriendly ? "Yes ✅" : "No ❌"}</Typography>

    //         {lastTwoResumes[0]?.missingKeywords?.length > 0 && (
    //           <div className="mt-2">
    //             <Typography variant="subtitle1" className="font-semibold">Missing Keywords:</Typography>
    //             <div className="flex flex-wrap gap-2 mt-1">
    //               {lastTwoResumes[0].missingKeywords.map((keyword, index) => (
    //                 <Chip key={index} label={keyword} color="error" />
    //               ))}
    //             </div>
    //           </div>
    //         )}
    //       </CardContent>
    //     </Card>
    //   )}

    //   {/* Last Two Resume Drive Links */}
    //   <Card className="shadow-md p-4 mb-4">
    //     <CardContent>
    //       <Typography variant="h5" className="font-bold mb-2">Recent Resumes</Typography>
    //       {lastTwoResumes.length > 0 ? (
    //         lastTwoResumes.map((resume, index) => (
    //           <div key={index} className="mb-2">
    //             <Typography variant="body1">Resume {index + 1}:</Typography>
    //             <Button
    //               variant="contained"
    //               color="primary"
    //               className="mt-1"
    //               href={resume.file}
    //               target="_blank"
    //               rel="noopener noreferrer"
    //             >
    //               View Resume {index + 1}
    //             </Button>
    //           </div>
    //         ))
    //       ) : (
    //         <Typography variant="body1">No resumes uploaded yet.</Typography>
    //       )}
    //     </CardContent>
    //   </Card>

    //   {/* Edit Profile Modal */}
    //   <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
    //     <DialogTitle variant="h5">Edit Profile</DialogTitle>
    //     <DialogContent>
    //       <TextField fullWidth label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} margin="normal" />
    //       <TextField fullWidth label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} margin="normal" />
    //     </DialogContent>
    //     <DialogActions>
    //       {/* (isAdmin &&  { */}
    //         <Button onClick={() => setOpenEditModal(false)} color="secondary">Cancel</Button>
    //       {/* }) */}
    //       <Button onClick={handleSaveProfile} color="primary" variant="contained">Save</Button>
    //     </DialogActions>
    //   </Dialog>

    //   {/* Upload New Resume Button */}
    //   <Button variant="contained" color="primary" className="mt-4 w-full" onClick={() => navigate("/analyse")}>
    //     Upload New Resume
    //   </Button>
    // </div>
  );
};

export default ProfilePage;
