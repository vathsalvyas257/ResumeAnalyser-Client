import React from "react";
// import logo from "../src/assets/images/Logo.png";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center max-w-[1440px] min-w-[660px] h-[80px] mt-[20px]">
      {/* left */}
      <div className="ml-15">
        <img src="images/Logo.png" alt="" />
      </div>
      {/* middle */}
      <div
        className="flex justify-between px-30 rounded-[40px]  py-4 w-[650px]  text-[19px] font-medium"
        style={{
          boxShadow: "0px 0px 15px rgba(150,150,150,12)",
        }}
      >
        <div>Home</div>
        <div>Analyser</div>
        <div>About</div>
        <div>Contact</div>
      </div>
      {/* right */}
      <div className="flex items-center gap-7  ">
        <div className="text-xl font-medium">Log in</div>
        <div className="text-xl font-medium text-white bg-[#9602ec] py-3 px-5 rounded-xl">
          Sign up
        </div>
      </div>
    </div>
  );
};

export default Navbar;
