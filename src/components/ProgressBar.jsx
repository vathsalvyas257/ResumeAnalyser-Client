import React from "react";

const GradientProgressBar = ({ value, max = 100, label }) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="w-full bg-gray-200 rounded-full flex items-center h-7 overflow-hidden shadow-md">
      <div
        className="h-full text-white text-sm rounded-4xl font-medium flex items-center justify-center"
        style={{
          width: `${percentage}%`,
          background: "linear-gradient(to right, #00c6ff, #0072ff)",
          transition: "width 0.5s ease-in-out",
        }}
      >
        <div className="relative  left-0 text-center text-s font-semibold text-gray-700 mx-10">
          {label}
        </div>
        {Math.round(percentage)} %
      </div>
    </div>
  );
};

export default GradientProgressBar;
