import React, { useState } from 'react';
import { FiPlusCircle, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { HiOutlineSearch } from 'react-icons/hi';
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
    const [formData, setFormData] = useState({ name: '', email: '', activity: '', avatar: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editUser) {
            // Update user
            const updatedUsers = users.map(user => user.id === editUser.id ? { ...user, ...formData } : user);
            setUsers(updatedUsers);
        } else {
            // Add new user
            const newUser = { ...formData, id: users.length + 1 };
            setUsers([...users, newUser]);
        }
        setShowModal(false);
        setEditUser(null);
        setFormData({ name: '', email: '', activity: 'Active', avatar: '' });
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

    return (
        <div className="flex h-screen bg-gray-200">
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col p-6">
                <Topbar title="UserManagement" />

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
                <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-1/3">
                        <h2 className="text-xl font-bold mb-4">{editUser ? 'Edit User' : 'Add User'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Activity</label>
                                <select
                                    name="activity"
                                    value={formData.activity}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false);
                                        setEditUser(null);
                                        setFormData({ name: '', email: '', activity: '', avatar: '' });
                                    }}
                                    className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-lg cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 bg-[#003135] text-white rounded-lg cursor-pointer">
                                    {editUser ? 'Update' : 'Add'}
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