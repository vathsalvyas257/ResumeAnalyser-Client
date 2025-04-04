import { BrowserRouter, Route, Routes } from "react-router-dom";

import AuthForm from "./components/auth/AuthForm";
// import Home from "./components/Home";
import Body from "./components/Body";
import Home from "./pages/HomePage";
import LandingPage from "./components/LandingPage";
import ProfilePage from "./components/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import ResumeAnalysisResults from "./components/ResumeAnalysisResults";
import SignupForm from "./components/auth/SignupForm";
import Stats from "./components/Stats";

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
            path="analyzer"
            element={
              <>
                <ResumeAnalysisResults />
              </>
            }
          />
        </Route>
        <Route path="allresumes" element={<AllResumes />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
