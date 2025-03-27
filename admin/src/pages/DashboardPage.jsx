import React,{useContext} from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import P1 from "../assets/P1.png";
import P2 from "../assets/P2.png";
import P3 from "../assets/P3.png";
import Stamps from "../assets/stamps.png";
import { AuthContext } from "../context/authContext.jsx";

const packages = [
    {
        title: "Cool Hill Tour",
        highlights: "Highlights: Trekking to Adam’s Peak, Nine Arches Bridge, eco-resort stay ",
        image: P1,
    },
    {
        title: "Eastern Tour Package",
        highlights: "Highlights: Trekking to Adam’s Peak, Nine Arches Bridge, eco-resort stay ",
        image: P2,
    },
    {
        title: "Adventure Tour Package",
        highlights: "Highlights: Trekking to Adam’s Peak, Nine Arches Bridge, eco-resort stay ",
        image: P3,
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
     const { user, setUser, logout } = useContext(AuthContext);
     console.log(user)
    return (
        <div className="flex bg-gray-200 font-figtree min-h-screen">
            {/* Sidebar - Fixed */}
            <Sidebar activated="UserManagement" />

            {/* Main Content */}
            <div className="flex-1 flex flex-col p-4 md:p-8 overflow-y-auto">
                <Topbar title="Dashboard" />

                {/* Overview Section */}
                <div className="bg-white p-6 md:p-10 rounded-lg mb-6 flex flex-col md:flex-row justify-between items-center">
                    {/* Left Side Content */}
                    <div className="mb-6 md:mb-0 text-center md:text-left">
                        <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-[#003135]">Overview</h3>
                        <p className="text-[#003135] text-lg md:text-xl">
                            Here's a quick overview of your dashboard insights—stay on top of bookings, inquiries, and more at a glance!
                        </p>
                    </div>

                    {/* Right Side Image */}
                    <div>
                        <img src={Stamps} alt="Stamps" className="w-24 md:w-36 h-auto p-1" />
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Recently Added Packages Section */}
                    <div className="w-full lg:w-2/3 bg-white p-5 rounded-lg">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl text-[#003135] font-semibold">Recently Added Packages</h2>
                            <a href="#" className="text-gray-600 text-sm underline">manage tour packages</a>
                        </div>
                        <div className="mt-6 space-y-4">
                            {packages.map((pkg, index) => (
                                <div key={index} className="flex flex-col sm:flex-row items-center gap-4 bg-white p-5 rounded-lg">
                                    <img src={pkg.image} alt={pkg.title} className="w-full sm:w-36 h-36 rounded-lg object-cover" />
                                    <div className="flex-1 text-center sm:text-left">
                                        <h3 className="font-semibold text-xl">{pkg.title}</h3>
                                        <p className="text-gray-600 text-sm">{pkg.highlights}</p>
                                        <button className="mt-4 bg-[#009990] text-white px-4 py-2 rounded-2xl text-sm cursor-pointer">View Package</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - New Activity */}
                    <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-[#003135]">New Activity</h2>
                            <a href="#" className="text-gray-600 text-sm underline">see all</a>
                        </div>
                        <div className="mt-4 space-y-4">
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