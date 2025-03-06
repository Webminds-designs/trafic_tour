import express from "express";
import { addFavorite, getFavorites, removeFavorite } from "../Controllers/FavioritePackageController.js";

const router = express.Router();

router.post("/add", addFavorite);     
router.get("/:userId", getFavorites);   
router.delete("/remove", removeFavorite); 

export default router;
