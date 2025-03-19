import mongoose from "mongoose";

const emailSchema = new mongoose.Schema(
  {
    from: { type: String, required: true },
    to: { type: String, required: true },
    subject: { type: String, required: true },
    text: { type: String, required: true },
    status: { type: String, enum: ["sent", "failed"], required: true },
    errorMessage: { type: String, default: null },
    reply: {
      text: { type: String, default: null },
      date: { type: Date, default: null },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Email", emailSchema);
