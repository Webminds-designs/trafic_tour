import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../context/authContext.jsx";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';


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
import userpic from "../assets/user.png"
import Navbar from './Navbar.jsx';
import Bookings from './Bookings.jsx';
import { toast } from 'react-toastify';


const Profile = () => {
  const { user } = useContext(AuthContext);
  const [imagePreview, setImagePreview] = useState(null);
  const [profileData, setProfileData] = useState(new FormData());
  const [selectedTab, setSelectedTab] = useState('Account Settings');
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [newpasswordVisible, setNewPasswordVisible] = useState(false);
  const [conpasswordVisible, setConPasswordVisible] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProfileEditing, setIsProfileEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  console.log(user);
  const openModal = (packageItem) => {
    setSelectedPackage(packageItem);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    passportId: "",
    phone: "",
    profileUrl: "",
    password:"",
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      console.log("User not found, navigating to sign-in");
      navigate('/signin');  // Navigate to sign-in page
      return; // Stop execution if user is null
    }
  
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:6400/api/user/${user.id}`);
        setUserDetails(response.data.user);
        setLoading(false);
  
        // Set initial form data with fetched user details
        setFormData({
          firstName: response.data.user.firstName || "",
          lastName: response.data.user.lastName || "",
          email: response.data.user.email || "",
          passportId: response.data.user.passportId || "",
          phone: response.data.user.phone || "",
          profileUrl: response.data.user.profileUrl || "",
          password: response.data.user.password || "",
        });
  
      } catch (err) {
        setError('Error fetching user details');
        console.error("Error fetching user details:", err.message);
        navigate('/signin'); 
        setLoading(false);
      }
    };
  
    fetchUserDetails();
  }, [user]);  // ✅ Corrected dependency array
  

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newpasswordVisible);
  };
  const toggleConPasswordVisibility = () => {
    setConPasswordVisible(!conpasswordVisible);
  };


  const tabs = [
    'Account Settings',
    'Booking History',
    'My Favourites',
    'Bookings'
  ];
  const tourPackages = [
    {
      title: "Belihul Oya Wilderness Escape",
      highlights: "Scenic Belihul Oya, Diyaluma Falls, Trekking Trails, Eco-Lodge Stay, Birdwatching",
      image: image1
    },
    {
      title: "Cultural Heritage Adventure",
      highlights: "Sigiriya Rock Fortress, Anuradhapura Ruins, Ancient Temples",
      image: image2,
    },
    {
      title: "Serene Beach Escape",
      highlights: "Bentota Beach, Galle Fort, Boat Rides in Madu River",
      image: image3,
    },
    {
      title: "Cultural Capital Discovery",
      highlights: "Kandy, Pinnawala Elephant Orphanage, Local Arts and Crafts",
      image: image4,
    },
    {
      title: "Southern Paradise Discovery",
      highlights: "Mirissa Beach, Whale Watching, Hiriketiya, and Tangalle",
      image: image5,
    },
    {
      title: "Temple Trails and Sacred Sites",
      highlights: "Kandy Temple of the Tooth, Dambulla Cave Temple, Polonnaruwa Ruins",
      image: image6,
    },
    {
      title: "Ancient Cities and Heritage Tour",
      highlights: "Polonnaruwa, Anuradhapura, Ritigala Ancient Site",
      image: image7,
    },
    {
      title: "Nature & Adventure Expedition",
      highlights: "Adam’s Peak, Knuckles Mountain Range, Kandy Lake",
      image: image8,
    }
  ];
  
  //update profile

  const [isEditing, setIsEditing] = useState(true);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:6400/api/user/profile",
        { userId: user.id, ...formData }
      );
      console.log("Profile updated successfully", response.data);

      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };
  const handleCancel = () => {
    setFormData({
      firstName: userDetails.firstName || "",
      lastName: userDetails.lastName || "",
      email: userDetails.email || "",
      passportId: userDetails.passportId || "",
      phone: userDetails.phone || "",
    
    });
    setIsEditing(false);
  };


  //profile update
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      // Create FormData and append the file
      const formData = new FormData();
      formData.append('image', file);  // Append the file with the correct field name

      setProfileData(formData);  // Store FormData in state
    }
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });
  const handleImageUpload = async () => {
    try {
      setLoading(true);  // Set loading state to true when upload starts

      const formData = new FormData();
      // Append image and user ID to formData
      formData.append('image', profileData.get('image'));
      formData.append('userId', user.id);

      const response = await axios.put('http://localhost:6400/api/user/updateurl', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        setIsProfileEditing(false)
        toast.success("Image uploaded successfully")
      } else {
        console.error('Upload failed:', response.data.message);
      }
    } catch (error) {
      setError('Error uploading image. Please try again.');
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
  };

  //Add new password 

  const handleNewPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }
    const userId =user.id;
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:6400/api/user/newpassword", {
        userId,
        newPassword,
      });

      toast.error(response.data.message);
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

    //Update password 
    const handleUpdatePassword = async (e) => {
      e.preventDefault();
    
      const userId = user.id; // Ensure user.id is available
      if (newPassword !== confirmPassword) {
        toast.error("New password and confirm password do not match.");
        return;
      }
    
      // If old password is required but not provided
      if (userDetails?.password && !oldPassword) {
        toast.error("Please enter the old password.");
        return;
      }
    
      try {
        setLoading(true);
    
        // Call the backend API to update the password
        const response = await axios.post("http://localhost:6400/api/user/updatepassword", {
          userId,
          oldPassword, // Send old password to backend for verification
          newPassword, // Send new password
        });
    
        toast.error(response.data.message);
    
        // Clear the password fields
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };
    
  
  return (
    < >
        <Navbar />
      <div className=' bg-[#F1F1F1] lg:px-10 pt-22'>
        <main className="container md:mx-auto md:px-4 py-8 ">
        <h1 className="lg:text-5xl md:text-4xl text-2xl font-medium lg:mx-0 md:mx-22 mx-10">Your Adventure <span className='border-b-1'>Awaits</span></h1>
<p className="mt-6 md:mx-0 mx-10 md:text-start text-center">Tailor your experience and make every moment unforgettable.</p>

          <div className="flex flex-col md:flex-row items-center mx-4 md:mx-0 my-12">
            <div
              {...(isProfileEditing ? getRootProps() : {})} // Apply drag-and-drop only if editing
              className={`cursor-pointer rounded-full w-32 h-32 md:w-48 md:h-48 object-cover ${isProfileEditing ? "border-2 border-dashed border-gray-400" : ""
                }`} // Optional border styling for edit mode
            >
              {isProfileEditing && <input {...getInputProps()} />} {/* Show input only when editing */}
              <img
                src={
                  imagePreview ||
                  (formData?.profileUrl?.includes("=s96-c")
                    ? formData.profileUrl.replace(/=s96-c/, "=s400-c")
                    : formData?.profileUrl || userpic)
                }
                alt="Profile"
                className="rounded-full w-32 h-32 md:w-48 md:h-48 object-cover"
                onError={() => console.log("Image failed to load")}
              />
            </div>

            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
              <h2 className="text-lg md:text-xl  font-bold">{userDetails?.firstName}  {userDetails?.lastName}</h2>
              <p className="text-sm md:text-md  font-bold">{userDetails?.email}</p>
              <div className="mt-4 flex justify-center md:justify-start">
                {isProfileEditing ? (
                  <>
                    <button
                      onClick={() => setIsProfileEditing(false)}
                      className="bg-white border border-black px-4 py-2 rounded-3xl mr-2 text-sm md:text-md"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleImageUpload}
                      className={`bg-black text-white px-4 py-2 rounded-3xl text-sm md:text-md ${loading ? 'bg-gray-600 cursor-not-allowed' : ''}`}
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <div className="animate-spin border-4 border-t-transparent border-white rounded-3xl-full w-5 h-5 mr-2" />
                          Uploading...
                        </span>
                      ) : (
                        "Change Profile"
                      )}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsProfileEditing(true)}
                    className="bg-black text-white px-4 py-2 rounded-3xl text-sm md:text-md"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className=" bg-black text-white rounded-3xl">
            <nav className="flex justify-between  ">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`md:py-2 lg:px-27 md:px-10 lg:text-base text-[10px] px-6 ${selectedTab === tab
                    ? 'text-black bg-gray-100 font-bold text-sm '
                    : ''
                    }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          {/* Account Settings */}
          {selectedTab === 'Account Settings' && (
            <div className="">
              <h2 className="text-3xl font-medium m-6 md:mx-0 ">Personal Details</h2>
              <form className="mx-auto px-4 sm:px-6 md:px-0" onSubmit={handleSubmit}>
                {/* First Name */}
                <div className="mb-4 flex flex-col md:flex-row">
                  <label className="text-gray-700 text-lg font-medium mb-2 md:w-3/12 " htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded-3xl py-2 px-3 w-full md:w-9/12 text-gray-400 focus:outline-none focus:ring-2"
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    disabled={!isEditing}
                  />
                </div>

                {/* Last Name */}
                <div className="mb-4 flex flex-col md:flex-row">
                  <label className="text-gray-700 text-lg font-medium mb-2 md:w-3/12 " htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded-3xl py-2 px-3 w-full md:w-9/12 text-gray-400 focus:outline-none focus:ring-2"
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    disabled={!isEditing}
                  />
                </div>

                {/* Email Address */}
                <div className="mb-4 flex flex-col md:flex-row">
                  <label className="text-gray-700 text-lg font-medium mb-2 md:w-3/12 " htmlFor="email">
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded-3xl py-2 px-3 w-full md:w-9/12 text-gray-400 focus:outline-none focus:ring-2 disabled:cursor-not-allowed"
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    disabled
                  />
                </div>

                {/* Passport ID */}
                <div className="mb-4 flex flex-col md:flex-row">
                  <label className="text-gray-700 text-lg font-medium mb-2 md:w-3/12 " htmlFor="passportId">
                    Passport ID
                  </label>
                  <input
                    className="shadow appearance-none border rounded-3xl py-2 px-3 w-full md:w-9/12 text-gray-400 focus:outline-none focus:ring-2"
                    id="passportId"
                    type="text"
                    value={formData.passportId}
                    onChange={handleChange}
                    placeholder="Enter your passport ID"
                    disabled={!isEditing}
                  />
                </div>

                {/* Contact Number */}
                <div className="mb-8 flex flex-col md:flex-row">
                  <label className="text-gray-700 text-lg font-medium mb-2 md:w-3/12 " htmlFor="contactNumber">
                    Contact
                  </label>
                  <input
                    className="shadow appearance-none border rounded-3xl py-2 px-3 w-full md:w-9/12 text-gray-400 focus:outline-none focus:ring-2"
                    id="phone"
                    type="text"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your contact number"
                  />
                </div>

                {/* Submit / Edit Button */}
                <div className="flex items-center justify-end">
                  <>
                    <button
                      type="button"
                      className="bg-white border text-black font-medium py-2 px-4 rounded-3xl mr-2"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-black text-white font-medium py-2 px-4 rounded-3xl"
                    >
                      Save
                    </button>
                  </>
                </div>
              </form>

              {/* Password Section */}
              <h2 className="text-2xl font-medium mt-6 pb-5 md:m-0 m-5  ">Password</h2>
              <form className='md:m-0 m-5'  onSubmit={userDetails?.password !== "" ? handleUpdatePassword : handleNewPassword}>
                {/* Old Password */}
                {userDetails?.password !== "" && (
                <div className="mb-4 flex flex-col md:flex-row relative">
                  <label className="text-gray-700 text-lg font-medium mb-2 md:w-3/12 " htmlFor="oldPassword">
                    Old Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded-3xl py-2 px-3 w-full md:w-9/12 text-gray-400 focus:outline-none focus:ring-2"
                    id="oldPassword"
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Enter old password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                  <img
                    src={passwordVisible ? eye : hidden}
                    onClick={togglePasswordVisibility}
                    alt="hidden"
                    width={20}
                    className="absolute right-5 md:mt-3 mt-12 opacity-50"
                  />
                </div>)}

                {/* New Password */}
                <div className="mb-4 flex flex-col md:flex-row relative">
                  <label className="text-gray-700 text-lg font-medium mb-2 md:w-3/12 " htmlFor="newPassword">
                    New Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded-3xl py-2 px-3 w-full md:w-9/12 text-gray-400 focus:outline-none focus:ring-2"
                    id="oldPassword"
                    type={newpasswordVisible ? "text" : "password"}
                    placeholder="Enter New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <img
                    src={newpasswordVisible ? eye : hidden}
                    onClick={toggleNewPasswordVisibility}
                    alt="hidden"
                    width={20}
                    className="absolute right-5 md:mt-3 mt-12 opacity-50"
                  />
                </div>

                {/* Confirm Password */}
                <div className="mb-8 flex flex-col md:flex-row relative">
                  <label className="text-gray-700 text-lg font-medium mb-2 md:w-3/12 " htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded-3xl py-2 px-3 w-full md:w-9/12 text-gray-400 focus:outline-none focus:ring-2"
                    id="confirmPassword"
                    type={conpasswordVisible ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <img
                    src={conpasswordVisible ? eye : hidden}
                    onClick={toggleConPasswordVisibility}
                    alt="hidden"
                    width={20}
                    className="absolute right-5 md:mt-3 mt-12 opacity-50"
                  />
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-end">
          <button
            className="bg-white text-gray-700 border border-gray-400 mr-2 font-medium py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline"
            type="button"
          >
            Cancel
          </button>
          <button
            className="bg-black text-white font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline disabled:bg-gray-600 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}
          >
            {loading ? "Updating..." : "Change Password"}
          </button>
        </div>
              </form>

            </div>
          )}
          {/* BOOKING HISTORY */}
          {selectedTab === 'Booking History' && (
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
          {selectedTab === 'My Favourites' && (
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
          {selectedTab === 'Bookings' && (
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
                      <button
                onClick={() => openModal(packageItem)}
                className="mt-4 bg-white text-black border-1 px-4 py-2 rounded-md"
              >
                VIEW
              </button>
                    </div>
                  </div>
                ))}
              </div>
              
                  {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex  justify-center items-center">
          <div className=" rounded-lg shadow-lg max-w-md w-full p-6">
           
            <Bookings  packageItem={selectedPackage} closeModal={closeModal} />
          </div>
        </div>
      )}</>

          )}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
