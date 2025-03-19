import FavoritePackage from "../Model/FavouritePackage.js";
import Package from "../Model/Packages.js";

// Add a package to favorites
export const addFavorite = async (req, res) => {
  try {
    const { userId, packageId } = req.body;
     console.log(req.body)
    // Validate userId and packageId
    if (!userId || !packageId) {
      return res.status(400).json({ message: "User ID and Package ID are required" });
    }

    // Check if the package is already in the user's favorites
    const existingFavorite = await FavoritePackage.findOne({ userId, packageId });
    if (existingFavorite) {
      return res.status(400).json({ message: "Package is already in favorites" });
    }

    // Create a new favorite
    const favorite = new FavoritePackage({ userId, packageId });
    await favorite.save();

    res.status(201).json({ message: "Added to favorites", favorite });
  } catch (error) {
    console.error("Error adding to favorites:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get user's favorite packages
export const getFavorites = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Get all favorite packages for the user
    const favorites = await FavoritePackage.find({ userId }).populate("packageId");

    // If no favorites are found
    if (favorites.length === 0) {
      return res.status(404).json({ message: "No favorite packages found" });
    }

    res.status(200).json(favorites);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ message: error.message });
  }
};

// Remove a package from favorites
export const removeFavorite = async (req, res) => {
  try {
    const { userId, packageId } = req.body;

    // Validate userId and packageId
    if (!userId || !packageId) {
      return res.status(400).json({ message: "User ID and Package ID are required" });
    }

    // Remove the package from favorites
    const favorite = await FavoritePackage.findOneAndDelete({ userId, packageId });

    if (!favorite) {
      return res.status(404).json({ message: "Favorite package not found" });
    }

    res.status(200).json({ message: "Removed from favorites" });
  } catch (error) {
    console.error("Error removing from favorites:", error);
    res.status(500).json({ message: error.message });
  }
};
