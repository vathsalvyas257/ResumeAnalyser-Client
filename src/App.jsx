import { BrowserRouter, Route, Routes } from "react-router-dom";

import AllResumes from "./pages/AllResumes";
import AuthForm from "./components/auth/AuthForm";
import Body from "./components/Body";
import Home from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ResumeAnalysisResults from "./pages/ResumeAnalysisResults";
import SignupForm from "./components/auth/SignupForm";
import Stats from "./pages/Stats";
import ProtectedRoute from "./components/ProtectedRoute"
import About from "./pages/About"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route index element={<Home />} />
          <Route path="login" element={<AuthForm />} />
          <Route path="signup" element={<SignupForm />} />
          <Route path="about" element={<About/>}/>
          <Route
            path="stats"
            element={
              <ProtectedRoute allowedRoles={['admin','user']}>
                <Stats />
              </ProtectedRoute>
            } 
          />
          <Route path="profile"
            element={
                <ProtectedRoute allowedRoles={['admin','user']}>
                  <ProfilePage />
                </ProtectedRoute>
              } 
          />
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
