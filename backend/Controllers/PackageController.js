import Package from "../Model/Packages.js";
import cloudinary from "../config/CloudinaryConfig.js";



// Helper function to upload images to Cloudinary
const uploadImages = async (files) => {
  const imageUrls = [];
  for (const file of files) {
    const result = await cloudinary.uploader.upload(file.path);
    imageUrls.push(result.secure_url);
  }
  return imageUrls;
};

// Create a package
export const createPackage = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      category,
      durationNight,
      durationDay,
      images,
      description,
      price,
      includes,
      accommodation,
      meals,
      activities,
      note,
    } = req.body;

    if (!title || !subtitle || !category || !durationNight || !durationDay || !description || !price || !includes) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    const imageUrls = req.files?.length ? await uploadImages(req.files) : images;

    const customServices = { accommodation, meals, activities: activities || [], note };

    const newPackage = new Package({
      title,
      subtitle,
      category,
      durationNight,
      durationDay,
      images: imageUrls,
      description,
      price,
      includes,
      customServices,
    });

    await newPackage.save();
    res.status(201).json({ message: "Package created successfully", package: newPackage });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all packages
export const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get package by ID
export const getPackageById = async (req, res) => {
  try {
    const packageData = await Package.findById(req.params.id);
    if (!packageData) return res.status(404).json({ message: "Package not found" });
    res.status(200).json(packageData);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update package
export const updatePackage = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      category,
      durationNight,
      durationDay,
      images,
      description,
      price,
      includes,
      accommodation,
      meals,
      activities,
      note,
    } = req.body;

    const customServices = { accommodation, meals, activities: activities || [], note };
    const imageUrls = req.files?.length ? await uploadImages(req.files) : images;

    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      { title, subtitle, category, durationNight, durationDay, images: imageUrls, description, price, includes, customServices },
      { new: true }
    );

    if (!updatedPackage) return res.status(404).json({ message: "Package not found" });
    res.status(200).json({ message: "Package updated successfully", package: updatedPackage });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete package
export const deletePackage = async (req, res) => {
  try {
    const deletedPackage = await Package.findByIdAndDelete(req.params.id);
    if (!deletedPackage) return res.status(404).json({ message: "Package not found" });
    res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
