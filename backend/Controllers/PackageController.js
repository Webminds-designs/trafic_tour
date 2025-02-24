import Package from "../Model/Packages.js";
import cloudinary from "../config/CloudinaryConfig.js";

//test package
export const testPackage = async (req, res) => {
  try {
    res.status(200).json({ message: "Package controller works" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
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

    if (
      !title ||
      !subtitle ||
      !category ||
      !durationNight ||
      !durationDay ||
      !description ||
      !price ||
      !includes
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled." });
    }

    // Cloudinary
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        imageUrls.push(result.secure_url);
      }
    }

    const customServices = {
      accommodation: accommodation || null,
      meals: meals || null,
      activities: activities || [],
      note: note || null,
    };

    const newPackage = new Package({
      title,
      subtitle,
      category,
      durationNight,
      durationDay,
      images: imageUrls.length > 0 ? imageUrls : images,
      description,
      price,
      includes,
      customServices,
    });

    await newPackage.save();
    res
      .status(201)
      .json({ message: "Package created successfully", package: newPackage });
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
    if (!packageData) {
      return res.status(404).json({ message: "Package not found" });
    }
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

    const customServices = {
      accommodation: accommodation || null,
      meals: meals || null,
      activities: activities || [],
      note: note || null,
    };

    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        imageUrls.push(result.secure_url);
      }
    }

    const updatedImages = imageUrls.length > 0 ? imageUrls : images;

    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      {
        title,
        subtitle,
        category,
        durationNight,
        durationDay,
        images: updatedImages,
        description,
        price,
        includes,
        customServices,
      },
      { new: true }
    );

    if (!updatedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.status(200).json({
      message: "Package updated successfully",
      package: updatedPackage,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete package
export const deletePackage = async (req, res) => {
  try {
    const deletedPackage = await Package.findByIdAndDelete(req.params.id);
    if (!deletedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
