// import React from "react";

// const GradientProgressBar = ({ value, max = 100, label }) => {
//   const percentage = Math.min((value / max) * 100, 100);

//   return (
//     <div className="w-full bg-gray-200 rounded-full flex items-center h-7 overflow-hidden shadow-md">
//       <div
//         className="h-full text-white text-sm rounded-4xl font-medium flex items-center justify-center"
//         style={{
//           width: `${percentage}%`,
//           background: "linear-gradient(to right, #00c6ff, #0072ff)",
//           transition: "width 1.0s ease-in-out",
//         }}
//       >
//         <div className="relative  left-0 text-center text-s font-semibold text-gray-700 mx-10">
//           {label}
//         </div>
//         {Math.round(percentage)} %
//       </div>
//     </div>
//   );
// };
import React from "react";
const ProgressBar = ({ sectionScores }) => {
  return (
    <div className="space-y-2 flex-1">
      {sectionScores.map((category, index) => (
        <div key={index}>
          <div className="text-blue-600 font-medium text-sm mb-1">{category.section}</div>

          <div className="flex items-center space-x-3">
            {/* Progress Bar */}
            <div className="flex-1 bg-blue-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="h-2.5 rounded-full"
                style={{
                  width: `${category.score}%`,
                  background: 'linear-gradient(to right, #3B82F6, #1D4ED8)',
                }}
              ></div>
            </div>

            {/* Score */}
            <span className="text-blue-600 text-sm font-semibold w-12 text-right">
              {category.score}/100
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};


export default ProgressBar;
