import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import connectDB from "./config/dbConfig.js";
import userRoutes from "./Routes/UserRoutes.js"
import packageRoutes from "./Routes/PackageRoutes.js";
import favoritePackageRoutes from "./Routes/FavoritePackagesRoutes.js"
import bookingRoutes from "./Routes/BookingRoutes.js"
import paymentRoutes from "./Routes/PaymentRoutes.js"
import payhereRoutes from "./Routes/PayhereRoutes.js"
import inquiriesRoutes from "./Routes/InquiriesRoutes.js"

dotenv.config(); // Load environment variables

// Get the port from .env or default to 5000
const PORT = process.env.PORT || 5000;

connectDB(); // Connect to the database

const app = express();


// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ["http://localhost:5173" ,"http://localhost:5174","http://localhost:5175"],
  credentials: true, 
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));



app.use('/api/user', userRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/favorites", favoritePackageRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments",paymentRoutes);
app.use("/api/payhere", payhereRoutes);
app.use("/api/send-email", inquiriesRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});