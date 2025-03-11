import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center text-gray-500">
        <p className="mt-10">
          ABOUT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>
      <div className="flex flex-col my-10 gap-12 md:flex-row">
        <img className="w-full md:max-w-[360px]  " src={assets.about_image} />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            At E-DocPoint, we believe in simplifying healthcare access through
            technology. Our platform bridges the gap between patients and
            doctors, providing a seamless appointment booking experience.
            Whether you need a consultation, follow-up, or specialist advice,
            E-DocPoint ensures quick, secure, and hassle-free scheduling
          </p>
          <p>
            With a focus on convenience, security, and reliability, we are
            dedicated to making quality healthcare accessible at your
            fingertips. Your well-being is our mission, and we are here to
            support you every step of the way
          </p>
          <b className="text-gray-800">OUR VISION</b>
          <p>
            At e-DocPoint, our vision is to revolutionize healthcare
            accessibility by leveraging technology to create a seamless and
            efficient digital healthcare ecosystem. We aim to eliminate long
            wait times, improve doctor-patient connectivity, and ensure that
            quality medical care is just a few clicks away
          </p>
        </div>
      </div>
      <div className="text-xl my-4">
        <p>
          WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row mb-20 gap-5">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-indigo-500 cursor-pointer hover:text-white transition-all duration-300 text-gray-600">
          <b>EFFICIENCY :</b>
          <p>
            We value your time. With e-DocPoint, scheduling and managing doctor
            appointments is faster and more organized than ever. Our streamlined
            system reduces wait times, minimizes paperwork, and ensures smooth
            communication between patients and doctors
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-indigo-500 cursor-pointer hover:text-white transition-all duration-300 text-gray-600">
          <b>CONVENIENCE :</b>
          <p>
            Healthcare should fit into your lifestyle, not disrupt it.
            e-DocPoint allows you to book appointments anytime, anywhere,
            eliminating the hassle of long queues and last-minute scheduling
            issues. Whether it's an in-person consultation or a virtual visit,
            we make healthcare accessible at your fingertips
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-indigo-500 cursor-pointer hover:text-white transition-all duration-300 text-gray-600">
          <b>PERSONALIZATION :</b>
          <p>
            Every patient is unique, and so are their healthcare needs. Our
            platform is designed to offer tailored healthcare solutions based on
            your preferences, medical history, and specific requirements. From
            finding the right doctor to receiving personalized reminders and
            recommendations, e-DocPoint ensures a care experience that revolves
            around you
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
