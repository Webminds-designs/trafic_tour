import { FaBed, FaUtensils, FaCamera, FaHeart, FaTimes } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import React, { useEffect, useState } from "react";
import foodIcon from "../assets/dish.png";
import bedIcon from "../assets/bed.png";
import carIcon from "../assets/car.png";
import copeIcon from "../assets/cope.png";
import userIcon from "../assets/people.png";
import { useContext } from "react";

export default function Popup({ onClose, data }) {
  const [activeTab, setActiveTab] = useState("INCLUDES");
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  if(!user){
    navigate('./signin')
  }
  const userId= user?.id
  const packageId = data?._id
  console.log(data._id)
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:6400/api/favorites/${user?.id}`);
        const favorite = response.data.find(fav => fav.packageId._id === packageId);
        setIsFavorite(!!favorite);
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };
    checkFavoriteStatus();
  }, [user?.id, packageId]);

  const addFavorite = async () => {
    try {
      await axios.post('http://localhost:6400/api/favorites/add', { userId, packageId });
      setIsFavorite(true);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const removeFavorite = async () => {
    try {
      await axios.delete('http://localhost:6400/api/favorites/remove', { data: { userId, packageId } });
      setIsFavorite(false);
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  const icons = [
    { src: foodIcon, alt: "Food" },
    { src: bedIcon, alt: "Bed" },
    { src: carIcon, alt: "Car" },
    { src: copeIcon, alt: "Activities" },
    { src: userIcon, alt: "User" },
  ];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);


  const handleBooking = () => {
    navigate("/payment", { state: { data } });
  };


  return (
    <div className="fixed inset-0 bg-opacity-90 backdrop-blur-lg z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Popup Container - Scrollable */}
      <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 lg:p-10 relative max-w-6xl w-full max-h-[95vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1 text-black bg-[#009990] rounded-full transition cursor-pointer"
        >
          <FaTimes className="text-xl" />
        </button>

        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-base">
            {data.name}
          </h1>
          <p className="text-black mt-2 text-sm sm:text-base md:text-lg font-base">
            {data.duration.nights}  NIGHTS |  {data.duration.days} DAYS TOUR
          </p>
        </div>

        {/* Hero Image with Favorite Icon */}
        <div className="relative mt-4 sm:mt-5 rounded-lg overflow-hidden">
          <img
            src={data.imageUrl}
            alt={data.name}
            className="w-full h-48 sm:h-64 object-cover"
          />
          <div className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md cursor-pointer" onClick={isFavorite ? removeFavorite : addFavorite}>
        <FaHeart className={`text-xs ${isFavorite ? 'text-red-500' : 'text-black'}`} />
      </div>
        </div>

        {/* Description */}
        <div className="mt-4 text-black text-sm sm:text-base text-left">
          <p>{data.description}</p>
          <br />
        </div>

        {/* Icons Section */}
        <div className="flex justify-center mt-6 sm:mt-8 mb-4 space-x-2 sm:space-x-4">
          {icons.map((icon, index) => (
            <div
              key={index}
              className="bg-gray-300 rounded-full p-2 sm:p-3 md:p-4 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16"
            >
              <img
                src={icon.src}
                alt={icon.alt}
                className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8"
              />
            </div>
          ))}
        </div>

        {/* Tabs Section */}
        <div className="mt-8 sm:mt-10 p-2 rounded-lg">
          <div className="bg-[#009990] text-white flex w-full max-w-2xl overflow-x-auto rounded-2xl">
            {["INCLUDES"].map((tab) => (
              <div
                key={tab}
                className={`flex-1  py-2 text-sm sm:text-base cursor-pointer transition-all duration-300 
                                    ${activeTab === tab
                    ? "bg-white text-[#009990]"
                    : ""
                  }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </div>
            ))}
          </div>

          {/* Dynamic Content */}
          <div className="mt-8 sm:mt-10 text-black text-sm sm:text-base">
            {activeTab === "INCLUDES" && (
              <>
                <div className="flex">
                  {/* Left Side */}
                  <div className="w-2/3 h-96 p-4 m-4 border-1 border-[#009990] rounded-2xl overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-[#009990] scrollbar-track-transparent">
                    {data.itinerary.map((dayItem) => (
                      <div key={dayItem._id} className="mb-8">
                        <h2 className="text-xl font-medium">{`Day ${dayItem.day}: ${dayItem.title}`}</h2>

                        <div className="mt-4">
                          <ul className="list-disc pl-6">
                            {(dayItem.activities && Array.isArray(dayItem.activities)) ? (
                              dayItem.activities.map((activity, index) => (
                                <li key={index}>{activity}</li>
                              ))
                            ) : (
                              <li>No activities available</li> 
                            )}
                          </ul>
                        </div>
                      </div>
                    ))}

                  </div>
                  {/* Right Side */}
                  <div className="w-1/3 p-4  ">
                    <div className="bg-emerald-50 rounded-2xl m-4 p-3">
                      <h2 className="text-xl font-medium">Booking Details</h2>
                      <div className="flex justify-between">
                        <div className="py-10">Standed Package</div>
                        <div className="py-10">LKR :{data.price}</div>
                      </div>
                      <div class="border-t border-gray-300 my-4 mt-14"></div>
                      <div className="flex justify-between">
                        <div>Standed Package</div>
                        <div>LKR :{data.price}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div>Sites</div>
                  <div>
                    {data.places_to_visit && data.places_to_visit.length > 0
                      ? data.places_to_visit.join(', ')
                      : 'No places to visit available'}
                  </div>
                </div>
                <div className="text-center mt-8 sm:mt-10">
                  <button onClick={handleBooking} className="bg-[#009990] text-white px-4 sm:px-6 md:px-8 lg:px-56 py-1 rounded-lg text-sm sm:text-base">
                    BOOK NOW
                  </button>
                </div>
              </>
            )}
            {/*
            {activeTab === "CUSTOMISE" && (
              <div className="max-w-4xl mx-auto p-4 sm:p-6 rounded-lg flex flex-col lg:flex-row">
              
                <div className="flex-1 pr-0 lg:pr-6 mb-6 lg:mb-0">
                
                  <div className="mb-4">
                    <h2 className="text-black font-base">ACCOMMODATION TYPE</h2>
                    <select className="w-full bg-[#F4F5F5] p-2 rounded-md mt-2 text-[#7F7F7F]">
                      <option value=" ">SELECT</option>
                      <option value="Luxury Safari Tent">
                        Luxury Safari Tent
                      </option>
                      <option value="Standard Tent">Standard Tent</option>
                      <option value="Deluxe Room">Deluxe Room</option>
                    </select>
                  </div>

                
                  <div className="mb-4">
                    <h2 className="text-black">MEAL PREFERENCES</h2>
                    <select className="w-full bg-[#F4F5F5] font-base p-2 rounded-md mt-2 text-[#7F7F7F]">
                      <option value=" ">SELECT</option>
                      <option value="All Inclusive">All Inclusive</option>
                      <option value="Half Board">Half Board</option>
                      <option value="Bed & Breakfast">Bed & Breakfast</option>
                    </select>
                  </div>

                
                  <div className="mb-4">
                    <h2 className="text-black font-base">ACTIVITY ADD-ONS</h2>
                    <div className="space-y-2 mt-2">
                      {[
                        "Night Safari with Infrared Vision",
                        "Birdwatching & Photography Tour",
                        "Local Cooking Experience",
                      ].map((activity) => (
                        <label
                          key={activity}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="radio"
                            name="activity"
                            checked={selectedActivity === activity}
                            onChange={() => setSelectedActivity(activity)}
                            className="text-[#7F7F7F]"
                          />
                          <span className="text-[#7F7F7F]">
                            {activity} +12,000 LKR / +$40
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                
                  <div className="mb-4">
                    <h2 className="text-black font-base">SPECIAL REQUESTS</h2>
                    <textarea
                      className="w-full bg-[#F4F5F5] p-3 rounded-md mt-2"
                      placeholder="Enter your message here..."
                    ></textarea>
                  </div>
                </div>

              
                <div className="flex-1 pl-0 lg:pl-6">
              
                  <div className="mb-4">
                    <h2 className="text-black text-xl sm:text-2xl font-base mb-4 sm:mb-8">
                      BOOKING DETAILS
                    </h2>
                    <div className="flex justify-between">
                      <span className="text-black font-base">
                        STANDARD PACKAGE
                      </span>
                      <span className="text-black">50,000 LKR / $170</span>
                    </div>
                  </div>

            
                  <div className="mb-4">
                    <h2 className="text-black text-xl sm:text-2xl font-base mb-4 sm:mb-8">
                      ACCOMMODATION UPGRADES
                    </h2>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-black">LUXURY SAFARI TENT</span>
                        <span className="text-black">+15,000 LKR / +$50</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black">BREAKFAST ONLY</span>
                        <span className="text-black">+5,000 LKR / +$17</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black">NIGHT SAFARI</span>
                        <span className="text-black">+12,000 LKR / +$40</span>
                      </div>
                    </div>
                  </div>

                
                  <div className="mt-6 sm:mt-8">
                    <div className="flex justify-between">
                      <span className="text-black text-xl sm:text-2xl">
                        TOTAL
                      </span>
                      <span className="text-black text-xl sm:text-2xl">
                        82,000 LKR / $277
                      </span>
                    </div>

                    
                      <button onClick={handleBooking}  className="w-full bg-[#009990] text-white font-base px-2 py-2 rounded-md mt-4">
                        BOOK NOW
                      </button>
                  
                  </div>
                </div>
              </div>
            )}  

            {activeTab === "PRICES" && (
              <div className="text-center">
                <p className="text-black text-lg sm:text-xl font-base">
                  CONTACT OUR TEAM TO INQUIRE ABOUT THE PRICES
                </p>
                <div className="text-center mt-8 sm:mt-10">
                  <button className="bg-[#009990] text-white px-4 sm:px-6 md:px-8 lg:px-56 py-1 rounded-lg text-sm sm:text-base transition cursor-pointer">
                    CONTACT US
                  </button>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
