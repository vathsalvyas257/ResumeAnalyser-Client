import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Mail, Lock, User } from "lucide-react";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const API_URL = "http://localhost:7777"; // Replace with your backend URL

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const { firstName, emailId, password, confirmPassword } = formData;

    // Validation
    if (!firstName || !emailId || !password || !confirmPassword) {
      toast.error("Please fill all the fields");
      setLoading(false);
      return;
    }

    if (
      password.length < 6 ||
      !/\d/.test(password) ||
      !/[A-Z]/.test(password) ||
      !/[!@#$%^&*]/.test(password)
    ) {
      toast.error(
        "Password must be at least 6 characters long and include a capital letter, number, and special character"
      );
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
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

      setSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        emailId: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error(err.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {success && (
        <div className="text-green-600 text-center font-semibold">
          Signup successful!
        </div>
      )}

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

      <div className="relative">
        <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="email"
          name="emailId"
          placeholder="Email"
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

      <div className="relative">
        <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0077B6]"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-[#7F56D9] text-white p-3 rounded-lg ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
};

export default SignupForm;
