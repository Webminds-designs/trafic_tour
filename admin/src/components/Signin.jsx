import React, { useState, useContext } from "react";
import axios from "axios";
import userimg from "../assets/user.png";
import google from "../assets/Google.svg";
import signin_Bg from "../assets/signin.jpg";

import hidden from "../assets/hidden.png";
import eye from "../assets/eye.png";
import lock from "../assets/lock.png";
import imgemail from "../assets/email.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logoBlack from "../assets/logoBlack.png";
import api from "../services/api.js";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { setUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const userdetails = user;
  //password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // basic login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // const response = await axios.post(
      //   "http://localhost:3000/api/user/login",
      //   {
      //     email,
      //     password,
      //   }
      // );

      const response = await api.post(
        "/user/auth",
        {},
        {
          withCredentials: true,
        }
      );

      const user = response.data.user;

      if (user.role !== "admin") {
        setError("Access denied. Admins only.");
        toast.error("Access denied. Admins only.");
        return;
      }

      console.log("Admin Login Successful:", user);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      toast.success("Login Successful");
      navigate("/dashboard");
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
      {/* logo */}
      <div className="absolute top-4 left-4 text-[16px] font-semibold">
        <img src={logoBlack} alt="logo" className="w-16 md:w-28" />
      </div>
      <div className="bg-gradient-to-b  from-[#acc6c0] via-[#c9d9d7] to-white backdrop-blur-lg backdrop-brightness-75 bg-opacity-90  p-4 px-8  mt-10  rounded-3xl shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="mt-4 bg-white p-4 rounded-2xl shadow-xl">
            <img src={userimg} width={30} alt="User" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-center mb-2">
          Admin Journey begins here!
        </h2>
        <p className="text-center text-gray-500 mb-6 mt-4 font-medium">
          Log in to manage your bookings, explore<br></br> new destinations, and
          plan your perfect trip.
        </p>
        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-4 relative">
            {/* email */}
            <label className="bg-[#e2e7ea] rounded-xl text-gray-700 flex items-center">
              <img
                src={imgemail}
                alt="email"
                width={20}
                className="absolute left-2 opacity-50"
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
            {/* password */}
            <label className="bg-[#e2e7ea] rounded-xl text-gray-700 flex items-center">
              <img
                src={lock}
                alt="lock"
                width={20}
                className="absolute left-2 opacity-50"
              />
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                className="mx-5 w-full px-4 py-3  focus:outline-hidden   rounded-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* password visible */}
              <img
                src={passwordVisible ? eye : hidden}
                onClick={togglePasswordVisibility}
                alt="hidden"
                width={20}
                className="absolute right-2 opacity-50"
              />
            </label>

            <div className=" flex justify-between text-right mt-5">
              <div>
                {" "}
                {/* erorr showing */}
                {error && (
                  <p className="text-red-500 text-center mb-4">{error}</p>
                )}
              </div>
              <a href="#" className="text-sm text-gray-800 hover:underline">
                Forgot password?
              </a>
            </div>
          </div>
          {/* Login button */}
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
