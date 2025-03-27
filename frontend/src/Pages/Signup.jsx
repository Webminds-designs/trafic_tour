import React, { useState, useContext } from "react";
import axios from "axios";
import user from "../assets/user.png";
import signup_Bg from "../assets/signup.jpg"
import google from "../assets/Google.svg"; 
import { auth } from "../components/Firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  setPersistence,
  browserSessionPersistence,
 
} from "firebase/auth";
import hidden from "../assets/hidden.png";
import eye from "../assets/eye.png";
import lock from "../assets/lock.png";
import imgemail from "../assets/email.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logoBlack from "../assets/logoBlack.png";


const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comfirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [conpasswordVisible, setConPasswordVisible] = useState(false);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  //password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleConPasswordVisibility = () => {
    setConPasswordVisible(!conpasswordVisible);
  };

  //google signin
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
//google login
      if (emailCheckResponse.data.exists) {
        const LoginResponse = await axios.post(
          "http://localhost:6400/api/user/Googlelogin",
          userData
        );

       
        localStorage.setItem("user", JSON.stringify(LoginResponse.data.user));
        setUser(LoginResponse.data.user);
        toast.success("Login Successful");
        navigate("/profile");
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

// basic register
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
      toast.success("User registered successfully!");
      const subscriptionResponse = await axios.post(
        "http://localhost:6400/api/subscriptions/signup", 
        { email }
      );
  
      console.log("Email subscribed successfully!");
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
      <div
       style={{ backgroundImage: `url(${signup_Bg})` }}
       className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
     >
        <div className="absolute top-4 left-4 text-[16px] font-semibold">
          <img src={logoBlack} alt="logo" className="w-16 md:w-28" />
        </div>
        <div className="bg-gradient-to-b from-[#acc6c0] via-[#c9d9d7] to-white backdrop-blur-lg backdrop-brightness-75 bg-opacity-90 p-4 px-8  mt-10 rounded-3xl shadow-lg max-w-md w-full z-100">
          <div className="flex justify-center ">
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
            {/* Form Fields */}

            <div className="mb-4 relative">
              {/* email */}
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
                {/* password */}
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
                {/* comfirm password */}
              <label className="bg-[#e2e7ea] rounded-xl text-gray-700 flex items-center">
                <img
                  src={lock}
                  alt="lock"
                  width={20}
                  className="absolute left-2 opacity-80"
                />
                <input
                  type={conpasswordVisible ? "text" : "password"}
                  placeholder="confirm password"
                  className="mx-5 w-full px-4 py-3  focus:outline-hidden   rounded-xl"
                  value={comfirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <img
                  src={conpasswordVisible ? eye : hidden}
                  onClick={toggleConPasswordVisibility}
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
            {/* dots design */}
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
            <span className="mx-4 text-gray-500">or </span>
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
          </div>

          <div className="flex justify-center space-x-4">
            <button
              className="bg-white   shadow-lg border-1 border-gray-100 rounded-lg w-full h-[40px] flex items-center justify-center p-2"
              onClick={signInWithGoogle} // Trigger Firebase Google login on click
            >
              <img src={google} alt="Google Logo" className="w-6 h-6" />
              <div className="m-2 text-gray-900
            ">Login with Google </div>
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
