import React from "react";

const PackageCard = ({ imageUrl, title, description, onExplore }) => {
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
                    onClick={onExplore}
                    className="mt-4 px-5 py-3 bg-black text-white rounded-lg"
                >
                    Explore Now
                </button>
            </div>
        </div>
    );
};

export default PackageCard;
