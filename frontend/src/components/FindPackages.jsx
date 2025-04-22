import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/Road.jpg";
import { toast } from "react-toastify";
import api from "../services/api"; // Adjust the import path as necessary

const FindPackages = () => {
  const navigate = useNavigate();

  const allActivities = [
    "Wildlife",
    "Snorkeling",
    "Historical Sites",
    "Hiking",
    "Surfing",
    "Camping",
    "Scuba Diving",
    "Cycling",
    "Kayaking",
    "Rock Climbing",
    "Paragliding",
    "Jet Skiing",
    "Fishing",
    "Caving",
    "Stargazing",
    "Eco Tours",
    "Museums",
    "Cultural Festivals",
    "Hot Springs",
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [destination, setDestination] = useState("");
  const [tripDuration, setTripDuration] = useState("");
  const [packages, setPackages] = useState([]);

  // Filter activities based on search term
  const filteredActivities = allActivities.filter((activity) =>
    activity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle activity selection
  const toggleActivity = (activity) => {
    setSelectedActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((item) => item !== activity)
        : [...prev, activity]
    );
  };

  // Handle form submission
  const handleSearch = async (e) => {
    e.preventDefault();

    // Construct query parameters
    const params = {
      place: destination.trim(),
      days: tripDuration ? parseInt(tripDuration) : "", // Convert trip duration to number
      activity: selectedActivities.join(","),
    };

    console.log("Search Params:", params); // Debugging log

    try {
      // const response = await axios.get(
      //   "http://localhost:3000/api/packages/find/search",
      //   { params }
      // );

      const response = await api.get("/packages/find/search", { params }); // Use the api instance

      console.log("API Response:", response.data); // Debugging log

      if (response.data.packages && response.data.packages.length > 0) {
        navigate("/searchresult", {
          state: { packages: response.data.packages },
        });
      } else {
        toast.error("No packages found.");
      }
    } catch (error) {
      console.error("Error fetching packages:", error);
      toast.error("Error fetching packages. Please try again.");
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center px-4">
      {/* Background Section */}
      <div
        className="w-full h-full bg-cover bg-center absolute inset-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>

      {/* Centered Form Section */}
      <div className="relative w-full max-w-4xl bg-white p-4 sm:p-6 lg:p-12 rounded-3xl shadow-lg">
        <h2 className="text-lg sm:text-xl lg:text-3xl font-medium mb-4 text-start">
          Find The Best Packages
        </h2>
        <form onSubmit={handleSearch}>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Left Section - Destination & Trip Duration */}
            <div className="grid grid-cols-1 gap-4 w-full md:w-1/2">
              {/* Destination Field */}
              <div>
                <label className="text-sm font-medium" htmlFor="destination">
                  Destination
                </label>
                <input
                  type="text"
                  id="destination"
                  placeholder="SIGIRIYA, ELLA, ETC"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full p-2 mt-1 rounded-3xl bg-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Trip Duration Field */}
              <div>
                <label className="text-sm font-medium" htmlFor="tripDuration">
                  Trip Duration (Days)
                </label>
                <input
                  type="number"
                  id="tripDuration"
                  placeholder="Enter number of days"
                  value={tripDuration}
                  onChange={(e) => setTripDuration(e.target.value)}
                  className="w-full p-2 mt-1 rounded-3xl bg-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            {/* Right Section - Activities */}
            <div className="grid grid-cols-1 gap-4 w-full md:w-1/2">
              <div>
                <label className="text-sm font-medium">
                  Activities & Interests
                </label>
                <div className="w-full space-y-3">
                  {/* Search Input */}
                  <input
                    type="text"
                    placeholder="Search activities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 mt-1 rounded-3xl bg-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />

                  {/* Activity List */}
                  <div className="flex flex-wrap gap-2">
                    {(searchTerm
                      ? filteredActivities
                      : allActivities.slice(0, 8)
                    ).map((activity) => (
                      <div
                        key={activity}
                        onClick={() => toggleActivity(activity)}
                        className={`px-4 py-2 rounded-full cursor-pointer transition ${
                          selectedActivities.includes(activity)
                            ? "bg-teal-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {activity}
                      </div>
                    ))}
                  </div>

                  {/* Selected Activities */}
                  {selectedActivities.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {selectedActivities.map((activity) => (
                        <div
                          key={activity}
                          className="px-3 py-1 bg-teal-500 text-white rounded-full flex items-center"
                        >
                          {activity}
                          <button
                            onClick={() => toggleActivity(activity)}
                            className="ml-2 text-white font-bold"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full sm:w-3/4 md:w-1/2 flex text-center bg-teal-600 text-white py-2 mt-6 justify-center rounded-3xl hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              FIND
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FindPackages;
