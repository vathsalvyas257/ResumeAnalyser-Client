import React from "react";
import { CircleCheckBig } from "lucide-react";

const features = [
  {
    title: "Instant AI Analysis",
    description:
      "Get AI-powered resume analysis in seconds with a detailed breakdown of strengths and improvement areas.",
    icon: "AI",
  },
  {
    title: "ATS Optimization",
    description:
      "Ensure your resume is ATS-friendly so it gets past recruiters' screening systems with ease.",
    icon: "✔️",
  },
  {
    title: "Interview Readiness",
    description:
      "Receive actionable feedback to refine your resume and make it stand out for hiring managers.",
    icon: "🚀",
  },
];

const Home = () => {
  return (
    <div className="w-full px-6 -mt-6 overflow-x-hidden">
      {/* Hero Section */}
      <div className=" flex flex-col md:flex-row items-center justify-between p-8 rounded-lg shadow-2xl backdrop-blur-3xl bg-white">
        {/* Left Side (Text) */}
        <div className="w-full md:w-1/2 flex flex-col space-y-6 md:ml-12 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-sans font-medium leading-tight">
            Resumify - Power Up <br className="hidden md:block" /> Your Resume!
            ⚡
          </h1>
          <p className="text-lg sm:text-xl font-medium text-gray-700">
            Your resume shouldn’t just exist - it should stand out. Resumify
            supercharges your resume with AI-powered analysis, ensuring it’s
            ATS-friendly, optimized, and interview-ready in seconds.
          </p>
          <button className="bg-[#7F56D9] py-3 px-6 rounded-xl text-xl text-white font-semibold mx-auto md:mx-0 transition-all duration-300 hover:bg-[#6A45C8] w-[60%]">
            Upload your Resume Now 💪
          </button>
        </div>

        {/* Right Side (Image) */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0">
          <img
            src="images/resume.png"
            alt="Resume"
            className="w-3/4 md:w-2/3 lg:w-1/2 shadow-xl rounded-lg"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-[200px] pb-10">
        <h2 className="text-5xl font-sans font-semibold text-center">
          Why Choose Resumify?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 px-4 md:px-0">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl"
            >
              <div className="bg-[#7F56D9] p-5 rounded-2xl text-xl font-bold text-white shadow-lg">
                {feature.icon}
              </div>
              <h2 className="text-2xl font-semibold mt-4">{feature.title}</h2>
              <p className="mt-3 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Guide Section */}
      <div className="mt-15  flex flex-col items-center px-4 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium w-full sm:w-3/4">
          Unlock your Resume's Potential with Resumify!
        </h1>
        <div className="flex justify-center w-full mt-6">
          <img
            src="images/guide.png"
            alt="Guide"
            className="w-full sm:w-3/4 md:w-3/4"
          />
        </div>
      </div>
      {/* Call to Action Section */}
      <div className="w-full mt-5 ml-1 md:ml-10 flex flex-col md:flex-row items-center md:px-10">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium">
            Don't Just Submit <br /> Stand Out!
          </h1>
          <div className="mt-10 flex flex-col gap-4 text-xl sm:text-2xl text-[#7F56D9]">
            <p className="flex gap-2 items-center">
              <CircleCheckBig color="#7F56D9" /> AI powered Resume Analyser
            </p>
            <p className="flex gap-2 items-center">
              <CircleCheckBig color="#7F56D9" /> Instant analysis
            </p>
          </div>
          <button className="bg-[#7F56D9] mt-6 py-3 px-6 rounded-xl text-lg sm:text-xl text-white font-medium">
            ⚡ Try Resumify Now
          </button>
        </div>
        <div className="w-full hidden md:flex justify-center mt-8 md:mt-0">
          <img
            src="images/img1.gif"
            alt="Animation"
            className="w-full sm:w-3/4 md:w-[600px] h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
