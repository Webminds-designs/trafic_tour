import React from "react";
import { FaUser, FaBox, FaComments, FaHome, FaSearch, FaBell } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const DashboardPage = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 p-6">
                <Topbar />

                {/* Overview Section */}
                <div className="bg-white p-6 rounded-lg shadow mb-6">
                    <h3 className="text-xl font-bold mb-2">Overview</h3>
                    <p className="text-gray-600">Here's a quick overview of your dashboard insights—stay on top of bookings, inquiries, and more at a glance!</p>
                </div>

                {/* Recently Added Packages */}
                <div className="bg-white p-6 rounded-lg shadow mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">Recently Added Packages</h3>
                        <a href="#" className="text-teal-600">Manage Tour Packages</a>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <img src="https://via.placeholder.com/100" alt="Cool Hill Tour" className="rounded-lg" />
                            <div>
                                <h4 className="font-bold">Cool Hill Tour</h4>
                                <p className="text-gray-600">Highlights: Trekking to Adam’s Peak, Nine Arches Bridge, eco-resort stay</p>
                                <button className="bg-teal-600 text-white px-4 py-2 rounded-lg mt-2">View Package</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* New Activity */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">New Activity</h3>
                        <a href="#" className="text-teal-600">see all</a>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <img src="https://via.placeholder.com/40" alt="User" className="rounded-full" />
                            <div>
                                <h4 className="font-bold">Malinka Weerasinghe</h4>
                                <p className="text-gray-600">New User</p>
                            </div>
                            <a href="#" className="text-teal-600">View</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
