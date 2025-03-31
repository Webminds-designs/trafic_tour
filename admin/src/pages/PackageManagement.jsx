import { useState, useEffect, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { FiTrash2 } from 'react-icons/fi';
import { BiSolidPackage } from "react-icons/bi";
import axios from "axios";
import { FaCamera } from "react-icons/fa";
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';



const PackageManagement = () => {
    const [showModal, setShowModal] = useState(false);
    const [showeditModal, setEditShowModal] = useState(false);
    const [image, setImage] = useState(null);
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [imageprev, setImageprev] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        imageUrl: "",
        duration: { days: "", nights: "" },
        price: "",
        type: "",
        places_to_visit: [],
        itinerary: [
            {
                day: 1,
                title: "",

                activities: [],
            }
        ],
    });



    //get packages details
    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await axios.get("http://localhost:6400/api/packages");
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

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;

        setFormData((prev) => {
            if (name === "days" || name === "nights") {
                return {
                    ...prev,
                    duration: { ...prev.duration, [name]: value },
                };
            }
            return { ...prev, [name]: value };
        });
    }, []);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imagePrev = URL.createObjectURL(file);
            setImageprev(imagePrev); // Update preview
            setImage(file);  // Store the actual file
            setFormData((prev) => ({
                ...prev,
                imageUrl: ""
            }));
        }
    };



    const closeModal = () => {
        setShowModal(false);
    };


    const [placesToVisit, setPlacesToVisit] = useState([]);
    const [newSite, setNewSite] = useState("");

    // Function to add a site to places_to_visit
    const handleAddSite = () => {
        if (newSite.trim() !== "" && !formData.places_to_visit.includes(newSite)) {
            setFormData({
                ...formData,
                places_to_visit: [...formData.places_to_visit, newSite],
            });
            setNewSite(""); // Clear input field after adding
        }
    };

    // Function to remove a site from places_to_visit
    const handleRemoveSite = (site) => {
        setFormData({
            ...formData,
            places_to_visit: formData.places_to_visit.filter((s) => s !== site),
        });
    };

    const addItineraryDay = () => {
        setFormData((prevState) => ({
            ...prevState,
            itinerary: [
                ...prevState.itinerary,
                {
                    day: prevState.itinerary.length + 1,
                    title: "",
                    activities: [],
                }
            ],
        }));
    };
    const removeItineraryDay = (index) => {
        setFormData((prevState) => ({
            ...prevState,
            itinerary: prevState.itinerary.filter((_, i) => i !== index),
        }));
    };
    const handleItineraryChange = (index, field, value) => {
        const updatedItinerary = [...formData.itinerary];
        updatedItinerary[index][field] = value;
        setFormData((prevState) => ({
            ...prevState,
            itinerary: updatedItinerary,
        }));
    };

    const handleActivityChange = (index, activityType, value) => {
        const updatedItinerary = [...formData.itinerary];
        updatedItinerary[index].activities[activityType] = value;
        setFormData((prevState) => ({
            ...prevState,
            itinerary: updatedItinerary,
        }));
    };
    const addActivity = (dayIndex) => {
        const updatedItinerary = [...formData.itinerary];
        updatedItinerary[dayIndex].activities.push("");
        setFormData({ ...formData, itinerary: updatedItinerary });
    };

    const removeActivity = (dayIndex, activityIndex) => {
        const updatedItinerary = [...formData.itinerary];
        updatedItinerary[dayIndex].activities.splice(activityIndex, 1);
        setFormData({ ...formData, itinerary: updatedItinerary });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true); // Start loading

        // Trim spaces and validate required fields
        if (!formData.name.trim() || !formData.description.trim() || !formData.type.trim()) {
            toast.error("Name, Description, and Type are required.");
            setLoading(false);
            return;
        }

        if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
            toast.error("Please enter a valid positive price.");
            setLoading(false);
            return;
        }

        if (!formData.duration.days || !formData.duration.nights || isNaN(formData.duration.days) || isNaN(formData.duration.nights)) {
            toast.error("Please enter valid duration days and nights.");
            setLoading(false);
            return;
        }

        if (!formData.places_to_visit.length) {
            toast.error("Please add at least one place to visit.");
            setLoading(false);
            return;
        }

        if (!formData.itinerary.length || !formData.itinerary[0].title.trim()) {
            toast.error("Please provide a valid itinerary.");
            setLoading(false);
            return;
        }

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            formDataToSend.append("description", formData.description);
            formDataToSend.append("price", formData.price);
            formDataToSend.append("type", formData.type);
            formDataToSend.append("duration", JSON.stringify(formData.duration));
            formDataToSend.append("places_to_visit", JSON.stringify(formData.places_to_visit));
            formDataToSend.append("itinerary", JSON.stringify(formData.itinerary));

            if (image) {
                console.log("Adding New Image File:", image);
                formDataToSend.append("image", image);
            }

            if (selectedPackage?.imageUrl) {
                console.log("Retaining Existing Image:", selectedPackage.imageUrl);
                formDataToSend.append("oldimageUrl", selectedPackage.imageUrl);
            }

            let response;

            if (selectedPackage) {
                response = await axios.put(
                    `http://localhost:6400/api/packages/${selectedPackage._id}`,
                    formDataToSend,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
                toast.success("Package updated successfully!");
            } else {
                response = await axios.post(
                    "http://localhost:6400/api/packages",
                    formDataToSend,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
                toast.success("Package added successfully!");
            }

            console.log("Server Response:", response.data);

            setFormData({
                name: "",
                description: "",
                imageUrl: "",
                duration: { days: "", nights: "" },
                price: "",
                type: "",
                places_to_visit: [],
                itinerary: [{ day: 1, title: "", activities: [] }],
            });

            setImage(null);
            setEditShowModal(false);
        } catch (error) {
            console.error("Error:", error);
            if (error.response) {
                console.error("Server Response:", error.response.data);
                toast.error(`Operation failed: ${error.response.data.error || "Unknown error"}`);
            } else {
                toast.error("Operation failed. Please try again.");
            }
        } finally {
            setLoading(false); // Stop loading
        }
    };

    //edit package 
    const handleEditPackage = (pkg) => {
        setSelectedPackage(pkg);

        setFormData({
            name: pkg.name || "",
            description: pkg.description || "",
            imageUrl: pkg.imageUrl || "",
            duration: pkg.duration || { days: "", nights: "" },
            price: pkg.price || "",
            type: pkg.type || "",
            places_to_visit: pkg.places_to_visit || [],
            itinerary: pkg.itinerary.length > 0 ? pkg.itinerary : [
                { day: 1, title: "", activities: [] }
            ],
        });

        setEditShowModal(true);
    };

    const confirmDelete = (packageId) => {
        setSelectedPackage(packageId);
        setShowDeleteModal(true);
    };
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    // Handle deletion after confirmation
    const deletePackage = async () => {
        if (!selectedPackage) return;

        try {
            await axios.delete(`http://localhost:6400/api/packages/${selectedPackage}`);

            // Update state to remove deleted package
            setPackages((prevPackages) => prevPackages.filter(pkg => pkg._id !== selectedPackage));
        } catch (err) {
            console.error("Error deleting package:", err);
        } finally {
            setShowDeleteModal(false);
            setSelectedPackage(null);
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

                            <div key={pkg.id} className=" relative bg-white rounded-2xl w-72 p-3 gap-y-10">
                                <img
                                    src={pkg.imageUrl}
                                    alt={pkg.name}
                                    className="w-72 h-64 object-cover rounded-2xl"
                                />
                                <div onClick={() => confirmDelete(pkg._id)} className="absolute top-3 m-3 py-2 right-3 bg-white text-red-500 text-xs px-3  rounded-full cursor-pointer shadow-md transition duration-200"><FiTrash2 className="w-5 h-5 " /></div>
                                <div className="p-4 flex flex-col items-center text-center">
                                    <h2 className="text-lg font-base text-gray-800">{pkg.name}</h2>
                                    <button onClick={() => handleEditPackage(pkg)} className="mt-3  bg-black text-white px-3 py-1 rounded-lg cursor-pointer text-sm">
                                        View package details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Confirmation Modal */}
            {showDeleteModal && (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-90 flex justify-center z-50">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold text-gray-800 text-center">Confirm Deletion</h2>
            <p className="text-gray-600 text-center mt-2">Are you sure you want to delete this package?</p>
            
            <div className="flex justify-center gap-4 mt-4">
                <button 
                    onClick={deletePackage} 
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

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 lg:p-10 relative max-w-6xl w-full max-h-[95vh] overflow-y-auto">
                        <div className="flex flex-col">

                            {/* Image Upload - Top Left */}
                            <div className="flex justify-start mb-4">
                                <div className="w-36 h-36 bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center relative rounded-md">
                                    {image ? (
                                        <img src={imageprev} alt="Uploaded" className="w-full h-full object-cover rounded-md" />
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
                                    name="name"
                                    placeholder="Enter package name"
                                    value={formData.name}
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
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="bg-gray-100 p-2 rounded col-span-2 w-full"
                                >
                                    <option value="" className="text-gray-100">Select Package</option>
                                    <option>Romantic and Relaxation</option>
                                    <option>Adventure and Wildlife</option>
                                    <option>Educational and Cultural</option>
                                </select>

                                <label className="text-black">Sites</label>
                                <div className="flex items-center gap-2 mt-2">
                                    <input
                                        type="text"
                                        name="newSite"
                                        placeholder="Enter a site"
                                        value={newSite}
                                        onChange={(e) => setNewSite(e.target.value)}
                                        className="bg-gray-100 p-2 rounded w-full"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddSite}
                                        className="border p-2 rounded-full bg-gray-500 text-white cursor-pointer w-10 h-10 flex items-center justify-center"
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Display added sites as tags */}
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {formData.places_to_visit.map((site, index) => (
                                        <div key={index} className="flex items-center bg-gray-300 px-3 py-1 rounded-full">
                                            <span className="text-black">{site}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveSite(site)}
                                                className="ml-2 text-red-600 font-bold cursor-pointer"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <label className="text-black col-span-1">Duration</label>
                                <div className="flex space-x-2 col-span-2">
                                    <input
                                        type="number"
                                        name="days"
                                        placeholder="Days"
                                        value={formData.duration.days || ""}
                                        onChange={handleChange}
                                        className="bg-gray-100 p-2 rounded w-full"
                                    />
                                    <input
                                        type="number"
                                        name="nights"
                                        placeholder="Nights"
                                        value={formData.duration.nights || ""}
                                        onChange={handleChange}
                                        className="bg-gray-100 p-2 rounded w-full"
                                    />
                                </div>

                                <label className="text-black col-span-1">Standard Price</label>
                                <input
                                    type="text"
                                    name="price"
                                    placeholder="$190.00"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="bg-gray-100 p-2 rounded col-span-2 w-full"

                                />
                            </div>


                            <div className="grid grid-cols-3 gap-3 items-center">
                                <h2 className="text-lg font-bold col-span-3">Itinerary</h2>

                                {formData.itinerary.map((day, index) => (
                                    <div key={index} className="col-span-3 p-4 rounded-lg shadow-md grid grid-cols-3 gap-3">
                                        <label className="text-black col-span-1">Day {day.day}</label>
                                        <input
                                            type="text"
                                            placeholder="Title"
                                            value={day.title}
                                            onChange={(e) => handleItineraryChange(index, "title", e.target.value)}
                                            className="bg-gray-100 p-2 rounded col-span-2 w-full"
                                        />


                                        {day.activities.map((activity, activityIndex) => (

                                            <div key={activityIndex} className="relative col-span-3 flex justify-end items-center gap-2">
                                                <h4 className="text-black w-5/10">Activities {activityIndex + 1}</h4>
                                                <input
                                                    type="text"
                                                    placeholder={activityIndex + 1}
                                                    value={activity}
                                                    onChange={(e) => handleActivityChange(index, activityIndex, e.target.value)}
                                                    className="w-full p-2 bg-gray-100 rounded flex-grow"
                                                />
                                                <button
                                                    className="absolute right-2 mt-1 text-black px-2 py-1 rounded"
                                                    onClick={() => removeActivity(index, activityIndex)}
                                                >
                                                    X
                                                </button>
                                            </div>
                                        ))}
                                        <div className="col-span-2"></div>
                                        <div className="flex justify-end">
                                            <button
                                                className="px-3 mx-4 py-1 bg-black text-white rounded-3xl cursor-pointer"
                                                onClick={() => addActivity(index)}
                                            >
                                                Add Activity
                                            </button>

                                            <button
                                                className="px-2 py-1 bg-black text-white rounded-3xl cursor-pointer"
                                                onClick={() => removeItineraryDay(index)}
                                            >
                                                Remove Day
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <div className="flex ">
                                    <div>
                                        <button
                                            className="px-2 py-1 bg-black text-white rounded-3xl cursor-pointer"
                                            onClick={addItineraryDay}
                                        >
                                            Add New Day
                                        </button>
                                    </div>
                                </div>
                            </div>


                        </div>
                        {/* Buttons - Bottom Right */}
                        <div className="flex justify-end gap-4 mt-6">
                            <button onClick={() => setShowModal(false)} className="px-2 py-1 border rounded-3xl cursor-pointer">Cancel</button>
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className={`px-2 py-1 text-white rounded-3xl cursor-pointer ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-black'}`}
                                disabled={loading}
                            >
                                {loading ? 'Saving...' : 'Save changes'}
                            </button>
                        </div>

                    </div>
                </div>

            )}

            {/* package details  */}
            {showeditModal && selectedPackage && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 lg:p-10 relative max-w-6xl w-full max-h-[95vh] overflow-y-auto">
                        <div className="flex flex-col">

                            {/* Image Upload - Top Left */}
                            <div className="flex justify-start m-4">
                                <div className="w-36 h-36 bg-gray-200 border-2  border-gray-400 flex items-center justify-center relative rounded-md">
                                    <div className="flex justify-start mb-4">
                                        <div className="w-36 h-36 bg-gray-200 border-2 mt-3 border-dashed border-gray-400 flex items-center justify-center relative rounded-md">
                                            <label className="w-full h-full flex items-center justify-center cursor-pointer">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={handleImageUpload}
                                                />
                                                {(imageprev || formData.imageUrl) ? (
                                                    <img
                                                        src={imageprev || formData.imageUrl}
                                                        alt="Uploaded"
                                                        className="w-full h-full object-cover rounded-md"
                                                    />
                                                ) : (
                                                    <FaCamera className="text-gray-500 text-xl" />
                                                )}
                                            </label>
                                        </div>
                                    </div>

                                </div>

                            </div>

                            <div className="grid grid-cols-3 gap-3 items-center">
                                <label className="text-black col-span-1">Package Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter package name"
                                    value={formData.name}
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
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="bg-gray-100 p-2 rounded col-span-2 w-full"
                                >
                                    <option value="" className="text-gray-100">Select Package</option>
                                    <option>Romantic and Relaxation</option>
                                    <option>Adventure and Wildlife</option>
                                    <option>Educational and Cultural</option>
                                </select>

                                <label className="text-black">Sites</label>
                                <div className="flex items-center gap-2 mt-2">
                                    <input
                                        type="text"
                                        name="newSite"
                                        placeholder="Enter a site"
                                        value={newSite}
                                        onChange={(e) => setNewSite(e.target.value)}
                                        className="bg-gray-100 p-2 rounded w-full"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddSite}
                                        className="border p-2 rounded-full bg-gray-500 text-white cursor-pointer w-10 h-10 flex items-center justify-center"
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Display added sites as tags */}
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {formData.places_to_visit.map((site, index) => (
                                        <div key={index} className="flex items-center bg-gray-300 px-3 py-1 rounded-full">
                                            <span className="text-black">{site}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveSite(site)}
                                                className="ml-2 text-red-600 font-bold cursor-pointer"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <label className="text-black col-span-1">Duration</label>
                                <div className="flex space-x-2 col-span-2">
                                    <input
                                        type="number"
                                        name="days"
                                        placeholder="Days"
                                        value={formData.duration.days || ""}
                                        onChange={handleChange}
                                        className="bg-gray-100 p-2 rounded w-full"
                                    />
                                    <input
                                        type="number"
                                        name="nights"
                                        placeholder="Nights"
                                        value={formData.duration.nights || ""}
                                        onChange={handleChange}
                                        className="bg-gray-100 p-2 rounded w-full"
                                    />
                                </div>

                                <label className="text-black col-span-1">Standard Price</label>
                                <input
                                    type="text"
                                    name="price"
                                    placeholder="$190.00"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="bg-gray-100 p-2 rounded col-span-2 w-full"

                                />
                            </div>


                            <div className="grid grid-cols-3 gap-3 items-center">
                                <h2 className="text-lg font-bold col-span-3">Itinerary</h2>

                                {formData.itinerary.map((day, index) => (
                                    <div key={index} className="col-span-3 p-4 rounded-lg shadow-md grid grid-cols-3 gap-3">
                                        <label className="text-black col-span-1">Day {day.day}</label>
                                        <input
                                            type="text"
                                            placeholder="Title"
                                            value={day.title}
                                            onChange={(e) => handleItineraryChange(index, "title", e.target.value)}
                                            className="bg-gray-100 p-2 rounded col-span-2 w-full"
                                        />


                                        {day.activities.map((activity, activityIndex) => (

                                            <div key={activityIndex} className="relative col-span-3 flex justify-end items-center gap-2">
                                                <h4 className="text-black w-5/10">Activities {activityIndex + 1}</h4>
                                                <input
                                                    type="text"
                                                    placeholder={activityIndex + 1}
                                                    value={activity}
                                                    onChange={(e) => handleActivityChange(index, activityIndex, e.target.value)}
                                                    className="w-full p-2 bg-gray-100 rounded flex-grow"
                                                />
                                                <button
                                                    className="absolute right-2 mt-1 text-black px-2 py-1 rounded"
                                                    onClick={() => removeActivity(index, activityIndex)}
                                                >
                                                    X
                                                </button>
                                            </div>
                                        ))}
                                        <div className="col-span-2"></div>
                                        <div className="flex justify-end">
                                            <button
                                                className="px-3 mx-4 py-1 bg-black text-white rounded-3xl cursor-pointer"
                                                onClick={() => addActivity(index)}
                                            >
                                                Add Activity
                                            </button>

                                            <button
                                                className="px-2 py-1 bg-black text-white rounded-3xl cursor-pointer"
                                                onClick={() => removeItineraryDay(index)}
                                            >
                                                Remove Day
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <div className="flex ">
                                    <div>
                                        <button
                                            className="px-2 py-1 bg-black text-white rounded-3xl cursor-pointer"
                                            onClick={addItineraryDay}
                                        >
                                            Add New Day
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Buttons - Bottom Right */}
                        <div className="flex justify-end gap-4 mt-6">
                            <button onClick={() => setEditShowModal(false)} className="px-2 py-1 border rounded-3xl cursor-pointer">Cancel</button>
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className={`px-2 py-1 text-white rounded-3xl cursor-pointer ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-black'}`}
                                disabled={loading}
                            >
                                {loading ? 'Saving...' : 'Save changes'}
                            </button>
                        </div>

                    </div>

                </div>

            )}
        </div>
    );
};

export default PackageManagement;
