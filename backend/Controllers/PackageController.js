import Package from "../Model/Packages.js";
import cloudinary from "../config/CloudinaryConfig.js";

// Controller to create a new Package
export const createPackage = async (req, res) => {
  try {
    const { name, description, duration, places_to_visit, itinerary, price, type, status } = req.body;
    const { file } = req;

    console.log("Raw req.body:", req.body);

    // Parse JSON fields
    const parsedDuration = JSON.parse(duration);
    const parsedPlacesToVisit = JSON.parse(places_to_visit);
    const parsedItinerary = JSON.parse(itinerary);


    // Validate required fields
    if (!name || !description || !parsedDuration || !parsedPlacesToVisit || !parsedItinerary || !price || !type) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const parsedDays = Number(parsedDuration.days); 

   // Validate itinerary length
if (parsedDays !== parsedItinerary.length) {
  return res.status(400).json({
    message: `Number of days (${parsedDays}) must match the number of itineraries (${parsedItinerary.length}).`
  });
}

    let imageUrl = "";
    // Upload image to Cloudinary
    if (file) {
      const uploadedImage = await cloudinary.uploader.upload(file.path);
      imageUrl = uploadedImage.secure_url;
    }

    // Save the package
    const newPackage = new Package({
      name,
      description,
      duration: parsedDuration,
      places_to_visit: parsedPlacesToVisit,
      itinerary: parsedItinerary,
      price,
      type,
      status,
      imageUrl,
    });

    await newPackage.save();

    return res.status(201).json({
      message: "Tour package created successfully",
      tourPackage: newPackage,
    });
  } catch (error) {
    console.error("Error in createPackage:", error);
    return res.status(500).json({ message: "Error creating package", error: error.message });
  }
};

// Controller to get all Packages
export const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    return res.status(200).json({ message: "Packages retrieved successfully", packages });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving packages", error: error.message });
  }
};

// Controller to get a single Package by ID
export const getPackageById = async (req, res) => {
  try {
    const tourPackage = await Package.findById(req.params.id);
    if (!tourPackage) {
      return res.status(404).json({ message: "Package not found" });
    }
    return res.status(200).json({ message: "Package retrieved successfully", tourPackage });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving package", error: error.message });
  }
};

// Controller to update a Package by ID
export const updatePackage = async (req, res) => {
  try {
    const { name, description, duration, places_to_visit, itinerary, price, type, status ,oldimageUrl } = req.body;
    const { file } = req;

    let parsedDuration, parsedPlacesToVisit, parsedItinerary;
    if (duration) parsedDuration = JSON.parse(duration);
    if (places_to_visit) parsedPlacesToVisit = JSON.parse(places_to_visit);
    if (itinerary) parsedItinerary = JSON.parse(itinerary);

    // Validate itinerary length if both are present
    if (parsedDuration && parsedItinerary && parsedDuration.days !== parsedItinerary.length) {
      return res.status(400).json({
        message: `Number of days (${parsedDuration.days}) must match the number of itineraries (${parsedItinerary.length}).`
      });
    }

    let imageUrl = oldimageUrl;
    if (file) {
      const uploadedImage = await cloudinary.uploader.upload(file.path);
      imageUrl = uploadedImage.secure_url;
    }

    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      { name, description, duration: parsedDuration, places_to_visit: parsedPlacesToVisit, itinerary: parsedItinerary, price, type, status, imageUrl },
      { new: true }
    );

    if (!updatedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }
    return res.status(200).json({ message: "Package updated successfully", tourPackage: updatedPackage });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating package", error: error.message });
  }
};

// Controller to delete a Package by ID
export const deletePackage = async (req, res) => {
  try {
    const deletedPackage = await Package.findByIdAndDelete(req.params.id);
    if (!deletedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }
    return res.status(200).json({ message: "Package deleted successfully", tourPackage: deletedPackage });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting package", error: error.message });
  }
};

export const searchPackages = async (req, res) => {
  try {
    const { place, days, activity } = req.query;  // Extract place, days, and activity from the query parameters
    let filter = {};  // Initialize the filter object

    // Filter by places_to_visit (searching within the array of places)
    if (place && typeof place === "string") {
      filter.places_to_visit = { $regex: new RegExp(place, "i") };  // Case-insensitive regex search
      filter["itinerary.activities"] = { $regex: new RegExp(place, "i") };
      filter["itinerary.title"] = { $regex: new RegExp(place, "i") };
    }

    // Filter by duration days (±3 days range)
    if (days) {
      const numDays = Number(days);
      if (isNaN(numDays)) {
        return res.status(400).json({ message: "Invalid 'days' value" });
      }
      filter["duration.days"] = { $gte: numDays - 3, $lte: numDays + 3 };  // Search for packages within a ±3 days range of provided days
    }

    // Filter by itinerary activities (searching within the array of activities)
    if (activity && typeof activity === "string") {
      filter["itinerary.activities"] = { $regex: new RegExp(activity, "i") };  // Case-insensitive regex search within itinerary.activities
    }

    console.log("Filter being used:", filter);  // Log the filter object to inspect

    // Query the database with the constructed filter
    const packages = await Package.find(filter);  // Correct the variable name to 'packages'

    // Return the result
    return res.status(200).json({ message: "Packages retrieved successfully", packages });
  } catch (error) {
    console.error("Error in searchPackages:", error.stack);  // Log the stack trace
    return res.status(500).json({ message: "Error retrieving packages", error: error.message });
  }
};
