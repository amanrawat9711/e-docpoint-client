import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const {token,setToken,userData} = useContext(AppContext)

  const logout=()=>{
    setToken('')
    localStorage.removeItem('token')
  }
  return (
    <div className="flex items-center justify-between text-sm py-1 mb-1 border-b-gray-500">
      <img
        className="w-60 cursor-pointer"
        onClick={() => {
          navigate("/");
          scrollTo(0, 0);
        }}
        src={assets.logo}
        alt="logo"
      />
      <ul className="hidden md:flex font-medium items-start gap-5">
  <NavLink
    to="/"
    className={({ isActive }) =>
      `py-1 relative ${isActive ? " font-semibold after:absolute after:content-[''] after:w-full after:h-0.5 after:bg-indigo-500 after:bottom-0 after:left-0" : ""}`
    }
  >
    HOME
  </NavLink>
  <NavLink
    to="/doctors"
    className={({ isActive }) =>
      `py-1 relative ${isActive ? "font-semibold after:absolute after:content-[''] after:w-full after:h-0.5 after:bg-indigo-500 after:bottom-0 after:left-0" : ""}`
    }
  >
    ALL DOCTORS
  </NavLink>
  <NavLink
    to="/contact"
    className={({ isActive }) =>
      `py-1 relative ${isActive ? "font-semibold after:absolute after:content-[''] after:w-full after:h-0.5 after:bg-indigo-500 after:bottom-0 after:left-0" : ""}`
    }
  >
    CONTACT
  </NavLink>
  <NavLink
    to="/about"
    className={({ isActive }) =>
      `py-1 relative ${isActive ? " font-semibold after:absolute after:content-[''] after:w-full after:h-0.5 after:bg-indigo-500 after:bottom-0 after:left-0" : ""}`
    }
  >
    ABOUT
  </NavLink>
</ul>

      <div className="flex items-center gap-4">
        {token && userData ? (
          <div 
            className="flex items-center gap-2 cursor-pointer relative"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img className="w-8 rounded-full" src={userData.image} alt="profile_pic" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="dropdown_icon" />

            {/* Profile Dropdown */}
            <div
              className={`absolute top-10 right-0 min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 shadow-lg z-20 transition-all ${
                showDropdown ? "block" : "hidden"
              }`}
            >
              <p
                onClick={() => {
                  navigate("/my-profile");
                  setShowDropdown(false);
                }}
                className="text-gray-600 hover:text-black cursor-pointer"
              >
                My Profile
              </p>
              <p
                onClick={() => {
                  navigate("/my-appointments");
                  setShowDropdown(false);
                }}
                className="text-gray-600 hover:text-black cursor-pointer"
              >
                My Appointments
              </p>
              <p
                onClick={() => {
                  logout()
                  setShowDropdown(false);
                }}
                className="text-gray-600 hover:text-black cursor-pointer"
              >
                Logout
              </p>
            </div>
          </div>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="py-3 px-8 text-white rounded-full font-light hidden md:block cursor-pointer"
            style={{ backgroundColor: "#5f6FFF" }}
          >
            Create Account
          </button>
        )}
        
        {/* Mobile Menu */}
        <img onClick={() => setShowMenu(true)} src={assets.menu_icon} className="w-6 md:hidden" />
        <div className={` ${showMenu ? "fixed w-full" : "h-0 w-0"} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className="flex items-center justify-between py-6 px-5">
            <img
              className="w-40"
              onClick={() => {
                navigate("/");
                scrollTo(0, 0);
                setShowMenu(false);
              }}
              src={assets.logo}
            />
            <img className="w-10" src={assets.cross_icon} onClick={() => setShowMenu(false)} />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to="/">
              <p className="px-4 py-2 inline-block rounded">Home</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctors">
              <p className="px-4 py-2 inline-block rounded">All Doctors</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about">
              <p className="px-4 py-2 inline-block rounded">About</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">
              <p className="px-4 py-2 inline-block rounded">Contact</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
