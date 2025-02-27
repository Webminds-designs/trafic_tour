import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../context/authContext.jsx";
import { useNavigate } from 'react-router-dom';

import Footer from '../components/Footer'
import image1 from "../assets/Packages/image.png";
import image2 from "../assets/Packages/image1.png";
import image3 from "../assets/Packages/image2.png";
import image4 from "../assets/Packages/image4.png";
import image5 from "../assets/Packages/image5.png";
import image6 from "../assets/Packages/image6.png";
import image7 from "../assets/Packages/image7.png";
import image8 from "../assets/Packages/image8.png";
import heart from "../assets/heart.png";
import hidden from "../assets/hidden.png";
import eye from "../assets/eye.png";


const Profile = () => {
  const { user } = useContext(AuthContext);
  
  const [selectedTab, setSelectedTab] = useState('ACCOUNT SETTINGS');
  const [menuOpen, setMenuOpen] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [conpasswordVisible, setConPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleConPasswordVisibility = () => {
    setConPasswordVisible(!conpasswordVisible);
  };
 
  if (!user) {
    console.log("User not found, navigating to sign-in");
    navigate('/signin');  // Navigate to sign-in page
  } else {
    console.log(user);  // Log the user details if authenticated
  }

  const tabs = [
    'ACCOUNT SETTINGS',
    'BOOKING HISTORY',
    'MY FAVOURITES',
    'BOOKINGS'
  ];
  const tourPackages = [
    {
      title: "BELIHUL OYA WILDERNESS ESCAPE",
      highlights:
        "SCENIC BELIHUL OYA, DIYALUMA FALLS, TREKKING TRAILS, ECO-LODGE STAY, BIRDWATCHING",
      image: image1
    },
    {
      title: "CULTURAL HERITAGE ADVENTURE",
      highlights: "SIGIRIYA ROCK FORTRESS, ANURADHAPURA RUINS, ANCIENT TEMPLES",
      image: image2,
    },
    {
      title: "SERENE BEACH ESCAPE",
      highlights: "BENTOTA BEACH, GALLE FORT, BOAT RIDES IN MADU RIVER",
      image: image3,
    },
    {
      title: "CULTURAL CAPITAL DISCOVERY",
      highlights: "KANDY, PINNAWALA ELEPHANT ORPHANAGE, LOCAL ARTS AND CRAFTS",
      image: image4,
    },
    {
      title: "Southern Paradise Discovery",
      highlights: "Mirissa beach, whale watching, Hiriketiya, and Tangalle",
      image: image5,
    },
    {
      title: "Temple Trails and Sacred Sites",
      highlights: "Kandy Temple of the Tooth, Dambulla Cave Temple, Polonnaruwa ruins",
      image: image6,
    },
    {
      title: "ANCIENT CITIES AND HERITAGE TOUR",
      highlights: "POLONNARUWA, ANURADHAPURA, RITIGALA ANCIENT SITE",
      image: image7,
    },
    {
      title: "NATURE & ADVENTURE EXPEDITION",
      highlights: "ADAM’S PEAK, KNUCKLES MOUNTAIN RANGE, KANDY LAKE",
      image: image8,
    }
  ];

  return (
    <div >
      <div className=' bg-gray-100 lg:px-10 min-h-screen'>
        <header >
          <div className="container  px-4 py-4 flex justify-between items-center">
            {/* Logo */}
            <div className="text-xl font-bold">
              TRAFFIC <br /> TOURS
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center font-semibold space-x-2">
              <a className="text-black hover:text-gray-600" href="#">HOME</a>
              <a className="text-black hover:text-gray-600" href="#">PACKAGES</a>
              <a className="text-black hover:text-gray-600" href="#">ABOUT US</a>
              <a className="text-black hover:text-gray-600" href="#">CONTACT US</a>
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <button className="bg-black text-white px-4 py-2 rounded-lg hidden md:block">BOOK NOW</button>
              <img
                src={user?.profileUrl}
                alt="Profile"
                className="rounded-full w-10 h-10 object-cover"
              />

              {/* Mobile Menu Button */}
              <button className="md:hidden text-black" onClick={() => setMenuOpen(!menuOpen)}>
                <motion.span
                  initial={{ rotate: 0, opacity: 1 }}
                  animate={{ rotate: menuOpen ? 180 : 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {menuOpen ? <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
                    <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                  </svg> : <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
                    <path d="M 3 9 A 1.0001 1.0001 0 1 0 3 11 L 47 11 A 1.0001 1.0001 0 1 0 47 9 L 3 9 z M 3 24 A 1.0001 1.0001 0 1 0 3 26 L 47 26 A 1.0001 1.0001 0 1 0 47 24 L 3 24 z M 3 39 A 1.0001 1.0001 0 1 0 3 41 L 47 41 A 1.0001 1.0001 0 1 0 47 39 L 3 39 z"></path>
                  </svg>}
                </motion.span>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {menuOpen && (
              <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden flex flex-col items-center   py-4 space-y-4"
              >
                <a className="text-black hover:text-gray-600" href="#">HOME</a>
                <a className="text-black hover:text-gray-600" href="#">PACKAGES</a>
                <a className="text-black hover:text-gray-600" href="#">ABOUT US</a>
                <a className="text-black hover:text-gray-600" href="#">CONTACT US</a>
                <button className="bg-black text-white px-4 py-2 rounded-lg">BOOK NOW</button>
              </motion.nav>
            )}
          </AnimatePresence>
        </header>

        <main className="container md:mx-auto md:px-4 py-8">
          <h1 className="lg:text-5xl md:text-4xl text-2xl font-bold lg:mx-0 md:mx-22 mx-10 ">YOUR ADVENTURE AWAITS</h1>
          <p className="mt-6  md:mx-0 mx-10  md:text-start text-center">TAILOR YOUR EXPERIENCE AND MAKE EVERY MOMENT UNFORGETTABLE.</p>

          <div className="flex flex-col md:flex-row items-center mx-4 md:mx-0 my-12">
          <img
  src={user?.profileUrl?.includes('=s96-c') ? user.profileUrl.replace(/=s96-c/, "=s400-c") : '/default-avatar.jpg'}
  alt="Profile"
  className="rounded-full w-32 h-32 md:w-48 md:h-48 object-cover"
  onError={() => console.log("Image failed to load")}
/>

            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
              <h2 className="text-lg md:text-xl uppercase font-bold">{user?.firstName}  {user?.lastName}</h2>
              <p className="text-sm md:text-md uppercase font-bold">{user?.email}</p>
              <div className="mt-4 flex justify-center md:justify-start">
                <button className="bg-white border-1 border-black px-4 py-2 rounded mr-2 text-sm md:text-md">CANCEL</button>
                <button className="bg-black text-white px-4 py-2 rounded text-sm md:text-md">CHANGE PROFILE</button>
              </div>
            </div>
          </div>
          <div className=" bg-black text-white">
            <nav className="flex justify-between  ">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`md:py-2 lg:px-27 md:px-10 lg:text-base text-xs ${selectedTab === tab
                    ? 'text-black bg-gray-100 font-bold text-sm border-b-5 border-black'
                    : ''
                    }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          {/* Account Settings */}
          {selectedTab === 'ACCOUNT SETTINGS' && (
            <div className="">
              <h2 className="text-3xl font-bold m-6 md:mx-0 uppercase">Personal Details</h2>
              <form className="mx-auto px-4 sm:px-6 md:px-0">
                {/* First Name */}
                <div className="mb-4 flex flex-col md:flex-row">
                  <label className="text-gray-700 text-lg font-bold mb-2 md:w-3/12 uppercase" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded py-2 px-3 w-full md:w-9/12 text-gray-400 focus:outline-none focus:ring-2"
                    id="firstName"
                    type="text"
                    placeholder="Enter your first name"
                  />
                </div>

                {/* Last Name */}
                <div className="mb-4 flex flex-col md:flex-row">
                  <label className="text-gray-700 text-lg font-bold mb-2 md:w-3/12 uppercase" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded py-2 px-3 w-full md:w-9/12 text-gray-400 focus:outline-none focus:ring-2"
                    id="lastName"
                    type="text"
                    placeholder="Enter your last name"
                  />
                </div>

                {/* Email Address */}
                <div className="mb-4 flex flex-col md:flex-row">
                  <label className="text-gray-700 text-lg font-bold mb-2 md:w-3/12 uppercase" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded py-2 px-3 w-full md:w-9/12 text-gray-400 focus:outline-none focus:ring-2"
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Passport ID */}
                <div className="mb-4 flex flex-col md:flex-row">
                  <label className="text-gray-700 text-lg font-bold mb-2 md:w-3/12 uppercase" htmlFor="passportId">
                    Passport ID
                  </label>
                  <input
                    className="shadow appearance-none border rounded py-2 px-3 w-full md:w-9/12 text-gray-400 focus:outline-none focus:ring-2"
                    id="passportId"
                    type="text"
                    placeholder="Enter your passport ID"
                  />
                </div>

                {/* Contact Number */}
                <div className="mb-8 flex flex-col md:flex-row">
                  <label className="text-gray-700 text-lg font-bold mb-2 md:w-3/12 uppercase" htmlFor="contactNumber">
                    Contact
                  </label>
                  <input
                    className="shadow appearance-none border rounded py-2 px-3 w-full md:w-9/12 text-gray-400 focus:outline-none focus:ring-2"
                    id="contactNumber"
                    type="text"
                    placeholder="Enter your contact number"
                  />
                </div>

                {/* Password Section */}
                <h2 className="text-2xl font-bold mb-6 uppercase">Password</h2>

                {/* Old Password */}
                <div className="mb-4 flex flex-col md:flex-row relative">
                  <label className="text-gray-700 text-lg font-bold mb-2 md:w-3/12 uppercase" htmlFor="oldPassword">
                    Old Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded py-2 px-3 w-full md:w-9/12 text-gray-400 focus:outline-none focus:ring-2"
                    id="oldPassword"
                    type={conpasswordVisible ? "text" : "password"}
                    placeholder="Enter old password"
                  />
                  <img
                    src={passwordVisible ? eye : hidden}
                    onClick={togglePasswordVisibility}
                    alt="hidden"
                    width={20}
                    className="absolute right-5 md:mt-3 mt-12 opacity-80"
                  />
                </div>

                {/* Confirm Password */}
                <div className="mb-8 flex flex-col md:flex-row relative">
                  <label className="text-gray-700 text-lg font-bold mb-2 md:w-3/12 uppercase" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded py-2 px-3 w-full md:w-9/12 text-gray-400 focus:outline-none focus:ring-2"
                    id="confirmPassword"
                    type={conpasswordVisible ? "text" : "password"}
                    placeholder="Confirm your password"
                  />
                  <img
                    src={conpasswordVisible ? eye : hidden}
                    onClick={toggleConPasswordVisibility}
                    alt="hidden"
                    width={20}
                    className="absolute right-5 md:mt-3 mt-12 opacity-80"
                  />
                </div>

                {/* Buttons */}
                <div className="flex items-center  justify-end">
                  <button className="bg-gray-200 text-gray-700 border-1 mr-5 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Cancel
                  </button>
                  <button className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Change Password
                  </button>
                </div>
              </form>

            </div>
          )}
          {/* BOOKING HISTORY */}
          {selectedTab === 'BOOKING HISTORY' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 m-6">
                {tourPackages.slice(0, 4).map((packageItem, index) => (
                  <div key={index} className="relative  overflow-hidden m-4">
                    <img
                      src={packageItem.image}
                      alt={packageItem.title}
                      className="w-full h-92 object-cover rounded-xl"
                    />
                    <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md">
                      <img src={heart} alt='heart' width={20} />
                    </button>
                    <div className="p-4">
                      <h3 className="font-bold text-lg">{packageItem.title}</h3>
                      <p className="text-black font-semibold text-md mt-2">{packageItem.highlights}</p>
                      <button className="mt-4 bg-black text-white px-4 py-2 rounded-md">
                        BOOK AGAIN
                      </button>
                    </div>
                  </div>
                ))}
              </div></>
          )}
          {/* MY FAVOURITES */}
          {selectedTab === 'MY FAVOURITES' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 m-6">
                {tourPackages.slice(4, 6).map((packageItem, index) => (
                  <div key={index} className="relative  overflow-hidden m-4">
                    <img
                      src={packageItem.image}
                      alt={packageItem.title}
                      className="w-full h-92 object-cover rounded-xl"
                    />
                    <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md">
                      <img src={heart} alt='heart' width={20} />
                    </button>
                    <div className="p-4">
                      <h3 className="font-bold text-lg">{packageItem.title}</h3>
                      <p className="text-black font-semibold text-md mt-2">{packageItem.highlights}</p>
                      <button className="mt-4 bg-black text-white px-4 py-2 rounded-md">
                        EXPLORE NOW
                      </button>
                    </div>
                  </div>
                ))}
              </div></>
          )}
          {/*  BOOKINGS */}
          {selectedTab === 'BOOKINGS' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 m-6">
                {tourPackages.slice(6, 8).map((packageItem, index) => (
                  <div key={index} className="relative  overflow-hidden m-4">
                    <img
                      src={packageItem.image}
                      alt={packageItem.title}
                      className="w-full h-92 object-cover rounded-xl"
                    />
                    <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md">
                      <img src={heart} alt='heart' width={20} />
                    </button>
                    <div className="p-4">
                      <h3 className="font-bold text-lg">{packageItem.title}</h3>
                      <p className="text-black font-semibold text-md mt-2">{packageItem.highlights}</p>
                      <button className="mt-4 bg-white text-black border-1 px-4 py-2 rounded-md">
                        VIEW
                      </button>
                    </div>
                  </div>
                ))}
              </div></>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
