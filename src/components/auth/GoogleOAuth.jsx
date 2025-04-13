import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { login } from "../../redux/userSlice";

const GoogleOAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleGoogleLogin = async (details) => {
    try {

      const response = await axios.post(`${API_URL}/googlelogin`, { emailId:details.email, firstName: details.family_name, lastName: details.given_name }, 
        {
           headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
    );
    const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(login({ token, user }));
      toast.success("Logged in Successfully!", {
        duration: 2000,
        position: "bottom-right",
      });
      navigate("/analyser");
    } catch {
      toast.error("Google login failed", {duration: 2000, position: "bottom-right"});
    }
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
      <GoogleLogin
        onSuccess={(res) => handleGoogleLogin(jwtDecode(res?.credential))}
        onError={() => toast.error("Google login failed")}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleOAuth;
