import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { FiCamera, FiRefreshCcw, FiEdit2, FiTrash2 } from "react-icons/fi";
import { ImUserPlus } from "react-icons/im";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { toast } from "react-toastify";

import api from "../services/api"; // Adjust the import path as needed

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);

  //get all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // const response = await axios.get("http://localhost:3000/api/user");

        const response = await api.get("/user", {
          withCredentials: true, // Include credentials in the request
        });

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

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    passportId: "",
    phone: "",
    password: "",
    avatar: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    // Validation rules for each field
    if (name === "firstName" || name === "lastName") {
      // Allow only letters
      newValue = value.replace(/[^A-Za-z]/g, "");
    } else if (name === "passportId") {
      // Allow only letters and numbers
      newValue = value.replace(/[^A-Za-z0-9]/g, "");
    } else if (name === "phone") {
      // Allow only numbers and optional leading '+'
      newValue = value.replace(/[^0-9+]/g, "");
    }

    setFormData({ ...formData, [name]: newValue });

    let error = "";

    if (name === "firstName" && !/^[A-Za-z]+$/.test(value)) {
      error = "First name should contain only letters";
    } else if (name === "lastName" && !/^[A-Za-z]+$/.test(value)) {
      error = "Last name should contain only letters";
    } else if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = "Enter a valid email address containing '@'";
    } else if (name === "passportId" && !/^[A-Za-z0-9]+$/.test(value)) {
      error = "Passport ID should contain only letters and numbers";
    } else if (name === "phone" && !/^\+?[0-9]+$/.test(value)) {
      error = "Contact phone should contain only numbers";
    } else if (name === "password" && value.length < 8) {
      error = "Password must be at least 8 characters";
    }

    setErrors({ ...errors, [name]: error });
  };

  const handleEdit = (user) => {
    setFormData(user);
    setShowUpdateModal(true);
  };

  //delete user
  const confirmDelete = (userId) => {
    setSelectedUser(userId);
    setShowDeleteModal(true);
  };

  // Handle actual deletion after confirmation
  const handleDelete = async () => {
    if (!selectedUser) return;

    try {
      // await axios.delete(`http://localhost:3000/api/user/${selectedUser}`);

      await api.delete(`/user/${selectedUser}`, {
        withCredentials: true, // Include credentials in the request
      });

      // Remove user from state
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== selectedUser)
      );

      toast.success("User deleted successfully!");
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error("Failed to delete user. Please try again.");
    } finally {
      setShowDeleteModal(false);
      setSelectedUser(null);
    }
  };

  // basic register
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Start loading

    const formDataToSend = new FormData();
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("passportId", formData.passportId);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("password", formData.password);

    if (formData.avatar) {
      formDataToSend.append("avatar", formData.avatar);
    }

    try {
      // const response = await axios.post(
      //   "http://localhost:3000/api/user/newregister",
      //   formDataToSend
      // );

      await api.post("/user/newregister", formDataToSend, {
        withCredentials: true, // Include credentials in the request
      });

      setShowModal(false);
      toast.success("User registered successfully!");
    } catch (err) {
      console.error(
        "Error during registration:",
        err.response?.data?.message || err.message
      );
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await updateUserProfile(formData);
      alert("Profile updated successfully:", response);
      setShowUpdateModal(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      // Handle error (e.g., show error message)
    }

    setLoading(false);
  };

  const updateUserProfile = async () => {
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
          console.log(key, formData[key]);
        }
      });

      // const response = await axios.post(
      //   "http://localhost:3000/api/user/update",
      //   formDataToSend,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );

      const response = await api.post("/user/update", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true, // Include credentials in the request
      });

      return response.data;
    } catch (error) {
      console.error("Error updating profile:", error);
      return { message: "Error updating profile" };
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        avatar: file, // Store the File object
      }));
    }
  };

  return (
    <div className="flex h-screen bg-gray-200">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6">
        <Topbar title="User Management" />

        <button
          className="bg-white text-[#003135] px-4 py-2 rounded-2xl flex items-center ml-auto cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <ImUserPlus className="mr-2 text-[#003135]" />
          Add User
        </button>

        {/* Table */}
        <div className="bg-white rounded-lg mt-6">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-black border-b border-gray-400">
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Email Address</th>
                <th className="py-3 px-6">Activity</th>
                <th className="py-3 px-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="">
                  <td className="py-4 px-6 flex items-center font-bold">
                    {user.profileUrl ? (
                      <img
                        src={user.profileUrl}
                        alt={user.name}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                    ) : (
                      <div className="w-8 h-8  rounded-full flex items-center justify-center bg-black mr-3">
                        <FaUser className="text-white text-xl" />{" "}
                        {/* Profile icon */}
                      </div>
                    )}
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="py-4 px-6 text-black font-bold">
                    {user.email}
                  </td>
                  <td className="py-4 px-6 text-green-500">Active</td>
                  <td className="py-4 px-6 flex space-x-3">
                    <button
                      className="text-teal-500 cursor-pointer"
                      onClick={() => handleEdit(user)}
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      className="text-teal-500 cursor-pointer"
                      onClick={() => confirmDelete(user._id)}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Custom Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-90 flex justify-center z-50">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold text-gray-800 text-center">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 text-center mt-2">
              Are you sure you want to delete this user?
            </p>

            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/*Register Modal */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 w-3/4 max-w-2xl">
            <form onSubmit={handleSignup}>
              <div className="flex flex-col items-center">
                <label htmlFor="avatar-upload" className="cursor-pointer">
                  <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                    {formData.avatar ? (
                      <img
                        src={URL.createObjectURL(formData.avatar)}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FiCamera className="text-black text-2xl" />
                    )}
                  </div>
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter first name"
                    className="w-full bg-gray-100 rounded-md p-3 mt-1"
                    required
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter last name"
                    className="w-full bg-gray-100 rounded-md p-3 mt-1"
                    required
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    className="w-full bg-gray-100 rounded-md p-3 mt-1"
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Passport ID
                  </label>
                  <input
                    type="text"
                    name="passportId"
                    value={formData.passportId}
                    onChange={handleInputChange}
                    placeholder="Enter passport ID"
                    className="w-full bg-gray-100 rounded-md p-3 mt-1"
                  />
                  {errors.passportId && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.passportId}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter contact number"
                    className="w-full bg-gray-100 rounded-md p-3 mt-1"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
              <div className="mt-6 flex items-center">
                <div className="flex-1">
                  <label className="block text-sm font-medium">Password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleInputChange}
                    placeholder="••••••"
                    className="w-full bg-gray-100 rounded-md p-3 mt-1 "
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  className="text-gray-500 text-sm ml-4 flex items-center cursor-pointer"
                >
                  Reset password <FiRefreshCcw className="ml-1" />
                </button>
              </div>
              <div className="mt-8 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-sm border border-gray-400 text-gray-700 px-2 py-2 rounded-3xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-sm bg-teal-500 text-white px-4 py-2 rounded-3xl cursor-pointer flex items-center justify-center"
                  disabled={loading} // Disable button when loading
                >
                  {loading ? (
                    <div className="flex items-center">Saving...</div>
                  ) : (
                    "Add User"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/*user Update Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 w-3/4 max-w-2xl">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col items-center">
                <label htmlFor="avatar-upload" className="cursor-pointer">
                  <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                    {formData.avatar ? (
                      <img
                        src={URL.createObjectURL(formData.avatar)}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FiCamera className="text-black text-2xl" />
                    )}
                  </div>
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter first name"
                    className="w-full bg-gray-100 rounded-md p-3 mt-1"
                    required
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter last name"
                    className="w-full bg-gray-100 rounded-md p-3 mt-1"
                    required
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    className="w-full bg-gray-100 rounded-md p-3 mt-1"
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Passport ID
                  </label>
                  <input
                    type="text"
                    name="passportId"
                    value={formData.passportId}
                    onChange={handleInputChange}
                    placeholder="Enter passport ID"
                    className="w-full bg-gray-100 rounded-md p-3 mt-1"
                  />
                  {errors.passportId && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.passportId}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter contact number"
                    className="w-full bg-gray-100 rounded-md p-3 mt-1"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
              <div className="mt-6 flex items-center">
                <div className="flex-1">
                  <label className="block text-sm font-medium">Password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleInputChange}
                    placeholder="••••••"
                    className="w-full bg-gray-100 rounded-md p-3 mt-1 "
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  className="text-gray-500 text-sm ml-4 flex items-center cursor-pointer"
                >
                  Reset password <FiRefreshCcw className="ml-1" />
                </button>
              </div>
              <div className="mt-8 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowUpdateModal(false)}
                  className="text-sm border border-gray-400 text-gray-700 px-2 py-2 rounded-3xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-sm bg-teal-500 text-white px-4 py-2 rounded-3xl cursor-pointer flex items-center justify-center"
                  disabled={loading} // Disable button when loading
                >
                  {loading ? (
                    <div className="flex items-center">Saving...</div>
                  ) : (
                    "Edit Details"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
