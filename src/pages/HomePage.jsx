import React from "react";

const Home = () => {
  return (
    <div className="w-full px-6 py-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between p-8 rounded-lg shadow-2xl backdrop-blur-3xl">
        {/* Left Side (Text) */}
        <div className="w-full md:w-1/2 flex flex-col space-y-6 md:ml-12 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-sans font-medium leading-[1.3] text-wrap">
            Resumify - Power Up <br className="hidden md:block" /> Your Resume!
            ⚡
          </h1>
          <p className="text-lg sm:text-xl font-medium">
            Your resume shouldn’t just exist - it should stand out. Resumify
            supercharges your resume with AI-powered analysis, ensuring it’s
            ATS-friendly, optimized, and interview-ready in seconds.
          </p>
          <button className="bg-[#7F56D9] py-3 px-6 rounded-xl text-xl text-white font-semibold mx-auto md:mx-0">
            Upload your Resume Now 💪
          </button>
        </div>

        {/* Right Side (Image) */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0 ">
          <img
            src="images/resume.png"
            alt="Resume"
            className="w-3/4 md:w-2/3 lg:w-1/2 shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
