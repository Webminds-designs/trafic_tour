import React from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import P1 from '../assets/P1.png';
import P2 from '../assets/P2.png';
import P3 from '../assets/P3.png';
import Stamps from '../assets/stamps.png';


const packages = [
    {
        title: "Cool Hill Tour",
        highlights: "Trekking to Adam’s Peak, Nine Arches Bridge, eco-resort stay",
        image: P1, // Path to your image in the assets folder
    },
    {
        title: "Eastern Tour Package",
        highlights: "Trekking to Adam’s Peak, Nine Arches Bridge, eco-resort stay",
        image: P2, // Path to your image in the assets folder
    },
    {
        title: "Adventure Tour Package",
        highlights: "Trekking to Adam’s Peak, Nine Arches Bridge, eco-resort stay",
        image: P3, // Path to your image in the assets folder
    },
];


const activities = [
    { name: "Malinka Weerasinghe", type: "New User", image: "https://via.placeholder.com/50" },
    { name: "Farah Firthouse", type: "New User", image: "https://via.placeholder.com/50" },
    { name: "Serene Beach Package", type: "New Package", image: "https://via.placeholder.com/50" },
    { name: "Jacob Mendis", type: "New User", image: "https://via.placeholder.com/50" },
    { name: "Yala Safari Package", type: "New Package", image: "https://via.placeholder.com/50" },
];


const DashboardPage = () => {
    return (
        <div className="flex bg-gray-200 font-figtree">
            {/* Sidebar - Fixed */}

            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col p-8 ml-1/4 overflow-y-auto">
                <Topbar title="Dashboard" />

                {/* Overview Section */}
                <div className="bg-white p-10 rounded-lg mb-6 font-figtree flex justify-between items-center">
                    {/* Left Side Content */}
                    <div>
                        <h3 className="text-3xl font-semibold mb-4 text-[#003135]">Overview</h3>
                        <p className="text-[#003135] text-xl">
                            Here's a quick overview of your dashboard insights—stay on top of bookings, inquiries, and more at a glance!
                        </p>
                    </div>

                    {/* Right Side Image */}
                    <div>
                        <img src={Stamps} alt="Stamps" className="w-36 h-auto p-1" /> {/* Adjust width and height as needed */}
                    </div>
                </div>

                <div className="flex gap-6">
                    {/* Recently Added Packages Section */}
                    <div className="w-2/3 bg-white p-5 rounded-lg">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl text-[#003135] font-semibold">Recently Added Packages</h2>
                            <a href="#" className="text-gray-600 text-sm underline">manage tour packages</a>
                        </div>
                        <div className="mt-10 space-y-2">
                            {packages.map((pkg, index) => (
                                <div key={index} className="flex items-center gap-4 bg-white p-5 rounded-lg">
                                    <img src={pkg.image} alt={pkg.title} className="w-36 h-36 rounded-lg object-cover" />
                                    <div>
                                        <h3 className="font-semibold text-xl">{pkg.title}</h3>
                                        <p className="text-gray-600 text-sm">{pkg.highlights}</p>
                                        <button className="mt-5 bg-[#009990] text-white px-2 py-1 rounded-2xl text-sm cursor-pointer">View Package</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - New Activity */}
                    <div className="w-1/3 bg-white p-6 rounded-lg">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-[#003135]">New Activity</h2>
                            <a href="#" className="text-gray-600 text-sm underline">see all</a>
                        </div>
                        <div className="mt-4 space-y-8">
                            {activities.map((activity, index) => (
                                <div key={index} className="flex items-center justify-between text-[#003135]">
                                    <div className="flex items-center gap-3">
                                        <img src={activity.image} alt={activity.name} className="w-10 h-10 rounded-full object-cover" />
                                        <div>
                                            <h3 className="font-medium text-[#003135]">{activity.name}</h3>
                                            <p className="text-gray-500 text-sm">{activity.type}</p>
                                        </div>
                                    </div>
                                    <a href="#" className="text-sm text-[#003135]">View</a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};




export default DashboardPage;
