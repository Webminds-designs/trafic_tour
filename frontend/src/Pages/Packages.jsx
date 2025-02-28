import React, { useState, useRef } from 'react';
import PackageCard from '../components/PackageCard';
import packages from '../data/packageData';
import Navbar from '../components/Navbar';
import backgroundImage from '../assets/lepord.jpg';


const Packages = () => {
    const [selectedSection, setSelectedSection] = useState('ALL PACKAGES');
    const targetSectionRef = useRef(null);

    const sections = [
        'ALL PACKAGES',
        'ADVENTURE PACKAGES',
        'EDUCATIONAL PACKAGES',
    ];

    const handleSectionClick = (section) => {
        setSelectedSection(section);
    };

    const handleExplore = (title) => {
        console.log(`Explore clicked for ${title}`);
    };

    const handleFindBestPackage = () => {
        if (targetSectionRef.current) {
            targetSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <Navbar />
            <div
                className="bg-white w-full mt-30"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
                <div className="text-black">
                    {/* Header Section */}
                    <div className="flex flex-col lg:flex-row justify-between items-center px-4 sm:px-6 lg:px-20">
                        <div className="text-left pt-10 lg:pt-20 pb-6 lg:pb-14">
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-base">TRAVEL</h1>
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-base">PACKAGES</h1>
                        </div>
                        <div className="text-right max-w-md px-4 lg:px-7 pt-6 lg:pt-36">
                            <p className="text-xs sm:text-sm font-base">
                                EMBARK ON AN UNFORGETTABLE JOURNEY THROUGH SRI LANKA, WHERE <br />
                                EVERY EXPERIENCE IS CRAFTED TO INSPIRE, RELAX, AND AWAKEN <br />
                                YOUR SENSE OF ADVENTURE.
                            </p>
                        </div>
                    </div>

                    {/* Packages Section Bar */}
                    <div className="flex flex-col items-center mt-6 lg:mt-10 font-base">
                        <div className="bg-black text-white flex w-full max-w-7xl overflow-x-auto">
                            {sections.map((section, index) => (
                                <div
                                    key={index}
                                    className={`flex-1 text-center py-3 lg:py-4 text-xs sm:text-sm cursor-pointer transition-all duration-300 
                        ${selectedSection === section ? 'bg-white text-black border-b-4 border-black' : ''}`}
                                    onClick={() => handleSectionClick(section)}
                                >
                                    {section}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Packages Grid */}
                    <div className="mt-10 lg:mt-30 mb-14 lg:mb-28 px-4 sm:px-6 lg:px-20">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-base">EXPERIENCE THE THRILL OF</h2>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-base">SRI LANKA'S WILDERNESS</h2>

                        <div className="flex justify-end mt-4">
                            <button
                                onClick={handleFindBestPackage}
                                className="text-base sm:text-lg lg:text-xl font-base text-teal-600 hover:underline"
                            >
                                FIND THE BEST PACKAGE
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-10 lg:mt-20">
                            {packages['ALL PACKAGES'].map((packageItem) => (
                                <PackageCard
                                    key={packageItem.title}
                                    packageItem={packageItem} // Pass the entire package object
                                    onExplore={() => console.log(`Exploring ${packageItem.title}`)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Find Best Package Section */}
                    <div
                        ref={targetSectionRef}
                        className="relative w-full h-[400px] lg:h-screen bg-cover bg-center mt-10 lg:mt-30 mb-20 lg:mb-30"
                        style={{
                            backgroundImage: `url(${backgroundImage})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                        }}
                    >
                        <div className="absolute -bottom-20 lg:-bottom-40 left-1/2 transform -translate-x-1/2 w-11/12 lg:w-3/4 bg-white p-6 lg:p-12 rounded-lg">
                            <h2 className="text-lg lg:text-xl font-bold mb-4">FIND THE BEST PACKAGE</h2>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    console.log("Form submitted");
                                    console.log("Destination:", e.target.destination.value);
                                    console.log("Travel Dates:", e.target.travelDate.value);
                                    console.log("Trip Duration:", e.target.tripDuration.value);
                                    console.log("Number of Travelers:", e.target.travelers.value);
                                }}
                            >

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Destination Field */}
                                    <div>
                                        <label className="text-sm font-semibold" htmlFor="destination">
                                            DESTINATION
                                        </label>
                                        <input
                                            type="text"
                                            id="destination"
                                            name="destination"
                                            placeholder="SIGIRIYA, ELLA, ETC"
                                            className="w-full p-2 mt-1 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        />
                                    </div>

                                    {/* Travel Dates Field */}
                                    <div>
                                        <label className="text-sm font-semibold" htmlFor="travelDate">
                                            TRAVEL DATES
                                        </label>
                                        <input
                                            type="date"
                                            id="travelDate"
                                            name="travelDate"
                                            className="w-full p-2 mt-1 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        />
                                    </div>

                                    {/* Trip Duration Field */}
                                    <div>
                                        <label className="text-sm font-semibold" htmlFor="tripDuration">
                                            TRIP DURATION
                                        </label>
                                        <input
                                            type="text"
                                            id="tripDuration"
                                            name="tripDuration"
                                            placeholder="10 DAYS"
                                            className="w-full p-2 mt-1 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        />
                                    </div>

                                    {/* Number of Travelers Field */}
                                    <div>
                                        <label className="text-sm font-semibold" htmlFor="travelers">
                                            NUMBER OF TRAVELERS
                                        </label>
                                        <select
                                            id="travelers"
                                            name="travelers"
                                            className="w-full p-2 mt-1 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        >
                                            <option value="2 ADULTS">2 ADULTS</option>
                                            <option value="1 ADULT">1 ADULT</option>
                                            <option value="3 ADULTS">3 ADULTS</option>
                                            <option value="FAMILY PACKAGE">FAMILY PACKAGE</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-teal-600 text-white py-2 mt-6 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                >
                                    FIND
                                </button>
                            </form>
                        </div>


                    </div>
                </div >
            </div >
        </>
    );
};

export default Packages;