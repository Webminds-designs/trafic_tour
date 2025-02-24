import React, { useState, useRef } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import user from "../assets/user.png";
import google from "../assets/Google.svg"; // Google icon
import facebook from "../assets/facebook.svg"; // Facebook icon
import { auth } from "../components/Firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  setPersistence,
  browserSessionPersistence,
  FacebookAuthProvider,
} from "firebase/auth";
import hidden from "../assets/hidden.png";
import eye from "../assets/eye.png";
import lock from "../assets/lock.png";
import imgemail from "../assets/email.png";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comfirmpassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await setPersistence(auth, browserSessionPersistence);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user.email);

      // data from Google user
      const { email, displayName, photoURL } = user;

      // Split the displayName into first name and last name
      const [firstName, ...lastName] = displayName.split(" ");
      const lastNameString = lastName.join(" ");

      // Prepare data
      const userData = {
        email,
      };

      // Check if the email already exists
      const emailCheckResponse = await axios.post(
        "http://localhost:6400/api/user/findemail",
        userData
      );

      if (emailCheckResponse.data.exists) {
        const LoginResponse = await axios.post(
          "http://localhost:6400/api/user/Googlelogin",
          userData
        );

        console.log("Login Successful:", LoginResponse.data);
        alert("Login Successful");
      } else {
        // registration
        const registrationData = {
          email,
          profileUrl: photoURL,
          firstName,
          lastName: lastNameString,
        };

        const registrationResponse = await axios.post(
          "http://localhost:6400/api/user/Googleregister",
          registrationData
        );
        console.log("User registered successfully:", registrationResponse.data);
      }
    } catch (error) {
      setError("Error during sign-in: " + error.message);
    }
  };
  const signInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();

    try {
      // Sign in with Facebook using a popup
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user); // Log the entire user object to inspect

      // Handle the user data as needed
    } catch (error) {
      console.error(
        "Error during Facebook sign-in: ",
        error.code,
        error.message
      );
      setError("Error during Facebook sign-in");
    }
  };
  /*
 const fileInputRef = useRef();

  const handleFileDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(file);
        setPreview(URL.createObjectURL(file)); // For preview
      };
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileDrop,
    accept: "image/*",
    maxSize: 2 * 1024 * 1024, // 2MB limit
  });

  const handleClick = () => {
    fileInputRef.current.click();
  };   */

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("comfirmpassword", comfirmpassword);

    try {
      const response = await axios.post(
        "http://localhost:6400/api/user/register",
        formData,
        {}
      );
      alert("User registered successfully!");
    } catch (err) {
      console.error(
        "Error during registration: ",
        err.response?.data?.message || err.message
      );
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className=" -z-50">
      {/* circle 
      <div className="relative  flex items-baseline z-40  justify-center ">
        <div class="absolute w-[1600px]  top-32  h-[1600px] border-2 border-white rounded-full bg-transparent clip-half-circle"></div>
        <div class="absolute  w-[1200px] top-96 h-[1200px] border-2 border-white rounded-full bg-transparent clip-half-circle"></div>
        <div class="absolute  w-[1400px] top-64 h-[1400px] border-2 border-white rounded-full bg-transparent clip-half-circle"></div>
      </div>
      */}
      <div className="flex items-center min-h-screen justify-center  bg-blue-200 relative ">
        <div className="absolute top-4 left-4 text-[16px] font-semibold">
          <h1>
            TRAFFIC
            <br /> TOURS
          </h1>
        </div>
        <div className="bg-gradient-to-b from-[#c7f2ff] via-white to-white bg-opacity-90 p-8  mt-20 rounded-3xl shadow-lg max-w-[610px] w-full z-100">
          <div className="flex justify-center mb-6">
            <div className="mt-4 bg-white p-4 rounded-2xl shadow-xl">
              <img src={user} width={30} alt="User" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-center mb-2">
            Sign up to Traffic Tours
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Access your bookings, manage itineraries, and explore Sri Lanka like
            never before!
          </p>


          <form onSubmit={handleSignup}>
            {/* Image Upload 
          <div {...getRootProps()} className="flex justify-center mb-4 cursor-pointer">
            <input {...getInputProps()} />
            <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center overflow-hidden border-2 border-gray-300" onClick={handleClick}>
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-full" />
              ) : (
                <p className="text-gray-500 text-sm text-center">Drag or Click to Upload</p>
              )}
            </div>
          </div>
         
          <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => handleFileDrop(e.target.files)} />
 */}
            {/* Form Fields */}

            <div className="mb-4 relative">
              <label className="bg-[#e2e7ea] rounded-xl text-gray-700 flex items-center">
                <img
                  src={imgemail}
                  alt="email"
                  width={20}
                  className="absolute left-2 opacity-80"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="mx-5 w-full px-4 py-3    focus:outline-hidden  rounded-xl "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
            </div>

            <div className="mb-4 relative">
              <label className="bg-[#e2e7ea] rounded-xl text-gray-700 flex items-center">
                <img
                  src={lock}
                  alt="lock"
                  width={20}
                  className="absolute left-2 opacity-80"
                />
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  className="mx-5 w-full px-4 py-3  focus:outline-hidden   rounded-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <img
                  src={passwordVisible ? eye : hidden}
                  onClick={togglePasswordVisibility}
                  alt="hidden"
                  width={20}
                  className="absolute right-2 opacity-80"
                />
              </label>
            </div>
            <div className="mb-4 relative">
              <label className="bg-[#e2e7ea] rounded-xl text-gray-700 flex items-center">
                <img
                  src={lock}
                  alt="lock"
                  width={20}
                  className="absolute left-2 opacity-80"
                />
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="confirm password"
                  className="mx-5 w-full px-4 py-3  focus:outline-hidden   rounded-xl"
                  value={comfirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <img
                  src={passwordVisible ? eye : hidden}
                  onClick={togglePasswordVisibility}
                  alt="hidden"
                  width={20}
                  className="absolute right-2 opacity-80"
                />
              </label>
              <div className=" flex justify-between text-right mt-5">
              <div>
                {" "}
                {error && (
                  <p className="text-red-500 text-center mb-4">{error}</p>
                )}
              </div>
              <a href="#" className="text-sm text-gray-800 hover:underline">
                Forgot password?
              </a>
            </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition duration-200"
            >
              Get Started
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex items-center justify-center space-x-2">
              {Array(12)
                .fill()
                .map((_, index) => (
                  <span
                    key={index}
                    className="w-1 h-1 md:mx-[6px] mx-[3px]  bg-gray-300 rounded-full"
                  ></span>
                ))}
            </div>
            <span className="mx-4 text-gray-500">or Sign up with</span>
            <div className="flex items-center justify-center space-x-2">
              {Array(12)
                .fill()
                .map((_, index) => (
                  <span
                    key={index}
                    className="w-1 h-1 md:mx-[6px] mx-[3px]  bg-gray-300 rounded-full"
                  ></span>
                ))}
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              className="bg-white   shadow-lg border-1 border-gray-100 rounded-lg w-[300px] h-[40px] flex items-center justify-center p-2"
              onClick={signInWithGoogle} // Trigger Firebase Google login on click
            >
              <img src={google} alt="Google Logo" className="w-6 h-6" />
            </button>
           
          </div>

          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link to="/signin" className="text-gray-800 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
