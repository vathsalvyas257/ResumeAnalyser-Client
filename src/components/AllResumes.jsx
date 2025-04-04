import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Button,
  Pagination,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";

const AllResumes = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const resumesPerPage = 8;

  useEffect(() => {
    const fetchResumes = async () => {
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
        setResumes(response.data.resumes || []);
      } catch (err) {
        console.error("Error fetching resumes:", err);
        setError("Failed to load resumes");
      } finally {
        setLoading(false);
      }
    };
    fetchResumes();
  }, []);

  if (loading)
    return (
      <CircularProgress
        sx={{ display: "flex", justifyContent: "center", marginTop: 10 }}
      />
    );
  if (error)
    return (
      <Typography color="error" sx={{ marginTop: 10, textAlign: "center" }}>
        {error}
      </Typography>
    );

  // Pagination Logic
  const indexOfLastResume = page * resumesPerPage;
  const indexOfFirstResume = indexOfLastResume - resumesPerPage;
  const currentResumes = resumes.slice(indexOfFirstResume, indexOfLastResume);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        background: "rgba(99, 102, 241, 0.9)", // Indigo glassmorphism effect
        backdropFilter: "blur(10px)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        borderRadius: "12px",
        color: "#fff",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "1.5rem",
          color: "#ffffff",
        }}
      >
        All Resumes
      </Typography>

      {currentResumes.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
            width: "100%",
            maxWidth: "80rem",
          }}
        >
          {currentResumes.map((resume) => (
            <Card
              key={resume.id}
              sx={{
                background: "rgba(255, 255, 255, 0.7)", // Glassmorphism effect
                boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
                borderRadius: "10px",
                padding: "1rem",
                transition: "all 0.3s ease-in-out",
                backdropFilter: "blur(10px)",
                "&:hover": {
                  transform: "scale(1.05)",
                  background: "rgba(255, 255, 255, 0.9)",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.9)",
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "#4F46E5" }}
                >
                  {resume.userName}
                </Typography>
                <Typography variant="body1" sx={{ color: "#374151" }}>
                  Score: {resume.score}/100
                </Typography>
                <Typography variant="body1" sx={{ color: "#374151" }}>
                  Readability: {resume.readabilityScore}/100
                </Typography>
                <Typography variant="body1" sx={{ color: "#374151" }}>
                  ATS Friendly:{" "}
                  {resume.atsFriendly ? (
                    <span style={{ color: "#10B981" }}>✅ Yes</span>
                  ) : (
                    <span style={{ color: "#EF4444" }}>❌ No</span>
                  )}
                </Typography>
                {resume.file ? (
                  <Button
                    variant="contained"
                    sx={{
                      marginTop: "0.5rem",
                      backgroundColor: "#ffffff",
                      color: "#4F46E5",
                      fontWeight: "bold",
                      "&:hover": { backgroundColor: "#E0E7FF" },
                    }}
                    onClick={() => {
                      const fileURL = `data:application/pdf;base64,${resume.file}`;
                      const newTab = window.open();
                      newTab.document.write(`
                        <iframe src="${fileURL}" width="100%" height="100%" style="border:none;"></iframe>
                      `);
                      newTab.document.title = `Resume - ${resume.userName}`;
                    }}
                  >
                    Open Resume
                  </Button>
                ) : (
                  <Typography
                    variant="body2"
                    sx={{ color: "#6B7280", marginTop: "0.5rem" }}
                  >
                    No resume file uploaded.
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Typography sx={{ textAlign: "center", color: "#ffffff" }}>
          No resumes found.
        </Typography>
      )}

      {/* Pagination */}
      <Pagination
        count={Math.ceil(resumes.length / resumesPerPage)}
        page={page}
        onChange={(event, value) => setPage(value)}
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1.5rem",
          "& .MuiPaginationItem-root": {
            color: "#ffffff",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: "8px",
            "&.Mui-selected": {
              backgroundColor: "#4F46E5",
              color: "#ffffff",
            },
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.4)",
            },
          },
        }}
      />
    </div>
  );
};

export default AllResumes;

// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   CircularProgress,
//   Button,
//   Pagination,
// } from "@mui/material";
// import axios from "axios";
// import Cookies from "js-cookie";

// const AllResumes = () => {
//   const [resumes, setResumes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(1);
//   const resumesPerPage = 9;

