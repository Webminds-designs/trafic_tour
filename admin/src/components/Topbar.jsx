import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaBell } from "react-icons/fa";
import { ChevronDown } from "lucide-react";

const Topbar = ({ title }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);  // Reference to the dropdown menu
    const profileRef = useRef(null);  // Reference to the profile section

    // Toggle dropdown visibility
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the click is outside the dropdown or profile section
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !profileRef.current.contains(event.target)) {
                setIsDropdownOpen(false);  // Close the dropdown
            }
        };

        document.addEventListener("mousedown", handleClickOutside); // Add event listener

        return () => {
            document.removeEventListener("mousedown", handleClickOutside); // Cleanup event listener on unmount
        };
    }, []);

    return (
        <div className="flex items-center justify-between mt-5 mb-15 rounded-lg font-figtree font-bold">
            {/* Title on the left */}
            <p className="text-4xl font-bold text-[#003135]">{title}</p>

            {/* Search Bar */}
            <div className="flex items-center bg-[rgba(0,153,144,0.1)] px-4 py-2 rounded-full w-100">
                <FaSearch className="text-[#003135]" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="ml-2 bg-transparent outline-none w-full text-gray-700"
                />
            </div>

            {/* Notification and Admin Section */}
            <div className="flex items-center gap-8">
                <div className="relative">
                    <FaBell className="text-[#003135] text-xl cursor-pointer" />
                    <span className="absolute top-0 right-0 bg-red-500 h-2 w-2 rounded-full"></span>
                </div>

                {/* Admin Profile Dropdown */}
                <div className="relative" ref={profileRef}>
                    <div className="flex items-center gap-3 cursor-pointer" onClick={toggleDropdown}>
                        <div className="bg-teal-700 text-white rounded-full w-10 h-10 flex items-center justify-center font-base">
                            A
                        </div>
                        <span className="text-[#003135] font-bold">Admin</span>
                        <ChevronDown className="text-[#003135] w-5 h-5 cursor-pointer" />
                    </div>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div ref={dropdownRef} className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg w-48">
                            <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer rounded-lg">Profile</div>
                            <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer rounded-lg">Settings</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Topbar;
