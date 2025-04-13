import { Link } from "react-router-dom";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white-900 py-6 border-t-2 border-[#7F56D9]/70 rounded-2xl">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        
        {/* Left Side - Branding & Copyright */}
        <div className="text-center md:text-left">
          {/* <h2 className="text-lg font-bold">RESUMIFY</h2> */}
          <div className="-ml-5"> 
            <img src="/images/Logo.png" alt="Logo" className="w-50" />
          </div>
          <p className="text-gray-500 font-medium text-sm">© {new Date().getFullYear()} All rights reserved.</p>
        </div>

        {/* Center - Navigation Links */}
        <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 md:mt-0">
          <Link to="/home" className="text-gray-500 font-medium hover:text-[#7F56D9] text-sm">Home</Link>
          <Link to="/analyser" className="text-gray-500 font-medium hover:text-[#7F56D9] text-sm">Analyser</Link>
          <Link to="/stats" className="text-gray-500 font-medium hover:text-[#7F56D9] text-sm">Stats</Link>
          <Link to="/about" className="text-gray-500 font-medium hover:text-[#7F56D9] text-sm">About</Link>
        </div>

        {/* Right Side - Social Media Icons */}
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#7F56D9]">
            <FaLinkedin size={20} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#7F56D9]">
            <FaTwitter size={20} />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#7F56D9]">
            <FaGithub size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
