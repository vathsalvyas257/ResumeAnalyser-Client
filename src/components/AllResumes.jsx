import React, { useEffect, useState } from "react";
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
    return <div className="flex justify-center mt-10"><div className="loader">Loading...</div></div>;

  if (error)
    return (
      <p className="text-red-600 text-center mt-10 font-semibold">{error}</p>
    );

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8 font-sans">Users & Their Resumes</h2>

      <div className="grid grid-cols-1 gap-6">
        {currentUsers.map((user) => (
          <div key={user.email} className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-indigo-600">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>

            <div className="my-4 border-t border-gray-200" />

            {user.lastTwoResumeLinks?.length > 0 ? (
              user.lastTwoResumeLinks.map((resume, index) => (
                <div key={resume.id} className="mb-6">
                  <h4 className="font-semibold text-gray-800">Resume {index + 1}</h4>
                  <p className="text-sm text-gray-600">
                    Score: {resume.score}/100 | Readability: {resume.readabilityScore}/100
                  </p>
                  <p className="text-sm">
                    ATS Friendly:{" "}
                    {resume.atsFriendly ? (
                      <span className="text-green-600 font-semibold">✅ Yes</span>
                    ) : (
                      <span className="text-red-500 font-semibold">❌ No</span>
                    )}
                  </p>
                  {resume ? (
                    <a
                      href={resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 px-4 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
                    >
                      Open Resume
                    </a>
                  ) : (
                    <p className="text-gray-400 text-sm mt-2">No File Uploaded.</p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No resumes uploaded yet.</p>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 space-x-2">
        <button
          className={`px-3 py-1 rounded-md ${
            page === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
          onClick={() => page > 1 && setPage(page - 1)}
          disabled={page === 1}
        >
          &laquo; Prev
        </button>

        {[...Array(Math.ceil(users.length / usersPerPage)).keys()].map((num) => {
          const pg = num + 1;
          return (
            <button
              key={pg}
              className={`px-3 py-1 rounded-md ${
                page === pg
                  ? "bg-indigo-700 text-white font-semibold"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
              onClick={() => setPage(pg)}
            >
              {pg}
            </button>
          );
        })}

        <button
          className={`px-3 py-1 rounded-md ${
            page === Math.ceil(users.length / usersPerPage)
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
          onClick={() =>
            page < Math.ceil(users.length / usersPerPage) && setPage(page + 1)
          }
          disabled={page === Math.ceil(users.length / usersPerPage)}
        >
          Next &raquo;
        </button>
      </div>
    </div>
  );
};

export default AllResumes;