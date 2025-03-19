import Payment from "../Model/Payment.js";
import cloudinary from "cloudinary";

// Create a new payment
export const createPayment = async (req, res) => {
    try {
      const { userId, packageId, amount, paymentMethod, transactionId ,status } = req.body;
      let paymentReceiptUrl = null;
  
      // Check if payment method is bank transfer and a receipt file is provided
      if (paymentMethod === "bank_transfer") {
        if (!req.file) {
          return res.status(400).json({ message: "Receipt image is required for bank transfer payments" });
        }
  
        // Upload the receipt image to Cloudinary
        const receiptImage = req.file;
        const uploadedImage = await cloudinary.uploader.upload(receiptImage.path);
  
        paymentReceiptUrl = uploadedImage.secure_url; // Store the Cloudinary URL
      }
  
      const newPayment = new Payment({
        userId,
        packageId,
        amount,
        paymentMethod,
        transactionId,
        status,
        paymentReceiptUrl,
      });
  
      await newPayment.save();
      res.status(201).json({ message: "Payment created successfully", newPayment });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Get all payments
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate("userId packageId");
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single payment by ID
export const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate("userId packageId");
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update payment status
export const updatePaymentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const payment = await Payment.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (!payment) return res.status(404).json({ message: "Payment not found" });

    res.status(200).json({ message: "Payment status updated", payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
