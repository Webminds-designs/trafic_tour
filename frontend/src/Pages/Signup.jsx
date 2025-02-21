import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import userImage from '../assets/user.png'; // Placeholder image
import googleIcon from '../assets/Google.svg'; // Google icon
import facebookIcon from '../assets/facebook.svg'; // Facebook icon
import { auth } from "../components/Firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { setPersistence, browserSessionPersistence } from "firebase/auth";

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [passportId, setPassportId] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');

  const fileInputRef = useRef();

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await setPersistence(auth, browserSessionPersistence);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
    } catch (error) {
      setError('Error during sign-in: ' + error.message);
    }
  };

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
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
  
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('country', country);
    formData.append('passportId', passportId);
    formData.append('password', password);
    formData.append('image', image); // Ensure the image is appended with 'image' key
  
    try {
      const response = await axios.post('http://localhost:6400/api/user/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('User registered successfully!');
    } catch (err) {
      console.error('Error during registration: ', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };
  
  

  return (
    <div className="flex items-center justify-center bg-blue-100 min-h-screen">
      <div className="absolute top-4 left-4 text-[16px] font-semibold">
        <h1>TRAFFIC<br />TOURS</h1>
      </div>

      <div className="bg-gradient-to-b from-blue-200 via-white to-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-2">Sign up to Traffic Tours</h2>
        <p className="text-center text-gray-600 mb-6">Access your bookings, manage itineraries, and explore Sri Lanka like never before!</p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSignup}>
          {/* Image Upload */}
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

          {/* Form Fields */}
          <div className="mb-4">
            <input type="text" placeholder="First Name" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          </div>
          <div className="mb-4">
            <input type="text" placeholder="Last Name" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </div>
          <div className="mb-4">
            <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-4">
            <input type="text" placeholder="Phone" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div className="mb-4">
            <input type="text" placeholder="Country" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={country} onChange={(e) => setCountry(e.target.value)} required />
          </div>
          <div className="mb-4">
            <input type="text" placeholder="Passport ID" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={passportId} onChange={(e) => setPassportId(e.target.value)} required />
          </div>
          <div className="mb-4">
            <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <button type="submit" className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition duration-200">
            Sign Up
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">or Sign up with</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className="flex justify-center space-x-4">
          <button className="bg-white border border-gray-300 rounded-lg w-[100px] h-[40px] flex items-center justify-center p-2" onClick={signInWithGoogle}>
            <img src={googleIcon} alt="Google Logo" className="w-6 h-6" />
          </button>
          <button className="bg-white border border-gray-300 rounded-lg w-[100px] h-[40px] flex items-center justify-center p-2">
            <img src={facebookIcon} alt="Facebook Logo" className="w-6 h-6" />
          </button>
        </div>

        <p className="text-center text-gray-600 mt-6">
          Already have an account? <a href="#" className="text-blue-500 hover:underline">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
