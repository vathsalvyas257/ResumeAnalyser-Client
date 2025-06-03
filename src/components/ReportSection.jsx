// ResumeSection.jsx
import React from 'react';

const ReportSection = ({ icon, title, children, subtitle }) => {
  return (
    <section className="bg-white rounded-4xl border border-gray-300 border-l-6 border-l-blue-600 p-5 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gradient-to-b from-[#256EFF] to-[#164299] text-white rounded-full p-2">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-blue-600">{title}</h3>
      </div>
      {subtitle && <p className="text-sm text-gray-600 mb-4">{subtitle}</p>}
      <div className="text-gray-700 text-md leading-relaxed space-y-4">{children}</div>
    </section>
  );
};

export default ReportSection;
