import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import api from "../services/api"; // Import your API service

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Check if user data is saved in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Set user state with data from localStorage
    } else {
      console.log("No user data ");
    }

    // Optionally, fetch the user from the API to make sure session is valid
    const fetchUser = async () => {
      try {
        // const response = await axios.get(
        //   "http://localhost:3000/api/user/auth",
        //   {
        //     withCredentials: true, // Ensure cookies are included in the request
        //   }
        // );

        const response = await api.get("/user/auth", {
          withCredentials: true, // Ensure cookies are included in the request
        });

        if (response.data) {
          setUser(response.data); // Set the user if the response is valid
          console.log("User data received:", response.data);

          // Save user data in localStorage for future sessions
          localStorage.setItem("user", JSON.stringify(response.data));
        } else {
          console.log("User not authenticated or not found.");
          setUser(null); // Clear user state if unauthenticated
          localStorage.removeItem("user"); // Remove user data from localStorage
        }
      } catch (err) {
        console.error("Error fetching user:", err.message);
      } finally {
        setLoading(false);
      }
    };

    // If no user data in localStorage, fetch the user from the API
    if (!storedUser) {
      fetchUser();
    } else {
      setLoading(false); // No need to fetch if data is already in localStorage
    }
  }, []); // Run only once when the component mounts

  // Logout function
  const logout = async () => {
    try {
      // await axios.post(
      //   "http://localhost:3000/api/user/logout",
      //   {},
      //   { withCredentials: true }
      // );

      await api.post("/user/logout", {}, { withCredentials: true }); // Call logout API

      setUser(null); // Clear user state
      localStorage.removeItem("user"); // Remove user data from localStorage
      console.log("User logged out successfully.");
    } catch (err) {
      console.error("Error logging out:", err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, setUser, logout }}>
      {loading ? (
        <div>Loading...</div> // Show a loading indicator while fetching user data
      ) : error ? (
        <div>{error}</div> // Display error if there was an issue fetching user data
      ) : (
        children // Render children components once loading is complete
      )}
    </AuthContext.Provider>
  );
};
