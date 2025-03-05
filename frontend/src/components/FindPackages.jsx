import React from "react";
import backgroundImage from "../assets/Road.jpg";

const FindPackages = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center ">
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
      <div className="relative w-11/12 lg:w-3/4 bg-white p-6 lg:p-12 rounded-3xl shadow-lg">
        <h2 className="text-lg lg:text-3xl font-medium mb-4 text-start">
          Find The Best Packages
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
  );
};

export default FindPackages;