//   useEffect(() => {
//     const fetchResumes = async () => {
//       const token = Cookies.get("token");
//       if (!token) {
//         setError("Token is missing");
//         setLoading(false);
//         return;
//       }
//       try {
//         const response = await axios.get("http://localhost:7777/resume/all", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setResumes(response.data.resumes || []);
//       } catch (err) {
//         console.error("Error fetching resumes:", err);
//         setError("Failed to load resumes");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchResumes();
//   }, []);

//   if (loading)
//     return (
//       <CircularProgress
//         sx={{ display: "flex", justifyContent: "center", marginTop: 10 }}
//       />
//     );
//   if (error)
//     return (
//       <Typography color="error" sx={{ marginTop: 10, textAlign: "center" }}>
//         {error}
//       </Typography>
//     );

//   // Pagination Logic
//   const indexOfLastResume = page * resumesPerPage;
//   const indexOfFirstResume = indexOfLastResume - resumesPerPage;
//   const currentResumes = resumes.slice(indexOfFirstResume, indexOfLastResume);

//   return (
//     <div
//       style={{
//         marginTop: "4rem",
//         maxWidth: "80rem",
//         marginLeft: "auto",
//         marginRight: "auto",
//         padding: "2rem",
//         borderRadius: "12px",
//         background: "#6366F1", // Indigo background
//         boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
//         color: "#fff",
//       }}
//     >
//        <Typography
//         variant="h4"
//         sx={{
//           fontWeight: "bold",
//           textAlign: "center",
//           marginBottom: "1.5rem",
//           color: "#ffffff", // Matching the orange-yellow theme
//         }}
//       >
//         All Resumes
//       </Typography>

//       {currentResumes.length > 0 ? (
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//             gap: "1.5rem",
//           }}
//         >
//           {currentResumes.map((resume) => (
//             <Card
//               key={resume.id}
//               sx={{
//                 background: "#ffffff", // White background
//                 boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
//                 borderRadius: "10px",
//                 padding: "1rem",
//                 transition: "all 0.3s ease-in-out",
//                 "&:hover": {
//                   transform: "scale(1.05)",
//                   background: "#F3F4F6", // Light gray background on hover
//                   boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
//                 },
//               }}
//             >
//               <CardContent>
//                 <Typography
//                   variant="h5"
//                   sx={{ fontWeight: "bold", color: "#4F46E5" }}
//                 >
//                   {resume.userName}
//                 </Typography>
//                 <Typography variant="body1" sx={{ color: "#374151" }}>
//                   Score: {resume.score}/100
//                 </Typography>
//                 <Typography variant="body1" sx={{ color: "#374151" }}>
//                   Readability: {resume.readabilityScore}/100
//                 </Typography>
//                 <Typography variant="body1" sx={{ color: "#374151" }}>
//                   ATS Friendly:{" "}
//                   {resume.atsFriendly ? (
//                     <span style={{ color: "#10B981" }}>✅ Yes</span>
//                   ) : (
//                     <span style={{ color: "#EF4444" }}>❌ No</span>
//                   )}
//                 </Typography>

//                 {/* Display Resume File */}
//                 {resume.file ? (
//                   <Button
//                     variant="contained"
//                     sx={{
//                       marginTop: "0.5rem",
//                       backgroundColor: "#ffffff",
//                       color: "#4F46E5",
//                       fontWeight: "bold",
//                       "&:hover": { backgroundColor: "#E0E7FF" },
//                     }}
//                     onClick={() => {
//                       const fileURL = `data:application/pdf;base64,${resume.file}`;
//                       const newTab = window.open();
//                       newTab.document.write(`
//                         <iframe src="${fileURL}" width="100%" height="100%" style="border:none;"></iframe>
//                       `);
//                       newTab.document.title = `Resume - ${resume.userName}`;
//                     }}
//                   >
//                     Open Resume
//                   </Button>
//                 ) : (
//                   <Typography
//                     variant="body2"
//                     sx={{ color: "#6B7280", marginTop: "0.5rem" }}
//                   >
//                     No resume file uploaded.
//                   </Typography>
//                 )}
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       ) : (
//         <Typography sx={{ textAlign: "center", color: "#ffffff" }}>
//           No resumes found.
//         </Typography>
//       )}

//       {/* Pagination */}
//       <Pagination
//         count={Math.ceil(resumes.length / resumesPerPage)}
//         page={page}
//         onChange={(event, value) => setPage(value)}
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           marginTop: "1.5rem",
//           "& .MuiPaginationItem-root": {
//             color: "#ffffff",
//             "&.Mui-selected": {
//               backgroundColor: "#4F46E5",
//               color: "#ffffff",
//             },
//             "&:hover": {
//               backgroundColor: "#E0E7FF",
//             },
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default AllResumes;
