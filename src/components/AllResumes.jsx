import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Button,
  Pagination,
  Grid,
  Divider,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";

const AllResumes = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const usersPerPage = 5;
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = Cookies.get("token");
      if (!token) {
        setError("Token is missing");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get("http://localhost:7777/resume/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data || []);
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to load users and resumes");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const indexOfLastUser = page * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  if (loading)
    return <CircularProgress sx={{ display: "flex", margin: "auto", mt: 10 }} />;
  if (error)
    return (
      <Typography color="error" align="center" sx={{ mt: 10 }}>
        {error}
      </Typography>
    );

  return (
    <div style={{ padding: "2rem", backgroundColor: "#EEF2FF", minHeight: "100vh" }}>
      <Typography variant="h4" align="center" sx={{ mb: 4, fontWeight: "bold" }}>
        Users & Their Resumes
      </Typography>

      <Grid container spacing={4}>
        {currentUsers.map((user) => (
          <Grid item xs={12} key={user.email}>
            <Card
              sx={{
                borderRadius: "12px",
                padding: "1rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#4F46E5" }}>
                  {user.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "#6B7280" }}>
                  {user.email}
                </Typography>

                <Divider sx={{ my: 2 }} />

                {user.lastTwoResumeLinks?.length > 0 ? (
                  
                  user.lastTwoResumeLinks?.map((resume, index) => (
                  <div key={resume.id} style={{ marginBottom: "1.5rem" }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      Resume {index + 1}
                    </Typography>
                    <Typography variant="body2">
                      Score: {resume.score}/100 | Readability:{" "}
                      {resume.readabilityScore}/100
                    </Typography>
                    <Typography variant="body2">
                      ATS Friendly:{" "}
                      {resume.atsFriendly ? (
                        <span style={{ color: "#10B981" }}>✅ Yes</span>
                      ) : (
                        <span style={{ color: "#EF4444" }}>❌ No</span>
                      )}
                    </Typography>
                    {resume ? (
                      <Button
                        variant="contained"
                        size="small"
                        href={resume}
                        target="_blank"
                        sx={{
                          mt: 1,
                          backgroundColor: "#4F46E5",
                          "&:hover": { backgroundColor: "#4338CA" },
                        }}
                      >
                        Open Resume
                      </Button>
                    ) : (
                      <Typography variant="caption" color="text.secondary">
                        No File Uploaded.
                      </Typography>
                    )}
                  </div>
                ))) : (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    No resumes uploaded yet.
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Pagination
        count={Math.ceil(users.length / usersPerPage)}
        page={page}
        onChange={(e, val) => setPage(val)}
        sx={{ display: "flex", justifyContent: "center", mt: 4 }}
      />
    </div>
  );
};

export default AllResumes;