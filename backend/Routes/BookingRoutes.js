import express from "express";
import {
  createBooking,
  getUserBookings,
  getAllBookings,
  cancelBooking,
} from "../Controllers/BookingController.js";

const router = express.Router();

// Create a new booking
router.post("/", createBooking);

// Get all bookings for a specific user
router.get("/user/:userId", getUserBookings);

// Get all bookings (admin access)
router.get("/", getAllBookings);

// Cancel a booking
router.put("/cancel/:bookingId", cancelBooking);

export default router;
