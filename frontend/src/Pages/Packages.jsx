import React, { useState, useRef } from 'react';
import PackageCard from '../components/PackageCard';
import Navbar from '../components/Navbar';
import backgroundImage from '../assets/lepord.jpg';
import leopardImage from '../assets/yala.jpg';
import elephantImage from '../assets/safari.jpg';
import mountainsImage from '../assets/hill.jpg';
import lakeImage from '../assets/wilpattu.jpg';
import safariImage from '../assets/adms.jpg';
import forestImage from '../assets/forest.jpg';
import beacjImage from '../assets/beach.jpg';
import templeImage from '../assets/temple.jpg';

const Packages = () => {
    const [selectedSection, setSelectedSection] = useState('ALL PACKAGES');
    const targetSectionRef = useRef(null); // Ref for the "Find Best Package" section

    const sections = [
        'ALL PACKAGES',
        'ADVENTURE PACKAGES',
        'EDUCATIONAL PACKAGES',
    ];

    const packages = {
        'ALL PACKAGES': [
            {
                title: 'Yala Safari Expedition',
                description: 'Yala Safari: A thrilling wildlife adventure in Sri Lanka.',
                imageUrl: leopardImage,
            },
            {
                title: 'Elephant Sanctuary & Safari',
                description: 'Experience Sri Lanka’s gentle giants up close.',
                imageUrl: elephantImage,
            },
            {
                title: 'Hill Country Exploration',
                description: 'Lush tea plantations, rolling hills, and breathtaking views.',
                imageUrl: mountainsImage,
            },
            {
                title: 'Wilpattu Wilderness Experience',
                description: 'Witness the serene lakes and diverse wildlife of Wilpattu.',
                imageUrl: lakeImage,
            },
            {
                title: 'Ancient & Wildlife Combo Tour',
                description: 'Explore ancient ruins alongside rich wildlife habitats.',
                imageUrl: safariImage,
            },
            {
                title: 'Educational Tour 1',
                description: 'Learn about Sri Lanka’s rich history and culture.',
                imageUrl: templeImage,
            },
            {
                title: 'Educational Tour 2',
                description: 'Explore ancient temples and historical sites.',
                imageUrl: beacjImage,
            },
            {
                title: 'Educational Tour 3',
                description: 'Discover the biodiversity of Sri Lanka’s forests.',
                imageUrl: forestImage,
            },
        ],
        'ADVENTURE PACKAGES': [
            {
                title: 'Yala Safari Expedition',
                description: 'Yala Safari: A thrilling wildlife adventure in Sri Lanka.',
                imageUrl: leopardImage,
            },
            {
                title: 'Elephant Sanctuary & Safari',
                description: 'Experience Sri Lanka’s gentle giants up close.',
                imageUrl: elephantImage,
            },
            {
                title: 'Hill Country Exploration',
                description: 'Lush tea plantations, rolling hills, and breathtaking views.',
                imageUrl: mountainsImage,
            },
            {
                title: 'Wilpattu Wilderness Experience',
                description: 'Witness the serene lakes and diverse wildlife of Wilpattu.',
                imageUrl: lakeImage,
            },
            {
                title: 'Ancient & Wildlife Combo Tour',
                description: 'Explore ancient ruins alongside rich wildlife habitats.',
                imageUrl: safariImage,
            },
        ],
        'EDUCATIONAL PACKAGES': [
            {
                title: 'Educational Tour 1',
                description: 'Learn about Sri Lanka’s rich history and culture.',
                imageUrl: templeImage,
            },
            {
                title: 'Educational Tour 2',
                description: 'Explore ancient temples and historical sites.',
                imageUrl: beacjImage,
            },
            {
                title: 'Educational Tour 3',
                description: 'Discover the biodiversity of Sri Lanka’s forests.',
                imageUrl: forestImage,
            },
        ],
    };

    const handleSectionClick = (section) => {
        setSelectedSection(section);
    };

    const handleExplore = (title) => {
        console.log(`Explore clicked for ${title}`);
        // Add your logic here if needed
    };

    // Scroll to the "Find Best Package" section
    const handleFindBestPackage = () => {
        if (targetSectionRef.current) {
            targetSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <Navbar />
            <div
                className="bg-white mx-auto max-w-7xl px-3 py-8"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
                <div className="min-h-screen text-black">
                    {/* Header Section */}
                    <div className="flex justify-between items-start">
                        <div className="text-left px-10 pt-20 pb-14">
                            <h1 className="text-7xl font-base">TRAVEL</h1>
                            <h1 className="text-7xl font-base">PACKAGES</h1>
                        </div>
                        <div className="text-right max-w-md px-10 pt-36">
                            <p className="text-sm font-base">
                                EMBARK ON AN UNFORGETTABLE JOURNEY THROUGH SRI LANKA, WHERE <br />
                                EVERY EXPERIENCE IS CRAFTED TO INSPIRE, RELAX, AND AWAKEN <br />
                                YOUR SENSE OF ADVENTURE.
                            </p>
                        </div>
                    </div>

                    {/* Packages Section Bar */}
                    <div className="flex flex-col items-center mt-10 font-base">
                        <div className="bg-black text-white flex w-full max-w-7xl">
                            {sections.map((section, index) => (
                                <div
                                    key={index}
                                    className={`flex-1 text-center py-4 text-sm cursor-pointer ${selectedSection === section ? 'bg-white text-black' : ''
                                        }`}
                                    onClick={() => handleSectionClick(section)}
                                >
                                    {section}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Packages Grid */}
                    <div className="mt-30 mb-28 px-10">
                        <h2 className="text-4xl font-base">EXPERIENCE THE THRILL OF</h2>
                        <h2 className="text-4xl font-base">SRI LANKA'S WILDERNESS</h2>

                        <div className="flex justify-end">
                            <button
                                onClick={handleFindBestPackage}
                                className="text-xl font-base text-teal-600 hover:underline"
                            >
                                FIND THE BEST PACKAGE
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-20">
                            {packages[selectedSection].map((pkg, index) => (
                                <PackageCard
                                    key={index}
                                    title={pkg.title}
                                    description={pkg.description}
                                    imageUrl={pkg.imageUrl}
                                    onExplore={() => handleExplore(pkg.title)}
                                />
                            ))}
                        </div>

                        {/* Find Best Package Section */}
                        <div
                            ref={targetSectionRef}
                            className="relative w-full h-[700px] bg-cover bg-center mt-30 mb-30"
                            style={{ backgroundImage: `url(${backgroundImage})` }}
                        >
                            <div className="absolute -bottom-40 left-1/2 transform -translate-x-1/2 w-3/4 bg-white p-8 rounded-lg shadow-lg">
                                <h2 className="text-xl font-bold mb-4">FIND THE BEST PACKAGE</h2>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        // Access the form data here (e.g., from state or via FormData)
                                        // For demo purposes, let's log the values
                                        console.log("Form submitted");
                                        console.log("Destination:", e.target.destination.value);
                                        console.log("Travel Dates:", e.target.travelDate.value);
                                        console.log("Trip Duration:", e.target.tripDuration.value);
                                        console.log("Number of Travelers:", e.target.travelers.value);
                                        // Place your search logic here, e.g., filtering packages or calling an API
                                    }}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-semibold" htmlFor="destination">
                                                DESTINATION
                                            </label>
                                            <input
                                                type="text"
                                                id="destination"
                                                name="destination"
                                                placeholder="SIGIRIYA, ELLA, ETC"
                                                className="w-full p-2 mt-1 border rounded-lg bg-gray-100"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-semibold" htmlFor="travelDate">
                                                TRAVEL DATES
                                            </label>
                                            <input
                                                type="date"
                                                id="travelDate"
                                                name="travelDate"
                                                className="w-full p-2 mt-1 border rounded-lg bg-gray-100"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-semibold" htmlFor="tripDuration">
                                                TRIP DURATION
                                            </label>
                                            <input
                                                type="text"
                                                id="tripDuration"
                                                name="tripDuration"
                                                placeholder="10 DAYS"
                                                className="w-full p-2 mt-1 border rounded-lg bg-gray-100"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-semibold" htmlFor="travelers">
                                                NUMBER OF TRAVELERS
                                            </label>
                                            <select
                                                id="travelers"
                                                name="travelers"
                                                className="w-full p-2 mt-1 border rounded-lg bg-gray-100"
                                            >
                                                <option value="2 ADULTS">2 ADULTS</option>
                                                <option value="1 ADULT">1 ADULT</option>
                                                <option value="3 ADULTS">3 ADULTS</option>
                                                <option value="FAMILY PACKAGE">FAMILY PACKAGE</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-teal-600 text-white py-2 mt-6 rounded-lg hover:bg-teal-700"
                                    >
                                        FIND
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Packages;
