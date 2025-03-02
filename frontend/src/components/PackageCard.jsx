import React, { useState } from "react";
import Popup from "./Popup";

const PackageCard = ({ packageItem, onExplore }) => {
    // Destructure package details from props
    const { imageUrl, title, description } = packageItem;

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

    // Data for the popup (dynamic based on the package)
    const popupData = {
        title: title, // Use the title from props
        description: [
            description, // Use the description from props
            "Additional details about the package can go here.", // Add more details if needed
        ],
        imageUrl: imageUrl, // Use the imageUrl from props
    };

    return (
        <div className="bg-white rounded-lg overflow-hidden transition-shadow duration-300">
            {/* Image with taller rectangular shape */}
            <img
                src={imageUrl}
                alt={title}
                className="w-full h-120 object-cover rounded-lg"
            />

            {/* Card Content */}
            <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-base text-gray-600">{description}</p>
                <button
                    onClick={handleExploreClick}
                    className="mt-4 px-5 py-3 bg-black text-white rounded-lg transition cursor-pointer"
                >
                    Explore Now
                </button>

            </div>

            {/* Conditionally render the Popup */}
            {isPopupVisible && (
                <Popup onClose={closePopup} data={popupData}>
                    {/* Popup content */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">{popupData.title}</h2>
                        {popupData.description.map((paragraph, index) => (
                            <p key={index} className="text-base text-gray-600">
                                {paragraph}
                            </p>
                        ))}
                        <img
                            src={popupData.imageUrl}
                            alt={popupData.title}
                            className="w-full h-48 object-cover rounded-lg"
                        />
                    </div>
                </Popup>
            )}
        </div>
    );
};

export default PackageCard;