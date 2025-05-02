import React, { useState, useContext } from "react";
import { AuthContext } from "../context/authContext.jsx";
import { Link } from "react-router-dom";
import { FaUser, FaBars } from "react-icons/fa"; // Added FaBars for mobile menu
import logo from "../assets/logoWhite.png";
import logoBlack from "../assets/logoBlack.png";
import PropTypes from "prop-types";
import plane from "../assets/airplane.png";
import { useLocation } from "react-router-dom";


const Navbar = ({ fontColor }) => {
  const { user } = useContext(AuthContext);
  const [active, setActive] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu toggle
  const location = useLocation();
  return (
    <nav
      className={`flex items-center justify-between px-1 md:px-3 py-4 md:py-8 absolute top-0 left-0 w-full z-10 font-CodeNext-regular
      ${isMenuOpen ? 'bg-white/90 backdrop-blur-3xl' : 'bg-transparent'} 
      md:bg-transparent md:backdrop-blur-none`}
    >
      {/* Logo Section */}
      <div className="flex items-center space-x-4 md:space-x-8 -bg-conic-120 ">
        {fontColor === "text-white" ? (
          <img src={isMenuOpen ? logoBlack : fontColor === "text-white" ? logo : logoBlack} alt="logo" className="w-16 md:w-24" />
        ) : (
          <img src={logoBlack} alt="logo" className="w-16 md:w-24" />
        )}
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FaBars className="text-2xl" />
        </button>
      </div>

      {/* Nav Links */}
      <ul
        className={`${isMenuOpen ? "block z-50" : "hidden"
          } ${isMenuOpen ? 'bg-white/90 backdrop-blur-3xl' : 'bg-transparent'} md:flex lg:space-x-12  text-sm font-base absolute md:static top-18 text-black md:${fontColor} left-0 w-full md:w-auto bg-transparentmd:bg-transparent z-10`}
      >
        {["Home", "Packages", "About Us", "Contact Us"].map((item) => {
          const path = item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`;
          const isActive = location.pathname === path;

          return (
            <li key={item} className={` text-center py-2 md:py-0 hover:font-semibold z-100`}>
              <Link
                to={path}
                className={`      block px-4 py-2 md:inline-block ${isActive ? "underline underline-offset-4  " : ""
                  }`}
                onClick={() => setIsMenuOpen(false)} // Close menu on click
              >
                {item}
              </Link>
            </li>
          );
        })}
        <Link to="/profile">
          <div className={`  md:hidden text-sm font-base flex justify-center top-16 text-black left-0 w-full pb-6 z-10`}>
            profile
          </div>
        </Link>

      </ul>

      {/* Right Section */}
      <div className="hidden md:flex items-center space-x-4">
        <div className="group relative inline-block">
          <Link to="/packages">
            <button
              className={`relative overflow-hidden px-10 py-2 text-sm rounded-3xl font-base cursor-pointer ${fontColor === "text-white"
                  ? "bg-white text-black"
                  : "bg-black text-white"
                }`}
            >
              {/* Animated overlay */}
              <span
                className={`absolute inset-0 ${fontColor === "text-white" ? "bg-black" : "bg-white"
                  } transform -translate-x-full transition-transform duration-600 group-hover:translate-x-0 p-2 flex justify-end`}
              >
                <img src={plane} alt="plane" className="w-6 h-6" />
              </span>
              {/* Button text */}
              <span
                className={`relative z-10 transition-all duration-800 ${fontColor === "text-white"
                    ? "group-hover:text-white"
                    : "group-hover:text-black"
                  } group-hover:-translate-x-2`}
              >
                Book Now
              </span>
            </button>
          </Link>
        </div>

        <Link to="/profile">
          <div className="w-10 h-10 cursor-pointer rounded-full flex items-center justify-center bg-black overflow-hidden mr-4">
            {user?.profileUrl ? (
              <img
                src={user.profileUrl}
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUser className="text-white text-2xl" />
            )}
          </div>
        </Link>

      </div>
    </nav>
  );
};

export default Navbar;

Navbar.propTypes = {
  bgColor: PropTypes.string.isRequired,
  fontColor: PropTypes.string.isRequired,
};