import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Mail, Lock, User } from "lucide-react";
import { motion } from "framer-motion";
import LoginForm from "./LoginForm";

const SignupForm = () => {
  console.log("SignupForm");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_URL = "http://localhost:7777"; // Replace with your backend URL

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (
        formData.firstName === "" ||
        formData.emailId === "" ||
        formData.password === ""
      ) {
        setError("Please fill all the fields");
        setLoading(false);
        return;
      }
      const response = await axios.post(`${API_URL}/signup`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", response.data.user);
      toast.success("Sign Up Successful!", {
        duration: 2000,
        position: "bottom-right",
      });
      navigate("/analyse");
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="relative">
        <User className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0077B6]"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="relative">
        <User className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0077B6]"
          value={formData.lastName}
          onChange={handleInputChange}
        />
      </div>
      <LoginForm />
    </form>
  );
};

export default SignupForm;
