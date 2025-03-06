import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import PackageCard from "../components/PackageCard";
import { BiSolidPackage } from "react-icons/bi";
import ruwanwali from '../assets/ruwanwali.png';
import mountain from '../assets/mountain.png';
import plain from '../assets/plain.png';
import siripada from '../assets/sripada.png';
import sigiriya from '../assets/sigiriya.png';
import girihadu from '../assets/girihadu.png';
import { FaCamera } from "react-icons/fa";

const packages = [
    { id: 1, image: ruwanwali, name: "Cultural Wonders" },
    { id: 2, image: mountain, name: "Ella Mountain Escape" },
    { id: 3, image: plain, name: "Hill Country Retreat" },
    { id: 4, image: siripada, name: "Cultural Wonders" },
    { id: 5, image: sigiriya, name: "Ancient Ruins Tour" },
    { id: 6, image: girihadu, name: "Cultural Wonders" },
];

const PackageManagement = () => {
    const [showModal, setShowModal] = useState(false);
    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState({
        packageName: "",
        subName: "",
        description: "",
        packageType: "",
        sites: [],  // Initialize as an array
        includes: "",
        duration: "",
        price: ""
    });


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };


    const [newSite, setNewSite] = useState(""); // Store new site input

    const handleAddSite = () => {
        if (newSite.trim() !== "") {
            setFormData((prev) => ({
                ...prev,
                sites: [...prev.sites, newSite], // Append new site to list
            }));
            setNewSite(""); // Clear input field
        }
    };

    return (
        <div className="flex h-full bg-gray-200 font-figtree">
            <Sidebar />
            <div className="flex-1 flex flex-col p-6">
                <Topbar title="Package Management" />
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <button
                            className="bg-white text-[#003135] px-4 py-2 rounded-2xl flex items-center ml-auto cursor-pointer"
                            onClick={() => setShowModal(true)}
                        >
                            <BiSolidPackage className="mr-2 text-[#003135]" />
                            Add Package
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {packages.map((pkg) => (
                            <PackageCard key={pkg.id} image={pkg.image} name={pkg.name} />
                        ))}
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg w-[800px]">
                        <div className="flex flex-col">

                            {/* Image Upload - Top Left */}
                            <div className="flex justify-start mb-4">
                                <div className="w-36 h-36 bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center relative rounded-md">
                                    {image ? (
                                        <img src={image} alt="Uploaded" className="w-full h-full object-cover rounded-md" />
                                    ) : (
                                        <label className="w-full h-full flex items-center justify-center cursor-pointer">
                                            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                                            <FaCamera className="text-gray-500 text-xl" />
                                        </label>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3 items-center">
                                <label className="text-black col-span-1">Package Name</label>
                                <input
                                    type="text"
                                    name="packageName"
                                    placeholder="Enter package name"
                                    value={formData.packageName}
                                    onChange={handleChange}
                                    className="bg-gray-100 p-2 rounded col-span-2 w-full"
                                />

                                <label className="text-black col-span-1">Subname</label>
                                <input
                                    type="text"
                                    name="subName"
                                    placeholder="Enter package subname"
                                    value={formData.subName}
                                    onChange={handleChange}
                                    className="bg-gray-100 p-2 rounded col-span-2 w-full"
                                />

                                <label className="text-black col-span-1">Package Description</label>
                                <textarea
                                    name="description"
                                    placeholder="Enter package description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="bg-gray-100 p-2 rounded col-span-2 w-full"
                                />

                                <label className="text-black col-span-1">Package Type</label>
                                <select
                                    name="packageType"
                                    value={formData.packageType}
                                    onChange={handleChange}
                                    className="bg-gray-100 p-2 rounded col-span-2 w-full"
                                >
                                    <option value="" disabled className="text-gray-100">Select Package</option>
                                    <option>Educational packages</option>
                                    <option>Adventure packages</option>
                                    <option>Luxury packages</option>
                                </select>

                                <label className="text-black col-span-1">Sites</label>
                                <div className="flex items-center gap-2 col-span-2">
                                    <input
                                        type="text"
                                        name="newSite"
                                        placeholder="Site 01"
                                        value={newSite}
                                        onChange={(e) => setNewSite(e.target.value)}
                                        className="bg-gray-100 p-2 rounded w-full"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddSite}
                                        className="border p-1 rounded-full bg-gray-500 text-white cursor-pointer w-8 h-8 flex items-center justify-center"
                                    >
                                        +
                                    </button>
                                </div>

                                <label className="text-black col-span-1">Includes</label>
                                <textarea
                                    name="includes"
                                    placeholder="Enter the Details..."
                                    value={formData.includes}
                                    onChange={handleChange}
                                    className="bg-gray-100 p-2 rounded col-span-2 w-full"
                                />

                                <label className="text-black col-span-1">Duration</label>
                                <input
                                    type="text"
                                    name="duration"
                                    placeholder="3 Days and 1 Night"
                                    value={formData.duration}
                                    className="bg-gray-100 p-2 rounded col-span-2 w-full"
                                    readOnly
                                />

                                <label className="text-black col-span-1">Standard Price</label>
                                <input
                                    type="text"
                                    name="price"
                                    placeholder="$190.00"
                                    value={formData.price}
                                    className="bg-gray-100 p-2 rounded col-span-2 w-full"
                                    readOnly
                                />
                            </div>

                            {/* Buttons - Bottom Right */}
                            <div className="flex justify-end gap-4 mt-6">
                                <button onClick={() => setShowModal(false)} className="px-2 py-1 border rounded-3xl cursor-pointer">Cancel</button>
                                <button className="px-2 py-1 bg-black text-white rounded-3xl cursor-pointer">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>


            )}
        </div>
    );
};

export default PackageManagement;
