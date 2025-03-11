import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div
      className="flex flex-col flex-wrap md:flex-row rounded-lg px-6 md:px-10 lg:px-20 mt-5 "
      style={{ backgroundColor: "#5f6FFF" }}
    >
      {/* left side */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 md:py-[10vw] m-auto md:mb-[-30px]">
        <p className="text-white font-semibold text-3xl md:text-4xl lg:text-5xl leading-tight md:leading-tight lg:leading-tight">
          Book Appointment <br /> With Trusted Doctors
        </p>

        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light ">
          <img src={assets.group_profiles} />
          <p>
            Simply browse through our extensive list of trusted doctors,{" "}
            <br className="hidden sm:block" /> schedule your appointment
            hassle-free
          </p>
        </div>
        <a
          className="flex items-center cursor-pointer gap-2 bg-white px-8 py-2 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
          href="#speciality"
        >
          Book Appointment <img className="w-3" src={assets.arrow_icon} />
        </a>
      </div>
      <div className="w-1/2 relative ">
        <img 
          className="w-full md:absolute bottom-0 h-auto rounded-lg"
          src={assets.header_img}
        />
      </div>
    </div>
  );
};

export default Header;
