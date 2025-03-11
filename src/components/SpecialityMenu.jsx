import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";
const SpecialityMenu = () => {
  return (
    <div
      className="flex flex-col items-center gap-4 py-12 text-gray-650"
      id="speciality"
    >
      <h1 className="text-3xl font-medium">Find By Speciality</h1>
      <p className="sm:w-1/3 text-center text-sm">
        {" "}
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free
      </p>
      <div className="flex flex-row gap-10 sm:justify-center pt-5 w-full overflow-scroll">
        {specialityData.map((item, index) => (
          <Link
            onClick={() => {
              scrollTo(0, 0);
            }}
            className="flex flex-col transition-all duration-500 curson-pointer items-center text-xs flex-shrink-0 hover:translate-y-[-10px]"
            key={index}
            to={`/doctors/${item.speciality}`}
          >
            <img className="mb-2 w-16 sm:w-24" src={item.image} />
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
