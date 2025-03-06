import FavoritePackage from "../Model/FavouritePackage.js";
import Package from "../Model/Packages.js";

// Add a package to favorites
export const addFavorite = async (req, res) => {
  try {
    const { userId, packageId } = req.body;

    // Check if already favorited
    const existingFavorite = await FavoritePackage.findOne({ userId, packageId });
    if (existingFavorite) {
      return res.status(400).json({ message: "Package is already in favorites" });
    }

    const favorite = new FavoritePackage({ userId, packageId });
    await favorite.save();

    res.status(201).json({ message: "Added to favorites", favorite });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get user's favorite packages
export const getFavorites = async (req, res) => {
  try {
    const { userId } = req.params;
    const favorites = await FavoritePackage.find({ userId }).populate("packageId");

    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Remove a package from favorites
export const removeFavorite = async (req, res) => {
  try {
    const { userId, packageId } = req.body;
    await FavoritePackage.findOneAndDelete({ userId, packageId });

    res.status(200).json({ message: "Removed from favorites" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
