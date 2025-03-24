import React,{ useState } from "react";
import backgroundImage from "../assets/Road.jpg";

const FindPackages = () => {
  const allActivities = ["Wildlife", "Snorkeling", "Historical Sites", "Hiking", "Surfing", "Camping", "Scuba Diving", "Cycling"];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedActivities, setSelectedActivities] = useState([]);

  // Filter activities based on search term
  const filteredActivities = allActivities.filter((activity) =>
    activity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle activity selection
  const toggleActivity = (activity) => {
    setSelectedActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((item) => item !== activity) // Remove if selected
        : [...prev, activity] // Add if not selected
    );
  };
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
          
          
            <div className="flex justify-start">
  <div className="grid grid-cols-1 md:grid-cols-1 gap-4 w-full md:w-1/2">
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
        className="w-full p-2 mt-1 rounded-3xl bg-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
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

    {/* Number of Travelers */}
    <div>
      <label className="text-sm font-medium" htmlFor="travelers">
        Number of Travelers
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
  <div className="grid grid-cols-1 mx-2 md:grid-cols-1 gap-4 w-full md:w-1/2">
    {/* Travel Activities*/}
    <div>
              <label className="text-sm font-medium" htmlFor="travelDate">
                Activities & Interests
              </label>
              <div className="w-full max-w-md space-y-3">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search activities..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
      />

      {/* Activity List */}
      <div className="flex flex-wrap gap-2">
        {filteredActivities.map((activity) => (
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
        <div className="flex flex-wrap gap-2 mt-8">
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
