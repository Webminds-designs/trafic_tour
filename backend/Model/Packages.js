// Activity Subschema
// const ActivitySchema = new Schema({
//   activity_name: { type: String, required: true }, // morning , overday
//   activity: { type: String, required: true },
// });

// Itinerary Subschema
// const ItinerarySchema = new Schema({
//   day: { type: Number, required: true },
//   title: { type: String, required: true },
//   places: [{ type: String, required: true }],
//   activities: [ActivitySchema],
// });

const IncludesSchema = new Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  activites: [{ type: String, required: true }],
});

// Tour Package Schema
const PackageSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: false },
  duration: {
    days: { type: Number, required: true },
    nights: { type: Number, required: true },
  },
  price: { type: Number, required: true },
  type: {
    type: String,
    required: true,
    enum: [
      "Romantic and Relaxation",
      "Adventure and Wildlife",
      "Educational and Cultural",
      "Other",
    ],
  },
  places_to_visit: [{ type: String }],
  // itinerary: [ItinerarySchema], // Using the itinerary subschema
  includes: [IncludesSchema],
});

// Create Models
const Activity = model("Activity", ActivitySchema);
const Package = model("Package", PackageSchema);

export { Activity, Package };
