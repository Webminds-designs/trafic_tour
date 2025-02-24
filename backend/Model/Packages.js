import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Accommodation Types
const AccommodationSchema = new Schema({
  type: { type: String, required: true },
  price: { type: Number, required: true },
});

// Meal Preferences
const MealSchema = new Schema({
  type: { type: String, required: true },
  price: { type: Number, required: true },
});

// Activities
const ActivitySchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

// Custom Services
const CustomServicesSchema = new Schema({
  accommodations: [AccommodationSchema],
  mealPreferences: [MealSchema],
  activities: [ActivitySchema],
});

// Package Schema
const PackageSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  duration: {
    days: { type: Number, required: true },
    nights: { type: Number, required: true },
  },
  images: [String],
  description: { type: String, required: true },
  basePrice: { type: Number, required: true },
  includes:[String],
  customServices: CustomServicesSchema, // Added custom services 
});

export default model("Package", PackageSchema);
