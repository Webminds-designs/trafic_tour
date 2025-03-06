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
    afternoon: { type: String, required: true },
    evening: { type: String, required: true },
    overnight: { type: String, required: true }
  }
});

// Tour Package Schema
const PackageSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },  
  duration: {
    days: { type: Number, required: true },
    nights: { type: Number, required: true }
  },
  places_to_visit: [{ type: String }], 
  itinerary: [ItinerarySchema]  // Using the itinerary subschema
});

export default model("Package", PackageSchema);

