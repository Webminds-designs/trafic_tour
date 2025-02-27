import React from "react";
import { X, Heart, Utensils, Bed, Car, Bike, User } from "lucide-react";

const Popup = ({ data, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl relative">
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
                    <X size={24} />
                </button>

                {/* Title */}
                <h2 className="text-3xl font-bold text-center">{data.title}</h2>
                <p className="text-center text-gray-600 my-1">03 Nights | 04 Days Tour</p>

                {/* Image Section */}
                <div className="relative">
                    <img src={data.imageUrl} alt={data.title} className="w-full h-64 object-cover rounded-lg my-4" />
                    <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md">
                        <Heart size={20} className="text-gray-700" />
                    </button>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-sm leading-relaxed">
                    Venture into the heart of the wild, where golden grasslands meet the call of the untamed.
                    The Yala Safari Expedition is more than a journey—it's a story whispered by the wind, written in the footprints of leopards,
                    and sung by the rustling trees.
                </p>

                <p className="text-gray-700 text-sm leading-relaxed mt-2">
                    Feel the thrill of the chase as you ride through Yala National Park, home to Sri Lanka’s elusive big cats and a dazzling
                    array of wildlife. As night falls, retreat to an eco-lodge, where nature cradles your dreams beneath a sky filled with stars.
                </p>

                {/* Icons Section */}
                <div className="flex justify-center gap-6 my-4">
                    <div className="flex flex-col items-center">
                        <Utensils size={32} className="text-gray-600" />
                    </div>
                    <div className="flex flex-col items-center">
                        <Bed size={32} className="text-gray-600" />
                    </div>
                    <div className="flex flex-col items-center">
                        <Car size={32} className="text-gray-600" />
                    </div>
                    <div className="flex flex-col items-center">
                        <Bike size={32} className="text-gray-600" />
                    </div>
                    <div className="flex flex-col items-center">
                        <User size={32} className="text-gray-600" />
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex border-b mt-4">
                    <button className="flex-1 py-2 text-center text-white bg-green-600">INCLUDES</button>
                    <button className="flex-1 py-2 text-center text-gray-600 bg-gray-200">CUSTOMISE</button>
                    <button className="flex-1 py-2 text-center text-gray-600 bg-gray-200">PRICES</button>
                </div>

                {/* List Details */}
                <ul className="list-disc pl-5 mt-4 text-gray-700 text-sm">
                    <li>04 Nights’ accommodation – Eco-Lodges & Boutique Safari Resorts</li>
                    <li>Daily breakfast & dinner with Sri Lankan & international cuisine</li>
                    <li>Half-day safari in Yala National Park – Witness leopards, elephants, and diverse wildlife</li>
                    <li>Full-day safari experience with a private guide, including birdwatching & photography stops</li>
                    <li>Guided temple visits – Kataragama Temple & Sithulpawwa Rock Temple</li>
                    <li>Sunset jeep safari with a stop at a scenic viewpoint for refreshments</li>
                    <li>Nature walk & birdwatching tour in a nearby forest reserve</li>
                    <li>All transfers & tours on a private or sharing basis</li>
                </ul>

                {/* Book Now Button */}
                <div className="text-center mt-6">
                    <button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                        BOOK NOW
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Popup;
