import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  // Check if JWT token is present in localStorage
  useEffect(() => {
    setToken(Cookies.get("token"));
    console.log(token);
    localStorage.setItem("token", token);
    // const token = localStorage.getItem("token"); // JWT token stored
    setIsLoggedIn(!!token); // Convert token existence to boolean
  }, [token]);

  const handleLogout = ()=>{
    Cookies.remove("token");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  }

  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent backdrop-blur-md px-6 z-50">
      <div className="flex justify-between items-center h-[80px]">
        {/* Left - Logo */}
        <div className="ml-4">
          <img src="/images/Logo.png" alt="Logo" className="w-50" />
        </div>

        {/* Center - Navigation Links (Hidden on Mobile) */}
        <div className="hidden md:flex justify-between px-30 rounded-[40px] py-4 w-[650px] text-[19px] font-medium shadow-lg">
          <Link to="/" className="hover:text-[#7F56D9] cursor-pointer">
            Home
          </Link>
          <Link to="/analyser" className="hover:text-[#7F56D9] cursor-pointer">
            Analyser
          </Link>
          <Link to="/stats" className="hover:text-[#7F56D9] cursor-pointer">
            Stats
          </Link>
          <Link to="/about" className="hover:text-[#7F56D9] cursor-pointer">
            About
          </Link>
        </div>

        {/* Right - Buttons (Hidden on Mobile) */}
        {isLoggedIn ? (
          <div className="hidden md:flex items-center gap-7">
            <Link to="/profile" className="text-xl font-medium cursor-pointer hover:text-[#7F56D9]">
              Profile
            </Link>
            <button
                  className="block w-full text-xl px-4 py-2 hover:text-red-600 font-medium flex items-center gap-2 cursor-pointer"
                  onClick={handleLogout}
              >
                  Logout
              </button>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-7">
            <Link to="/login" className="text-xl font-medium cursor-pointer">
              Log in
            </Link>
            <Link
              to="/login"
              className="text-xl font-medium text-white bg-[#7F56D9] py-3 px-5 rounded-xl cursor-pointer hover:bg-[#6B47C6]"
            >
              Sign up
            </Link>
          </div>
        )}

        {/* Hamburger Menu - Visible on Mobile */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden flex flex-col items-center bg-white py-4 shadow-lg rounded-xl transition-all duration-300 ease-in-out ${
          open ? "block" : "hidden"
        }`}
      >
        <Link to="/" className="py-2 hover:text-[#7F56D9] cursor-pointer">
          Home
        </Link>
        <Link
          to="/analyser"
          className="py-2 hover:text-[#7F56D9] cursor-pointer"
        >
          Analyser
        </Link>
        <Link to="/stats" className="py-2 hover:text-[#7F56D9] cursor-pointer">
          About
        </Link>
        <Link
          to="/profile"
          className="py-2 hover:text-[#7F56D9] cursor-pointer"
        >
          Contact
        </Link>
        <Link to="/login" className="py-2 text-xl font-medium cursor-pointer">
          Log in
        </Link>
        <Link
          to="/login"
          className="py-2 text-xl font-medium text-white bg-[#7F56D9] px-6 rounded-xl cursor-pointer hover:bg-[#6B47C6]"
        >
          Sign up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
