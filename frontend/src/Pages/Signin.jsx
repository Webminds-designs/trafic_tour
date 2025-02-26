import React, { useState, useEffect } from "react";
import axios from "axios";
import user from "../assets/user.png";
import google from "../assets/Google.svg";
import signin_Bg from "../assets/signin_Bg.png"
import { auth } from "../components/Firebase.js";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { setPersistence, browserSessionPersistence } from "firebase/auth";
import hidden from "../assets/hidden.png";
import eye from "../assets/eye.png";
import lock from "../assets/lock.png";
import imgemail from "../assets/email.png";
import { Link } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [profile, setProfile] = useState(null);
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:6400/api/user/login",
        {
          email,
          password,
        }
      );

      console.log("Login Successful:", response.data);
      alert("Login Successful");
    } catch (err) {
      console.error(
        "Login Failed:",
        err.response?.data?.message || err.message
      );
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div
  style={{ backgroundImage: `url(${signin_Bg})` }}
  className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
>
      <div className="absolute top-4 left-4 text-[16px] font-semibold">
        <h1>
          TRAFFIC
          <br /> TOURS
        </h1>
      </div>
      <div className="bg-gradient-to-b from-[#ffd78f] via-[#F6E7C9] to-white backdrop-blur-lg backdrop-brightness-75 bg-opacity-90  p-4 px-8  mt-10  rounded-3xl shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="mt-4 bg-white p-4 rounded-2xl shadow-xl">
            <img src={user} width={30} alt="User" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-center mb-2">
          Your Journey begins here!
        </h2>
        <p className="text-center text-gray-500 mb-6 mt-4 font-medium">
          Log in to manage your bookings, explore<br></br> new destinations, and
          plan your perfect trip.
        </p>

        <form onSubmit={handleLogin}>
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
            Login
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex items-center justify-center space-x-2">
            {Array(12)
              .fill()
              .map((_, index) => (
                <span
                  key={index}
                  className="w-1 h-1 md:mx-[5px] mx-[5px]  bg-gray-300 rounded-full"
                ></span>
              ))}
          </div>

          <span className="mx-4 text-gray-500">or</span>
          <div className="flex items-center justify-center space-x-2">
            {Array(12)
              .fill()
              .map((_, index) => (
                <span
                  key={index}
                  className="w-1 h-1 md:mx-[5px] mx-[5px] bg-gray-300 rounded-full"
                ></span>
              ))}
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            className="bg-white   shadow-lg border-1 border-gray-100  rounded-lg w-full h-[40px] flex items-center justify-center p-2"
            onClick={signInWithGoogle} 
          >
         
            <img src={google} alt="Google Logo" className="w-6 h-6" />
            <div className="m-2 text-gray-900
            ">Login with Google </div>
          </button>
          
        </div>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-gray-900 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
