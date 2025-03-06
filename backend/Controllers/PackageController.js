import Package from '../Model/Packages.js';
import cloudinary from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

// Controller to create a new Package
export const createPackage = async (req, res) => {
  try {
    const { name, description, duration, places_to_visit, itinerary } = req.body;
    const { file } = req;

    // Validate that the number of days matches the number of itineraries
    if (duration.days !== itinerary.length) {
      return res.status(400).json({
        message: `Number of days (${duration.days}) must match the number of itineraries (${itinerary.length}).`
      });
    }

    let imageUrl = null;

    // image upload it to Cloudinary
    if (file) {
      const uploadedImage = await cloudinary.v2.uploader.upload(file.path);
      imageUrl = uploadedImage.secure_url; // Store Cloudinary URL
    }

    // Create a new Package instance
    const newPackage = new Package({
      name,
      description,
      duration,
      places_to_visit,
      itinerary,
      imageUrl 
    });

    // Save the new package
    await newPackage.save();

    // Send response
    return res.status(201).json({
      message: 'Tour package created successfully',
      tourPackage: newPackage
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error creating package',
      error: error.message
    });
  }
};

// Controller to get all Packages
export const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();

    // If no packages are found
    if (packages.length === 0) {
      return res.status(404).json({
        message: 'No packages found'
      });
    }

    return res.status(200).json({
      message: 'Packages retrieved successfully',
      packages
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error retrieving packages',
      error: error.message
    });
  }
};

// Controller to get a single Package by ID
export const getPackageById = async (req, res) => {
  const { id } = req.params;

  try {
    const tourPackage = await Package.findById(id);

    // If package not found
    if (!tourPackage) {
      return res.status(404).json({
        message: `Package with ID ${id} not found`
      });
    }

    return res.status(200).json({
      message: 'Package retrieved successfully',
      tourPackage // Renamed here as well
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error retrieving package',
      error: error.message
    });
  }
};

// Controller to update a Package by ID
export const updatePackage = async (req, res) => {
  const { id } = req.params;
  const { name, description, duration, places_to_visit, itinerary } = req.body;
  const { file } = req;

  try {
    // Validate that the number of days matches the number of itineraries
    if (duration.days !== itinerary.length) {
      return res.status(400).json({
        message: `Number of days (${duration.days}) must match the number of itineraries (${itinerary.length}).`
      });
    }

    let imageUrl = null;

    // If file is provided (image for the package), upload it to Cloudinary
    if (file) {
      const uploadedImage = await cloudinary.v2.uploader.upload(file.path);
      imageUrl = uploadedImage.secure_url; // Store Cloudinary URL
    }

    const updatedPackage = await Package.findByIdAndUpdate(
      id,
      { name, description, duration, places_to_visit, itinerary, imageUrl },
      { new: true }
    );

    // If package not found
    if (!updatedPackage) {
      return res.status(404).json({
        message: `Package with ID ${id} not found`
      });
    }

    return res.status(200).json({
      message: 'Package updated successfully',
      tourPackage: updatedPackage // Renamed here as well
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error updating package',
      error: error.message
    });
  }
};

// Controller to delete a Package by ID
export const deletePackage = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPackage = await Package.findByIdAndDelete(id);

    // If package not found
    if (!deletedPackage) {
      return res.status(404).json({
        message: `Package with ID ${id} not found`
      });
    }

    return res.status(200).json({
      message: 'Package deleted successfully',
      tourPackage: deletedPackage // Renamed here as well
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error deleting package',
      error: error.message
    });
  }
};
