import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PackageCard from "../components/PackageCard";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/lepord.png";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const Packages = () => {
  const [selectedSection, setSelectedSection] = useState("All Packages");
  const targetSectionRef = useRef(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //get packages details
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/packages");
        setPackages(response.data.packages);
        // Assuming the response contains an array of packages
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const sections = [
    "All Packages",
    "Romantic and Relaxation",
    "Advanture and Wildlife",
    "Educational and Cultural",
  ];

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  const handleExplore = (title) => {
    console.log(`Explore clicked for ${title}`);
  };

  const handleFindBestPackage = () => {
    if (targetSectionRef.current) {
      targetSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
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
      const response = await axios.get(
        "http://localhost:3000/api/packages/find/search",
        { params }
      );

      console.log("API Response:", response.data); // Debugging log

      if (response.data.packages && response.data.packages.length > 0) {
        navigate("/searchresult", {
          state: { packages: response.data.packages },
        });
      } else {
        alert("No packages found.");
      }
    } catch (error) {
      console.error("Error fetching packages:", error);
      alert("Error fetching packages. Please try again.");
    }
  };

 // Animation variants for text
 const textVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

// Hover animation for images
const hoverVariants = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};
  return (
    <>
      <Navbar />
      <div className=" w-full pt-30 bg-gray-100">
        <div className="text-black">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row justify-between items-center px-4 sm:px-6 lg:px-20">
            <motion.div className="text-left pt-10 lg:pt-20 pb-6 lg:pb-14 "
             initial="hidden"
             whileInView="visible"
             variants={textVariants}
             transition={{ duration: 0.8 }}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-base m-1">
                <span className="border-b-2">Travel</span>
              </h1>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-base">
                Packages
              </h1>
            </motion.div>
            <div className="text-right  px-4 lg:px-7 pt-6">
              <motion.p className="text-xs sm:text-sm font-base" 
               initial="hidden"
               whileInView="visible"
               variants={textVariants}
               transition={{ duration: 0.8 }}>
                Embark on an unforgettable journey through Sri Lanka. <br />
                Where every experience is designed to inspire, relax, and <br />{" "}
                awaken your sense of adventure.
              </motion.p>
            </div>
          </div>

          {/* Packages Section Bar */}
          <div className="flex flex-col items-center mt-6 lg:mt-10 font-base w-full">
            {/* Dropdown for Mobile View */}
            <div className="w-full md:hidden px-3">
              <div className="relative">
                <select
                  className="w-full p-3 rounded-3xl bg-black text-white appearance-none
             border  outline-none cursor-pointer hover:bg-gray-100 focus:ring-2 "
                  onChange={(e) => handleSectionClick(e.target.value)}
                  value={selectedSection}
                >
                  {sections.map((section, index) => (
                    <option
                      key={index}
                      value={section}
                      className={
                        selectedSection === section
                          ? "bg-teal-600 text-black"
                          : "bg-black text-white"
                      }
                    >
                      {section}
                    </option>
                  ))}
                </select>

                {/* Custom dropdown arrow */}
                <div className="absolute text-white inset-y-0 right-4 flex items-center pointer-events-none">
                  ⌄
                </div>
              </div>
            </div>
            {/* Horizontal Bar for Larger Screens */}
            <motion.div className="hidden md:flex bg-black text-white w-full max-w-7xl rounded-3xl overflow-x-auto"
            initial="hidden"
            whileInView="visible"
            variants={textVariants}
            transition={{ duration: 0.8 }}>
              {sections.map((section, index) => (
                <div
                  key={index}
                  className={`flex-1 text-center py-3 lg:py-4 text-xs sm:text-sm cursor-pointer transition-all duration-300 
          ${selectedSection === section ? "bg-teal-600 text-black" : ""}`}
                  onClick={() => handleSectionClick(section)}
                >
                  {section}
                </div>
              ))}
            </motion.div>
          </div>
          {/* Packages Grid */}
          <div className="mt-10 lg:mt-30 mb-14 lg:mb-28 px-4 sm:px-6 lg:px-20">
            <div className="flex justify-between">
              <motion.div className="font-xl md:text-2xl text-xl"
               initial="hidden"
               whileInView="visible"
               variants={textVariants}
               transition={{ duration: 0.8, delay:  0.3 }}>
                Experience the thrill of Sri Lanka's
                <br></br>
                wilderness.
              </motion.div>
              <div className="flex justify-end ">
                <motion.button
                  onClick={handleFindBestPackage}
                  className="text-base sm:text-lg lg:text-xl font-base text-teal-600 hover:underline"
                  initial="hidden"
                  whileInView="visible"
                  variants={textVariants}
                  transition={{ duration: 0.8, delay:  0.3 }}
                >
                  Find the best package
                </motion.button>
              </div>
            </div>
            <div className="  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-10 lg:mt-20">
              {/* All Packages */}
              {selectedSection === "All Packages" ? (
                <>
                  {packages.map((packageItem) => (
                     <motion.div
                     key={packageItem.name}
                     initial="hidden"
                     whileInView="visible"
                     variants={textVariants}
                     transition={{ duration: 0.8, delay:  0.3 }}>
                    <PackageCard
                      key={packageItem.name}
                      packageItem={packageItem} // Pass the entire package object
                      onExplore={() =>
                        console.log(`Exploring ${packageItem.name}`)
                      }
                    />
                    </motion.div>
                  ))}
                </>
              ) : null}

              {/*Romantic and Relaxation */}
              {selectedSection === "Romantic and Relaxation" ? (
                <>
                  {packages
                    .filter(
                      (packageItem) =>
                        packageItem.type === "Romantic and Relaxation"
                    )
                    .map((packageItem) => (
                      <PackageCard
                        key={packageItem.name}
                        packageItem={packageItem} // Pass the entire package object
                        onExplore={() =>
                          console.log(`Exploring ${packageItem.name}`)
                        }
                      />
                    ))}
                </>
              ) : null}

              {/*Advanture and Wildlife */}
              {selectedSection === "Advanture and Wildlife" ? (
                <>
                  {packages
                    .filter(
                      (packageItem) =>
                        packageItem.type === "Adventure and Wildlife"
                    )
                    .map((packageItem) => (
                      <PackageCard
                        key={packageItem.name}
                        packageItem={packageItem} // Pass the entire package object
                        onExplore={() =>
                          console.log(`Exploring ${packageItem.name}`)
                        }
                      />
                    ))}
                </>
              ) : null}

              {/*Educational and Cultural */}
              {selectedSection === "Educational and Cultural" ? (
                <>
                  {packages
                    .filter(
                      (packageItem) =>
                        packageItem.type === "Educational and Cultural"
                    )
                    .map((packageItem) => (
                      <PackageCard
                        key={packageItem.name}
                        packageItem={packageItem} // Pass the entire package object
                        onExplore={() =>
                          console.log(`Exploring ${packageItem.name}`)
                        }
                      />
                    ))}
                </>
              ) : null}
            </div>
          </div>

          {/* Find Best Package Section */}
          <div
            ref={targetSectionRef}
            className="relative w-full h-screen md:h-[400px] lg:h-screen bg-cover bg-center mt-10 lg:mt-30 mb-20 lg:mb-50"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="absolute -bottom-20 lg:-bottom-40 left-1/2 transform -translate-x-1/2 w-11/12 lg:w-3/4 bg-white p-6 lg:p-12 rounded-3xl">
              <h2 className="text-lg lg:text-xl font-bold mb-4">
                FIND THE BEST PACKAGE
              </h2>
              <form onSubmit={handleSearch}>
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Left Section - Destination & Trip Duration */}
                  <div className="grid grid-cols-1 gap-4 w-full md:w-1/2">
                    {/* Destination Field */}
                    <div>
                      <label
                        className="text-sm font-medium"
                        htmlFor="destination"
                      >
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
                      <label
                        className="text-sm font-medium"
                        htmlFor="tripDuration"
                      >
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
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Packages;
