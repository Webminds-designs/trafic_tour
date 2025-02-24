import Package from "../Model/Packages.js";
import cloudinary from "../config/CloudinaryConfig.js";

// Create a package
export const createPackage = async (req, res) => {
    try {
        const { 
            title, 
            category,
            duration, 
            images, 
            description, 
            basePrice, 
            includes, 
            accommodations, 
            mealPreferences, 
            activities 
        } = req.body;

        if (!title || !category || !duration || !description || !basePrice || !includes) {
            return res.status(400).json({ message: "All required fields must be filled." });
        }

        // Cloudinary
        let imageUrls = [];
        if (req.files && req.files.length > 0) {
            // Loop through the uploaded images 
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path);
                imageUrls.push(result.secure_url); 
            }
        }

        // Create customServices object if provided
        const customServices = accommodations || mealPreferences || activities ? {
            accommodations: accommodations || [],
            mealPreferences: mealPreferences || [],
            activities: activities || []
        } : undefined;

        const newPackage = new Package({
            title,
            category,
            duration,
            images: imageUrls.length > 0 ? imageUrls : images, 
            description,
            basePrice,
            includes,
            customServices // Assign custom services
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
            category, 
            duration, 
            images, 
            description, 
            basePrice, 
            includes, 
            accommodations, 
            mealPreferences, 
            activities 
        } = req.body;

        // Handling custom services
        const customServices = accommodations || mealPreferences || activities ? {
            accommodations: accommodations || [],
            mealPreferences: mealPreferences || [],
            activities: activities || []
        } : undefined;

        // Cloudinary 
        let imageUrls = [];
        if (req.files && req.files.length > 0) {
            // Upload each image to Cloudinary
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path);
                imageUrls.push(result.secure_url);
            }
        }

        const updatedImages = imageUrls.length > 0 ? imageUrls : images;

        // Update the package
        const updatedPackage = await Package.findByIdAndUpdate(
            req.params.id, 
            {
                title,
                category,
                duration,
                images: updatedImages, // Use new or old images
                description,
                basePrice,
                includes,
                customServices
            }, 
            { new: true }
        );

        if (!updatedPackage) {
            return res.status(404).json({ message: "Package not found" });
        }

        res.status(200).json({ message: "Package updated successfully", package: updatedPackage });
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
