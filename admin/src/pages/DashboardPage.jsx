import React, { useContext, useState, useEffect } from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
// import axios from "axios";
import Stamps from "../assets/stamps.png";
import { AuthContext } from "../context/authContext.jsx";
import { Link } from "react-router-dom";
import api from "../services/api.js";

const DashboardPage = () => {
  const { user, setUser, logout } = useContext(AuthContext);
  const [packages, setPackages] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //get packages details
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        // const response = await axios.get("http://localhost:3000/api/packages");
        const response = await api.get(
          "/packages",
          {},
          {
            withCredentials: true,
          }
        );
        setPackages(response.data.packages);
        // Assuming the response contains an array of packages
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  //get all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // const response = await axios.get("http://localhost:3000/api/user");
        const response = await api.get("/user");

        console.log("API Response:", response.data); // Check full response

        // Verify if the response contains expected user fields
        if (response.data.users) {
          console.log("Users Data:", response.data.users);
          setUsers(response.data.users);
        } else {
          console.error("Users field missing in response");
          setUsers([]);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err.message);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex bg-gray-200 font-figtree min-h-screen">
      {/* Sidebar - Fixed */}
      <Sidebar activated="UserManagement" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-4 md:p-8 overflow-y-auto">
        <Topbar title="Dashboard" />

        {/* Overview Section */}
        <div className="bg-white p-6 md:p-10 rounded-lg mb-6 flex flex-col md:flex-row justify-between items-center">
          {/* Left Side Content */}
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-[#003135]">
              Overview
            </h3>
            <p className="text-[#003135] text-lg md:text-xl">
              Here's a quick overview of your dashboard insights—stay on top of
              bookings, inquiries, and more at a glance!
            </p>
          </div>

          {/* Right Side Image */}
          <div>
            <img
              src={Stamps}
              alt="Stamps"
              className="w-24 md:w-36 h-auto p-1"
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Recently Added Packages Section */}
          <div className="w-full lg:w-2/3 bg-white p-5 rounded-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-xl text-[#003135] font-semibold">
                Recently Added Packages
              </h2>
              <Link to="/packages">
                <div className="text-gray-600 text-sm underline">
                  manage tour packages
                </div>
              </Link>
            </div>
            <div className="mt-6 space-y-4">
              {packages.slice(0, 3).map((pkg, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-center gap-4 bg-white p-5 rounded-lg"
                >
                  <img
                    src={pkg.imageUrl}
                    alt={pkg.name}
                    className="w-full sm:w-36 h-36 rounded-lg object-cover"
                  />
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-semibold text-xl">{pkg.name}</h3>
                    <p className="text-gray-600 text-sm">{pkg.description}</p>
                    <Link to="/packages">
                      <button className="mt-4 bg-[#009990] text-white px-4 py-2 rounded-2xl text-sm cursor-pointer">
                        View Package
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - New Activity */}
          <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-[#003135]">
                New Activity
              </h2>
              <Link to="/UserManagement">
                <div className="text-gray-600 text-sm underline">see all</div>
              </Link>
            </div>
            <div className="mt-4 space-y-4">
              {users.slice(0, 10).map((user, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-[#003135]"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={user.profileUrl}
                      alt={user.firstName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-[#003135]">
                        {user.firstName} {user.lastName}
                      </h3>
                      <p className="text-gray-500 text-sm">User</p>
                    </div>
                  </div>
                  <Link to="/UserManagement">
                    <div className="text-sm text-[#003135]">View</div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
