import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>CONTACT <span className="text-gray-700 font-semibold" >US</span></p> {" "}
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm"  >
        <img className="w-full max-w-[360px]" src={assets.contact_image}/>
        <div className="flex flex-col items-start gap-6 justify-center "  >
          <p className="font-semibold text-gray-600 text-lg" >OUR OFFICE</p>
          <p className="text-gray-600"> Kailash Puri Palam Colony <br/> New Delhi 110045</p>
          <p className="text-gray-600">Tel :+91 93101639798 <br/> Email : amanrawat9711@gmail.com </p>
          <p className="font-semibold text-gray-600 text-lg">CAREERS AT E-DOCPOINT</p>
          <p className="text-gray-600">Learn more about our teams and job openings</p>
          <button className="border cursor-pointer px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500" >Explore Jobs</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
