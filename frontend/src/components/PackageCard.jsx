import React, { useState } from "react";
import Popup from "./Popup"; // Import your Popup component

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
                <Popup onClose={closePopup}>
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