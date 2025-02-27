import React, { useState } from "react";
import Popup from "./Popup";
import leopardImage from '../assets/yala.jpg';

const PackageCard = ({ imageUrl, title, description, onExplore }) => {
    // State to control popup visibility
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    // Function to handle Explore Now button click
    const handleExploreClick = () => {
        setIsPopupVisible(true); // Show the popup
        onExplore(); // Call the onExplore prop (if needed)
    };

    // Function to close the popup
    const closePopup = () => {
        setIsPopupVisible(false); // Hide the popup
    };

    const data = {
        title: 'Yala Safari Expedition',
        description: [
            "Venture into the heart of the wild, where golden grasslands meet the call of the untamed. The Yala Safari Expedition is more than a journey—it’s a story whispered by the wind, written in the footprints of leopards, and sung by the rustling trees.",
            "Feel the thrill of the chase as you ride through Yala National Park, home to Sri Lanka’s elusive big cats and a dazzling array of wildlife. Find serenity in ancient temple visits, where time slows and the echoes of history embrace you. As night falls, retreat to an eco-lodge, where nature cradles your dreams beneath a sky filled with stars."
        ],
        imageUrl: leopardImage,
    };



    return (
        <div className="bg-white rounded-lg overflow-hidden">
            {/* Image with taller rectangular shape */}
            <img
                src={imageUrl}
                alt={title}
                className="w-full h-120 object-cover rounded-lg"
            />

            {/* Card Content */}
            <div className="p-6">
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-base text-gray-600">{description}</p>
                <button
                    onClick={handleExploreClick}
                    className="mt-4 px-5 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                >
                    Explore Now
                </button>
            </div>

            {/* Conditionally render the Popup */}
            {isPopupVisible && (
                <Popup onClose={closePopup} data={data}>
                    {/* Add content for the popup here */}
                    <h2 className="text-2xl font-bold mb-4">{title}</h2>
                    <p className="text-base text-gray-600">{description}</p>
                    {/* Add more content or custom components as needed */}
                </Popup>
            )}
        </div>
    );
};

export default PackageCard;