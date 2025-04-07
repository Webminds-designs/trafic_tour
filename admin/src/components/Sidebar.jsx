import React,{useContext} from "react";
import { Link } from "react-router-dom";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { HiMiniUser } from "react-icons/hi2";
import { BiSolidPackage } from "react-icons/bi";
import { AiFillMessage } from "react-icons/ai";
import { TbHomeFilled } from "react-icons/tb";
import logo from "../assets/logo.jpg";
import { IoMdLogOut } from "react-icons/io";
import { AuthContext } from "../context/authContext.jsx";

const Sidebar = ({ activated }) => {
     const { user, setUser, logout } = useContext(AuthContext);
    return (
        <div className="w-72 h-screen bg-white flex flex-col justify-between p-7 font-figtree font-bold sticky top-0">
            <div>
                {/* Logo */}
                <img src={logo} alt="Traffic Tours Logo" className="w-32 h-auto mb-12" />

                {/* Navigation Links */}
                <ul className="space-y-8">
                    <li>
                        <Link
                            to="/dashboard"
                            className={`flex items-center text-lg font-bold cursor-pointer transition-all duration-300 ${location.pathname === "/" ? "text-[#009990]" : "text-black"
                                } hover:bg-[#ffffff]`}
                        >
                            <TbLayoutDashboardFilled className="mr-2" />
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/UserManagement"
                            className={`flex items-center text-lg font-bold cursor-pointer transition-all duration-300 ${location.pathname === "/UserManagement" ? "text-[#009990]" : "text-black"
                                }`}
                        >
                            <HiMiniUser className="mr-3" />
                            User Management
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/packages"
                            className={`flex items-center text-lg font-bold cursor-pointer transition-all duration-300 ${location.pathname === "/packages" ? "text-[#009990]" : "text-black"
                                }`}
                        >
                            <BiSolidPackage className="mr-3" />
                            Package Management
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/inquiries"
                            className={`flex items-center text-lg font-bold cursor-pointer transition-all duration-300 ${location.pathname === "/inquiries" ? "text-[#009990]" : "text-black"
                                }`}
                        >
                            <AiFillMessage className="mr-3" />
                            Inquiry Management
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/bookings"
                            className={`flex items-center text-lg font-bold cursor-pointer transition-all duration-300 ${location.pathname === "/bookings" ? "text-[#009990]" : "text-black"
                                }`}
                        >
                            <TbHomeFilled className="mr-3" />
                            Booking Management
                        </Link>
                    </li>
                </ul>

                {/* Support Section */}
                <div className="mt-15 p-4 rounded-lg text-center">
                    <p className="text-gray-700">Check inquiries to help your clients!</p>
                    <button className="mt-5 bg-[#009990] text-white px-2 py-1 rounded-2xl text-medium cursor-pointer">
                        Check
                    </button>
                </div>
            </div>

            {/* Logout Button */}
            <button onClick={logout} className="flex items-center text-red-900 text-lg font-bold cursor-pointer">
                <IoMdLogOut className="mr-3 text-bold" />
                Log Out
            </button>
        </div >
    );
};

export default Sidebar;
