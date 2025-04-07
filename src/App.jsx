import { BrowserRouter, Route, Routes } from "react-router-dom";

import AllResumes from "./components/AllResumes";
import AuthForm from "./components/auth/AuthForm";
import Body from "./components/Body";
import Home from "./pages/HomePage";
import ProfilePage from "./components/ProfilePage";
import ResumeAnalysisResults from "./components/ResumeAnalysisResults";
import SignupForm from "./components/auth/SignupForm";
import Stats from "./components/Stats";
import ProtectedRoute from "./components/ProtectedRoute"
import About from "./components/About"

// const scores = {
//   overall: 78.6,
//   categories: [
//     { label: "ATS Compatibility", value: 90.2 },
//     { label: "Keyword Optimization", value: 29.3 },
//     { label: "Structure & Formatting", value: 95.3 },

//   ],
// };


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route index element={<Home />} />
          <Route path="login" element={<AuthForm />} />
          <Route path="signup" element={<SignupForm />} />
          <Route path="stats" element={<Stats />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route
            path="analyser"
            element={
              <ProtectedRoute allowedRoles={['admin', 'user']}>
                <ResumeAnalysisResults />
              </ProtectedRoute>
            }
          />
          <Route 
          path="allresumes" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AllResumes />
            </ProtectedRoute>
          }/>
          <Route path="about" element={<About/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
