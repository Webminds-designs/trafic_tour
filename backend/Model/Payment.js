import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["card", "bank_transfer"],
      required: true,
    },
    transactionId: {
      type: String,
      unique: true,
      required: true,
    },
    paymentReceiptUrl: {
      type: String,
      required: false, 
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  export default mongoose.model("Payment", paymentSchema);
  