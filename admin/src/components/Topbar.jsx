import React from "react";
import { FaSearch, FaBell } from "react-icons/fa";

const Topbar = () => {
    return (
        <div className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg mb-6">
            {/* Search Bar */}
            <div className="flex items-center bg-gray-100 p-2 rounded-lg w-1/3">
                <FaSearch className="text-gray-500 mr-2" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent outline-none w-full"
                />
            </div>

            {/* Notification and Profile */}
            <div className="flex items-center space-x-6">
                <FaBell className="text-gray-600 cursor-pointer" />
                <div className="flex items-center space-x-2">
                    <div className="bg-gray-300 text-gray-800 p-2 rounded-full">
                        A
                    </div>
                    <p className="text-gray-700 font-bold">Admin</p>
                </div>
            </div>
        </div>
    );
};

export default Topbar;
