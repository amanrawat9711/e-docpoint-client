import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-700 md:mx-10">
      <h1 className="text-3xl font-medium">Find By Speciality</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors
      </p>
      <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {doctors.slice(0, 10).map((items, index) => (
          <div key={index}  className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500" > 
            <img 
              className="bg-blue-50"
              onClick={() => {
                navigate(`/appointment/${items._id}`);
                scrollTo(0, 0);
              }}
              src={items.image}
              
            />
            <div className="p-4">
              <div className="flex items-center gap-2 text-green-400 text-sm text-center">
                <p className="w-2 h-2 rounded-full bg-green-500"></p>{" "}
                <p>available</p>
              </div>
              <p className="text-gray-700 text-lg font-medium"> {items.name}</p>
              <p className="text-gray-700 text-sm">{items.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="bg-blue-100 text-gray-500 px-12 py-3 rounded-full mt-10 cursor-pointer"
      >
        more
      </button>
    </div>
  );
};

export default TopDoctors;
