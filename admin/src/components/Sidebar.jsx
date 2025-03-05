import React from "react";
import { FaUser, FaBox, FaComments, FaHome } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

const Sidebar = () => {
    return (
        <div className="w-64 h-screen bg-white shadow-lg flex flex-col justify-between p-6">
            <div>
                {/* Logo */}
                <h2 className="text-2xl font-bold text-gray-700 mb-6">TRAFFIC TOURS</h2>

                {/* Navigation Links */}
                <ul className="space-y-4">
                    <li className="flex items-center text-teal-600 font-bold">
                        <FaHome className="mr-2" />
                        Dashboard
                    </li>
                    <li className="flex items-center text-gray-600 hover:text-teal-600 cursor-pointer">
                        <FaUser className="mr-2" />
                        User Management
                    </li>
                    <li className="flex items-center text-gray-600 hover:text-teal-600 cursor-pointer">
                        <FaBox className="mr-2" />
                        Package Management
                    </li>
                    <li className="flex items-center text-gray-600 hover:text-teal-600 cursor-pointer">
                        <FaComments className="mr-2" />
                        Inquiry Management
                    </li>
                    <li className="flex items-center text-gray-600 hover:text-teal-600 cursor-pointer">
                        <FaHome className="mr-2" />
                        Booking Management
                    </li>
                </ul>

                {/* Support Section */}
                <div className="mt-6 bg-teal-100 p-4 rounded-lg text-center">
                    <p className="text-gray-700">Support 24/7</p>
                    <button className="mt-2 bg-teal-600 text-white px-4 py-2 rounded-lg">
                        Check
                    </button>
                </div>
            </div>

            {/* Logout Button */}
            <button className="flex items-center text-red-600 hover:text-red-800">
                <BiLogOut className="mr-2" />
                Log out
            </button>
        </div>
    );
};

export default Sidebar;
