import Booking from "../Model/Booking.js";
import Package from "../Model/Packages.js";

export const createBooking = async (req, res) => {
  try {
    const { userId, packageId, guests, checkingDate, checkOutDate } = req.body;

    // Validate required fields
    if (!userId || !packageId || !guests || !checkingDate || !checkOutDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate package
    const packageData = await Package.findById(packageId);
    if (!packageData) return res.status(404).json({ message: "Package not found" });

    // Calculate total price
    const totalPrice = guests * packageData.price;

    const newBooking = new Booking({
      userId,
      packageId,
      guests,
      checkingDate,
      checkOutDate,
      totalPrice,
    });

    await newBooking.save();
    res.status(201).json({ message: "Booking successful", booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) return res.status(400).json({ message: "User ID is required" });

    const bookings = await Booking.find({ userId }).populate("packageId");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("userId packageId");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    if (!bookingId) return res.status(400).json({ message: "Booking ID is required" });

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.status === "Cancelled") {
      return res.status(400).json({ message: "Booking is already cancelled" });
    }

    booking.status = "Cancelled";
    await booking.save();
    res.status(200).json({ message: "Booking cancelled successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
