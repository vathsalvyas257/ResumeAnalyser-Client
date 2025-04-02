import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Body = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Navbar />
      </div>
      <div className="flex-grow mt-[120px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
