import { useState, useEffect, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import PackageCard from "../components/PackageCard";
import { BiSolidPackage } from "react-icons/bi";
import axios from "axios";
import { FaCamera } from "react-icons/fa";



const PackageManagement = () => {
    const [showModal, setShowModal] = useState(false);
    const [image, setImage] = useState(null);
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
            setImageprev(imagePrev);
            setImage(file);  // Store the actual file
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

        // Trim spaces and validate required fields
        if (!formData.name.trim() || !formData.description.trim() || !formData.type.trim()) {
            alert("Name, Description, and Type are required.");
            return;
        }

        if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
            alert("Please enter a valid positive price.");
            return;
        }

        if (!formData.duration.days || !formData.duration.nights || isNaN(formData.duration.days) || isNaN(formData.duration.nights)) {
            alert("Please enter valid duration days and nights.");
            return;
        }

        if (!formData.places_to_visit.length) {
            alert("Please add at least one place to visit.");
            return;
        }

        if (!formData.itinerary.length || !formData.itinerary[0].title.trim()) {
            alert("Please provide a valid itinerary.");
            return;
        }

        try {
            // Create FormData object
            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            formDataToSend.append("description", formData.description);
            formDataToSend.append("price", formData.price);
            formDataToSend.append("type", formData.type);
            formDataToSend.append("duration", JSON.stringify(formData.duration));
            formDataToSend.append("places_to_visit", JSON.stringify(formData.places_to_visit));
            formDataToSend.append("itinerary", JSON.stringify(formData.itinerary));

            // Log the FormData entries for debugging
            console.log("FormData Before Sending:");
            for (let pair of formDataToSend.entries()) {
                console.log(`${pair[0]}:`, pair[1]);
            }

            // Handle image if exists
            if (image) {
                console.log("Adding Image File:", image);
                formDataToSend.append("image", image);
            } else {
                alert("Please provide a Image.");
                return;
            }

            // Send FormData to the backend
            const response = await axios.post("http://localhost:6400/api/packages", formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            console.log("Package created:", response.data);
            alert("Package added successfully!");

            // Reset form fields after successful submission
            setFormData({
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

            setImage(null);
        } catch (error) {
            console.error("Error adding package:", error);

            if (error.response) {
                console.error("Server Response:", error.response.data);
                alert(`Failed to add package: ${error.response.data.error || "Unknown error"}`);
            } else {
                alert("Failed to add package. Please try again.");
            }
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
                            <PackageCard key={pkg.id} image={pkg.imageUrl} name={pkg.name} />
                        ))}
                    </div>
                </div>
            </div>

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
                            <button type="submit" onClick={handleSubmit} className="px-2 py-1 bg-black text-white rounded-3xl cursor-pointer">Save changes</button>
                        </div>
                    </div>

                </div>


            )}
        </div>
    );
};

export default PackageManagement;
