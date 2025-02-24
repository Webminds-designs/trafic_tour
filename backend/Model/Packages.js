import mongoose from "mongoose";

const { Schema, model } = mongoose;

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

const PackageSchema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  category: { type: String, required: true },
  durationNight: { type: Number, required: true },
  durationDay: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  includes: [String],
  images: [String],
  customServices: CustomServicesSchema,
});

export default model("Package", PackageSchema);
