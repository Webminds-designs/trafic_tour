import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import axios from "axios";

const BookingManagement = () => {
    const navigate = useNavigate();
    const [booking, setBooking] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get("http://localhost:6400/api/bookings");
                setBooking(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);
console.log(booking);
    //date 
    const formatDate = (isoDate) => {
        if (!isoDate) return "N/A"; // Handle missing or invalid dates
        const date = new Date(isoDate);
        return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
    };
    return (
        <div className="flex h-full bg-gray-200 font-figtree">
            <Sidebar />
            <div className="flex-1 p-6">
                <Topbar title="Booking Management" />

                <div className="bg-white rounded-lg mt-4">
                    <table className="min-w-full text-center bg-white rounded-lg">
                        <thead>
                            <tr>
                                <th className="py-5 px-4">Package Name</th>
                                <th className="py-4 px-4">Category</th>
                                <th className="py-4 px-4">Payment Status</th>
                                <th className="py-4 px-4">Guest</th>
                                <th className="py-4 px-4">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {booking.map((booking) => (
                                <tr
                                    key={booking.id}
                                    className="cursor-pointer hover:bg-gray-100"
                                    onClick={() => navigate(`/bookings/${booking._id}`, { state: { booking } })}
                                >
                                    <td className="flex items-center py-2 px-4">
                                        <img
                                            src={booking.packageId.imageUrl}
                                            alt="Package"
                                            className="w-8 h-8 rounded-full mr-4"
                                        />
                                        {booking.packageId.name}
                                    </td>
                                    <td className="py-2 px-4">{booking.packageId.type}</td>
                                    <td className="py-2 px-4 flex items-center justify-center space-x-2">
                                        {booking.paymentStatus === "Paid" ? (
                                            <MdCheckCircle className="text-[#009990]" />
                                        ) : (
                                            <MdCancel className="text-red-900" />
                                        )}
                                        <span>{booking.paymentStatus}</span>
                                    </td>
                                    <td className="py-2 px-4">{booking.billingDetails.firstName}</td>
                                    <td className="py-2 px-4">{formatDate(booking.checkingDate)}-{formatDate(booking.checkOutDate)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BookingManagement;