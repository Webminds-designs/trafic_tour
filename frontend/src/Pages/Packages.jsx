import React, { useState, useRef } from "react";
import PackageCard from "../components/PackageCard";
import packages from "../data/packageData";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/lepord.png";
import Footer from "../components/Footer";

const Packages = () => {
  const [selectedSection, setSelectedSection] = useState("All Packages");
  const targetSectionRef = useRef(null);

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

  return (
    <>
      <Navbar />
      <div
        className=" w-full mt-30"
      >
        <div className="text-black">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row justify-between items-center px-4 sm:px-6 lg:px-20">
            <div className="text-left pt-10 lg:pt-20 pb-6 lg:pb-14 ">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-base m-1">
                <span className="border-b-2">Travel</span>
              </h1>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-base">
                Packages
              </h1>
            </div>
            <div className="text-right  px-4 lg:px-7 pt-6">
              <p className="text-xs sm:text-sm font-base">
              Embark on an unforgettable journey through Sri Lanka. {" "}
                <br />
                Where every experience is designed to inspire, relax, and <br /> awaken your sense of adventure.
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
                        ${
                          selectedSection === section
                            ? "bg-white text-black border-b-4 border-black"
                            : ""
                        }`}
                  onClick={() => handleSectionClick(section)}
                >
                  {section}
                </div>
              ))}
            </div>
          </div>

          {/* Packages Grid */}
          <div className="mt-10 lg:mt-30 mb-14 lg:mb-28 px-4 sm:px-6 lg:px-20">
            <div className="flex justify-between">
           <div className="font-xl md:text-2xl text-xl">
           Experience the thrill of  Sri Lanka's
           <br></br>
           wilderness.
           </div>
            <div className="flex justify-end ">
              <button
                onClick={handleFindBestPackage}
                className="text-base sm:text-lg lg:text-xl font-base text-teal-600 hover:underline"
              >
              Find the best package
              </button>
            </div>
            </div>
            <div className=" bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-10 lg:mt-20">
              {packages["ALL PACKAGES"].map((packageItem) => (
                <PackageCard
                  key={packageItem.title}
                  packageItem={packageItem} // Pass the entire package object
                  onExplore={() =>
                    console.log(`Exploring ${packageItem.title}`)
                  }
                />
              ))}
            </div>
          </div>

          {/* Find Best Package Section */}
          <div
            ref={targetSectionRef}
            className="relative w-full h-[400px] lg:h-screen bg-cover bg-center mt-10 lg:mt-30 mb-20 lg:mb-50"
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
                            <label className="text-sm font-medium" htmlFor="destination">
                                Destination
                            </label>
                            <input
                                type="text"
                                id="destination"
                                name="destination"
                                placeholder="SIGIRIYA, ELLA, ETC"
                                className="w-full p-2 mt-1  rounded-3xl bg-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>

                        {/* Travel Activities*/}
                        <div>
                            <label className="text-sm font-medium" htmlFor="travelDate">
                                Activities & Interests
                            </label>
                            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                <div className="px-4 py-2 bg-gray-200 rounded-full text-gray-700">Wildlife</div>
                                <div className="px-4 py-2 bg-teal-200 rounded-full text-gray-900">Snorkeling</div>
                                <div className="px-4 py-2 bg-gray-200 rounded-full text-gray-700">Historical Sites</div>
                                <div className="px-4 py-2 bg-gray-200 rounded-full text-gray-700">Hiking</div>
                            </div>

                        </div>

                        {/* Trip Duration Field */}
                        <div>
                            <label className="text-sm font-medium" htmlFor="tripDuration">
                                Trip Duration
                            </label>
                            <input
                                type="text"
                                id="tripDuration"
                                name="tripDuration"
                                placeholder="10 DAYS"
                                className="w-full p-2 mt-1 rounded-3xl bg-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>

                        {/* trip Activities */}
                        <div>
                            <label className="text-sm font-medium" htmlFor="travelers">
                                Number of traveles
                            </label>
                            <select
                                id="travelers"
                                name="travelers"
                                className="w-full p-2 mt-1 rounded-3xl text-gray-500 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                <option value="2 Adult">2 Adult</option>
                                <option value="1 Adult">1 Adult</option>
                                <option value="3 Adult">3 Adult</option>
                                <option value="FAMILY PACKAGE">Family Package</option>
                            </select>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-1/2 flex text-center bg-teal-600 text-white py-2 mt-6 justify-center rounded-3xl hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
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
