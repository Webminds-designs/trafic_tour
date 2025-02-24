import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaBars } from 'react-icons/fa'; // Added FaBars for mobile menu

const Navbar = () => {
    const [active, setActive] = useState("PACKAGES");
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu toggle

    return (
        <nav className="flex items-center justify-between px-4 md:px-24 py-4 md:py-8 bg-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            {/* Logo Section */}
            <div className="flex items-center space-x-4 md:space-x-20">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-300 flex items-center justify-center rounded-full">
                    {/* Replace this div with your logo */}
                    <span className="text-lg font-bold">T</span>
                </div>
                <span className="font-bold text-lg">TRAFFIC TOURS</span>
            </div>

            {/* Hamburger Menu for Mobile */}
            <div className="md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <FaBars className="text-2xl" />
                </button>
            </div>

            {/* Nav Links */}
            <ul className={`${isMenuOpen ? "block" : "hidden"} md:flex md:space-x-24 text-lg font-base absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent z-10`}>
                {["HOME", "PACKAGES", "ABOUT US", "CONTACT US"].map((item) => (
                    <li key={item} className="text-center py-2 md:py-0">
                        <Link
                            to={`/${item.toLowerCase().replace(" ", "-")}`}
                            className={`${active === item ? "underline underline-offset-4" : ""} block px-4 py-2 md:inline-block`}
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
                <button className="bg-black text-white px-8 py-2 rounded-md font-base">
                    BOOK NOW
                </button>
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-black">
                    <FaUser className="text-white text-2xl" /> {/* Profile icon */}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;