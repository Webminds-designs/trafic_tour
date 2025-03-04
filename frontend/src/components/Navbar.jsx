import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaBars } from "react-icons/fa"; // Added FaBars for mobile menu
import logo from "../assets/logoWhite.png";
import logoBlack from "../assets/logoBlack.png";
import PropTypes from "prop-types";
import plane from "../assets/airplane.png";

const Navbar = ({ fontColor }) => {
  const [active, setActive] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu toggle

  return (
    <nav
      className={`flex items-center justify-between px-1 md:px-4 py-4 md:py-8 bg-transparent absolute top-0 left-0 w-full z-10 font-CodeNext-regular`}
    >
      {/* Logo Section */}
      <div className="flex items-center space-x-4 md:space-x-8">
        {fontColor === "text-white" ? (
          <img src={logo} alt="logo" className="w-16 md:w-24" />
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
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:flex lg:space-x-12 text-sm font-base absolute md:static top-16  ${fontColor} left-0 w-full md:w-auto bg-transparentmd:bg-transparent z-10 `}
      >
        {["Home", "Packages", "About Us", "Contact Us"].map((item) => (
          <li
            key={item}
            className="text-center py-2 md:py-0 hover:font-semibold"
          >
            <Link
              to={
                item === "Home"
                  ? "/"
                  : `/${item.toLowerCase().replace(" ", "-")}`
              }
              className={`${
                active === item ? "underline underline-offset-4" : ""
              } block px-4 py-2 md:inline-block`}
              onClick={() => {
                setActive(item);
                setIsMenuOpen(false); // Close menu on link click
              }}
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>

      {/* Right Section */}
      <div className="hidden md:flex items-center space-x-4">
        <div className="group relative inline-block">
          <button
            className={`relative overflow-hidden px-10 py-2 text-sm rounded-3xl font-base cursor-pointer ${
              fontColor === "text-white"
                ? "bg-white text-black"
                : "bg-black text-white"
            }`}
          >
            {/* Animated overlay */}
            <span
              className={`absolute inset-0 ${
                fontColor === "text-white" ? "bg-black" : "bg-white"
              } transform -translate-x-full transition-transform duration-600 group-hover:translate-x-0 p-2 flex justify-end`}
            >
              <img src={plane} alt="plane" className="w-6 h-6" />
            </span>
            {/* Button text */}
            <span
              className={`relative z-10 transition-all duration-800 ${
                fontColor === "text-white"
                  ? "group-hover:text-white"
                  : "group-hover:text-black"
              } group-hover:-translate-x-2`}
            >
              Book Now
            </span>
          </button>
        </div>

        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-black">
          <FaUser className="text-white text-2xl" /> {/* Profile icon */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

Navbar.propTypes = {
  bgColor: PropTypes.string.isRequired,
  fontColor: PropTypes.string.isRequired,
};