import { BrowserRouter, Route, Routes } from "react-router-dom";

import AllResumes from "./components/AllResumes";
import AuthForm from "./components/auth/AuthForm";
import Body from "./components/Body";
import Home from "./pages/HomePage";
import ProfilePage from "./components/ProfilePage";
import ResumeAnalysisResults from "./components/ResumeAnalysisResults";
import SignupForm from "./components/auth/SignupForm";
import Stats from "./components/Stats";

const scores = {
  overall: 78.6,
  categories: [
    { label: "ATS Compatibility", value: 90.2 },
    { label: "Keyword Optimization", value: 29.3 },
    { label: "Structure & Formatting", value: 95.3 },

  ],
};


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
                <ResumeAnalysisResults scores={scores}/>
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
