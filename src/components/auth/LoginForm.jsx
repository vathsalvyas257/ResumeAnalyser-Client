import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { login } from "../../redux/userSlice";

const LoginForm = () => {
  const [formData, setFormData] = useState({ emailId: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch(); //  Redux dispatch
  const API_URL = "http://localhost:7777"; 

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (formData.emailId === "" || formData.password === "") {
        setError("Please fill all the fields");
        setLoading(false);
        return;
      }

      const response = await axios.post(`${API_URL}/login`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      const { token, user } = response.data;
      console.log("Login response:", response.data);

      // Save in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Dispatch login action
      dispatch(login({ token, user }));

      toast.success("Login Successful!", {
        duration: 2000,
        position: "bottom-right",
      });

      navigate("/", { replace: true });
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="relative">
        <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="email"
          name="emailId"
          placeholder="Email Address"
          className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0077B6]"
          value={formData.emailId}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="relative">
        <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0077B6]"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </div>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <motion.button
        type="submit"
        className="w-full bg-[#0077B6] hover:bg-[#023E8A] text-white py-3 rounded-lg font-semibold transition-all disabled:opacity-50"
        whileHover={{ scale: loading ? 1 : 1.05 }}
        disabled={loading}
      >
        {loading ? "Processing..." : "Sign In"}
      </motion.button>
    </form>
  );
};

export default LoginForm;
