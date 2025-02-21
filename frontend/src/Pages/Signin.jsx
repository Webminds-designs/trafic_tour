import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import user from '../assets/user.png';
import google from '../assets/Google.svg';
import facebook from '../assets/facebook.svg';
import { auth } from "../components/Firebase.js";
import { GoogleAuthProvider,FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { setPersistence, browserSessionPersistence } from "firebase/auth";

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [profile, setProfile] = useState(null);
  
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      // Set session persistence to maintain user session even after refresh
      await setPersistence(auth, browserSessionPersistence);

      // Sign in with Google using a popup
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user); // Log the entire user object to inspect

      // Check if photoURL is available
      if (user.photoURL) {
        setProfile(user.photoURL); // Setting profile
      } else {
        console.warn("No profile picture available.");
      }
    } catch (error) {
      // Detailed error handling based on error codes
      if (error.code === "auth/popup-closed-by-user") {
        console.warn("Popup closed by the user before completing sign-in.");
      } else {
        console.error("Error during sign-in: ", error.code, error.message);
      }
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
      console.error("Error during Facebook sign-in: ", error.code, error.message);
      setError("Error during Facebook sign-in");
    }
  };
  
  useEffect(() => {
    if (profile) {
      console.log("Profile updated: ", profile);
    }
  }, [profile]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:6400/api/user/login', {
        email,
        password,
      });

      console.log('Login Successful:', response.data);
      alert('Login Successful');
      
    } catch (err) {
      console.error('Login Failed:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100 relative">
      <div className="absolute top-4 left-4 text-[16px] font-semibold">
        <h1>TRAFFIC<br /> TOURS</h1>
      </div>
      <div className="bg-gradient-to-b from-blue-200 via-white to-white bg-opacity-90 p-8 rounded-xl shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="mt-4 bg-white p-4 rounded-xl shadow-xl">
            <img src={user} width={20} alt="User" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-center mb-2">Sign in to Traffic Tours</h2>
        <p className="text-center text-gray-600 mb-6">
          Access your bookings, manage itineraries, and explore Sri Lanka like never before!
        </p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 flex items-center">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 flex items-center">
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <div className="text-right mt-2">
              <a href="#" className="text-sm text-blue-500 hover:underline">Forgot password?</a>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition duration-200"
          >
            Get Started
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">or Sign in with</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            className="bg-white border border-gray-300 rounded-lg w-[100px] h-[40px] flex items-center justify-center p-2"
            onClick={signInWithGoogle} // Trigger Firebase Google login on click
          >
            <img src={google} alt="Google Logo" className="w-6 h-6" />
          </button>
          <button className="bg-white border border-gray-300 rounded-lg w-[100px] h-[40px] flex items-center justify-center p-2"
          onClick={signInWithFacebook}
          >
            <img src={facebook} alt="Facebook Logo" className="w-6 h-6" />
          </button>
        </div>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account? <a href="#" className="text-blue-500 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Signin;
