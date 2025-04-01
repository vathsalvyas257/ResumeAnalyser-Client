import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import Body from "./components/Body";
import AuthForm from "./components/auth/AuthForm";
import LandingPage from "./components/LandingPage";
import Stats from "./components/Stats";
import ProfilePage from "./components/ProfilePage";
import SignupForm from "./components/auth/SignupForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<AuthForm />} />
          <Route path="signup" element={<SignupForm />} />
          <Route path="stats" element={<Stats />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route
            path="analyse"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
