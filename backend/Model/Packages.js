import mongoose from "mongoose";

const { Schema, model } = mongoose;
/*
const AccommodationSchema = new Schema({
  accommodationType: {
    type: String,
    required: true,
    enum: ["LUXURY", "PREMIUM", "DELUXE", "STANDARD", "DEFAULT"],
    default: "DEFAULT",
  },
  price: { type: Number, required: true },
});

const MealsSchema = new Schema({
  mealsType: {
    type: String,
    required: true,
    enum: ["Non-Veg", "Vegan", "Veg", "Veg & Non-Veg", "DEFAULT"],
    default: "DEFAULT",
  },
  price: { type: Number, required: true },
});

const ActivitiesSchema = new Schema({
  activityName: { type: String, required: true },
  price: { type: Number, required: true },
});

const CustomServicesSchema = new Schema({
  accommodation: AccommodationSchema,
  meals: MealsSchema,
  activities: [ActivitiesSchema],
  note: { type: String },
});

*/


// Itinerary Subschema
const ItinerarySchema = new Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  places: [{ type: String, required: true }],
  activities: {
    morning: { type: String, required: true },
    afternoon: { type: String, required: false },
    evening: { type: String, required: false },
    overnight: { type: String, required: false }
  }
});

// Tour Package Schema
const PackageSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: false },  
  duration: {
    days: { type: Number, required: true },
    nights: { type: Number, required: true }
  },
  price: { type: Number, required: true }, 
  type: { 
    type: String, 
    required: true, 
    enum: ["Romantic and Relaxation", "Adventure and Wildlife", "Educational and Cultural", "Other"] 
  },
  places_to_visit: [{ type: String }], 
  itinerary: [ItinerarySchema]  // Using the itinerary subschema
});

export default model("Package", PackageSchema);