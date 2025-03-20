import React, { useState } from 'react';
import { FiCamera, FiRefreshCcw, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { ImUserPlus } from "react-icons/im";
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const usersData = [
    { id: 1, name: 'User 01', email: 'hellouser01@gmail.com', activity: 'Active', avatar: 'https://via.placeholder.com/40' },
    { id: 2, name: 'User 02', email: 'hellouser02@gmail.com', activity: 'Active', avatar: 'https://via.placeholder.com/40' },
    { id: 3, name: 'User 03', email: 'hellouser03@gmail.com', activity: 'Active', avatar: 'https://via.placeholder.com/40' }
];

const UserManagement = () => {
    const [users, setUsers] = useState(usersData);
    const [showModal, setShowModal] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        passportId: '',
        contactNumber: '',
        address: '',
        password: '',
        avatar: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        let newValue = value;

        // Validation rules for each field
        if (name === "firstName" || name === "lastName") {
            // Allow only letters
            newValue = value.replace(/[^A-Za-z]/g, '');
        } else if (name === "passportId") {
            // Allow only letters and numbers
            newValue = value.replace(/[^A-Za-z0-9]/g, '');
        } else if (name === "contactNumber") {
            // Allow only numbers and optional leading '+'
            newValue = value.replace(/[^0-9+]/g, '');
        }

        setFormData({ ...formData, [name]: newValue });

        // Validate as user types
        validateField(name, newValue);
    };

    const validateField = (name, value) => {
        let error = '';

        if (name === "firstName" && !/^[A-Za-z]+$/.test(value)) {
            error = "First name should contain only letters";
        } else if (name === "lastName" && !/^[A-Za-z]+$/.test(value)) {
            error = "Last name should contain only letters";
        } else if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            error = "Enter a valid email address containing '@'";
        } else if (name === "passportId" && !/^[A-Za-z0-9]+$/.test(value)) {
            error = "Passport ID should contain only letters and numbers";
        } else if (name === "contactNumber" && !/^\+?[0-9]+$/.test(value)) {
            error = "Contact number should contain only numbers";
        } else if (name === "password" && value.length < 8) {
            error = "Password must be at least 8 characters";
        }

        setErrors({ ...errors, [name]: error });
    };



    const handleSubmit = (e) => {
        e.preventDefault();

        const isValid = validateForm();
        if (!isValid) {
            return; // Stop submission if there are errors
        }

        if (editUser) {
            const updatedUsers = users.map(user =>
                user.id === editUser.id ? { ...user, ...formData } : user
            );
            setUsers(updatedUsers);
        } else {
            const newUser = { ...formData, id: users.length + 1 };
            setUsers([...users, newUser]);
        }

        setShowModal(false);
        setEditUser(null);
        setFormData({
            firstName: '', lastName: '', email: '', passportId: '',
            contactNumber: '', address: '', password: '', avatar: ''
        });
    };

    const handleEdit = (user) => {
        setEditUser(user);
        setFormData(user);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        const updatedUsers = users.filter(user => user.id !== id);
        setUsers(updatedUsers);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, avatar: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        let newErrors = {};

        // First Name: Only letters (No numbers or symbols)
        if (!/^[A-Za-z]+$/.test(formData.firstName)) {
            newErrors.firstName = "First name should contain only letters";
        }

        // Last Name: Only letters (No numbers or symbols)
        if (!/^[A-Za-z]+$/.test(formData.lastName)) {
            newErrors.lastName = "Last name should contain only letters";
        }

        // Email: Must contain '@' and follow standard email format
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Enter a valid email address containing '@'";
        }

        // Passport ID: Only letters and numbers (No symbols)
        if (!/^[A-Za-z0-9]+$/.test(formData.passportId)) {
            newErrors.passportId = "Passport ID should contain only letters and numbers";
        }

        // Contact Number: Only numbers, with optional leading '+'
        if (!/^\+?[0-9]+$/.test(formData.contactNumber)) {
            newErrors.contactNumber = "Contact number should contain only numbers";
        }

        // Password: Must be at least 8 characters
        if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    return (
        <div className="flex h-screen bg-gray-200">
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col p-6">
                <Topbar title="User Management" />

                <button className="bg-white text-[#003135] px-4 py-2 rounded-2xl flex items-center ml-auto cursor-pointer" onClick={() => setShowModal(true)}>
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
                            {users.map(user => (
                                <tr key={user.id} className="">
                                    <td className="py-4 px-6 flex items-center font-bold">
                                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full mr-3" />
                                        {user.name}
                                    </td>
                                    <td className="py-4 px-6 text-black font-bold">{user.email}</td>
                                    <td className="py-4 px-6 text-green-500">{user.activity}</td>
                                    <td className="py-4 px-6 flex space-x-3">
                                        <button className="text-teal-500 cursor-pointer" onClick={() => handleEdit(user)}><FiEdit2 /></button>
                                        <button className="text-teal-500 cursor-pointer" onClick={() => handleDelete(user.id)}><FiTrash2 /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-2xl p-8 w-3/4 max-w-2xl">
                        <div className="flex flex-col items-center">
                            <label htmlFor="avatar-upload" className="cursor-pointer">
                                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                                    {formData.avatar ? (
                                        <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover" />
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
                                onChange={handleImageChange}
                            />
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-6 mt-6">
                                <div>
                                    <label className="block text-sm font-medium">First Name</label>
                                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Enter first name" className="w-full bg-gray-100 rounded-md p-3 mt-1" required />
                                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Last Name</label>
                                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Enter last name" className="w-full bg-gray-100 rounded-md p-3 mt-1" required />
                                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Email Address</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter email address" className="w-full bg-gray-100 rounded-md p-3 mt-1" required />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Passport ID</label>
                                    <input type="text" name="passportId" value={formData.passportId} onChange={handleInputChange} placeholder="Enter passport ID" className="w-full bg-gray-100 rounded-md p-3 mt-1" />
                                    {errors.passportId && <p className="text-red-500 text-sm mt-1">{errors.passportId}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Contact Number</label>
                                    <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleInputChange} placeholder="Enter contact number" className="w-full bg-gray-100 rounded-md p-3 mt-1" />
                                    {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Address</label>
                                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Enter address" className="w-full bg-gray-100 rounded-md p-3 mt-1" />
                                </div>
                            </div>
                            <div className="mt-6 flex items-center">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium">Password</label>
                                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="••••••" className="w-full bg-gray-100 rounded-md p-3 mt-1" required />
                                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                                </div>
                                <button type="button" className="text-gray-500 text-sm ml-4 flex items-center cursor-pointer">
                                    Reset password <FiRefreshCcw className="ml-1" />
                                </button>
                            </div>
                            <div className="mt-8 flex justify-end space-x-4">
                                <button type="button" onClick={() => setShowModal(false)} className="text-sm border border-gray-400 text-gray-700 px-2 py-2 rounded-3xl cursor-pointer">
                                    Cancel
                                </button>
                                <button type="submit" className="text-sm bg-teal-500 text-white px-2 py-1 rounded-3xl cursor-pointer">Save Details</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;