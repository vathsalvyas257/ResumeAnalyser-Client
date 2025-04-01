import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const GoogleOAuth = () => {
  const navigate = useNavigate();
  const API_URL = "http://localhost:7777";

  const handleGoogleLogin = async (details) => {
    try {
      const response = await axios.post(`${API_URL}/googlelogin`, details, {
        withCredentials: true,
      });
      localStorage.setItem("token", response.data.token);
      toast.success("Login Successful!", {
        duration: 2000,
        position: "bottom-right",
      });
      navigate("/analyse");
    } catch {
      toast.error("Google login failed");
    }
  };

  return (
    <GoogleLogin
      onSuccess={(res) => handleGoogleLogin(jwtDecode(res?.credential))}
      onError={() => toast.error("Google login failed")}
    />
  );
};

export default GoogleOAuth;
