import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { MdArrowBackIos, MdCheckCircle, MdCancel } from "react-icons/md";
import { FaPhone, FaEnvelope } from "react-icons/fa";

const bookings = [
    {
        id: 1,
        image: "https://via.placeholder.com/40",
        packageName: "Yala Safari Expedition",
        category: "Adventure",
        paymentStatus: "Paid",
        guest: "Pete Deemer",
        date: "Feb 28 - Feb 30",
        totalAmount: "$198",
        bookingStatus: "Confirmed",
    },
    {
        id: 2,
        image: "https://via.placeholder.com/40",
        packageName: "Yala Safari Expedition",
        category: "Adventure",
        paymentStatus: "Failed",
        guest: "Pete Deemer",
        date: "Feb 28 - Feb 30",
        totalAmount: "$198",
        bookingStatus: "Pending",
    },
    {
        id: 3,
        image: "https://via.placeholder.com/40",
        packageName: "Ella Rock Hiking Tour",
        category: "Hiking",
        paymentStatus: "Paid",
        guest: "Maria Gonzales",
        date: "Mar 12 - Mar 14",
        totalAmount: "$250",
        bookingStatus: "Confirmed",
    },
];

const BookingDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const booking = bookings.find((b) => b.id === parseInt(id));

    if (!booking) {
        return <p className="text-center text-red-600">Booking not found</p>;
    }

    return (
        <div className="flex h-full bg-gray-200 font-figtree">
            <Sidebar />
            <div className="flex-1 p-12">
                <Topbar title="Booking Details" />

                <button
                    className="text-black flex items-center mb-5 cursor-pointer"
                    onClick={() => navigate("/bookings")}
                >
                    <MdArrowBackIos className="mr-2 font-bold" size={18} /> Back to Bookings
                </button>

                <div className="bg-white p-12 rounded-lg">
                    <img
                        src="/images/tour-image.jpg"
                        alt="Tour Package"
                        className="w-full h-64 object-cover rounded-lg mb-4"
                    />

                    <div className="grid grid-cols-3 gap-y-2 text-black">
                        <p className="font-semibold col-span-1">Package Name:</p>
                        <p className="col-span-2">{booking.packageName}</p>

                        <p className="font-semibold col-span-1">Category:</p>
                        <p className="col-span-2">{booking.category}</p>

                        <p className="font-semibold col-span-1">Payment Status:</p>
                        <div className="flex items-center space-x-2 col-span-2">
                            {booking.paymentStatus === "Paid" ? (
                                <MdCheckCircle className="text-[#009990]" />
                            ) : (
                                <MdCancel className="text-red-900" />
                            )}
                            <p>{booking.paymentStatus}</p>
                        </div>

                        <p className="font-semibold col-span-1">Guest:</p>
                        <p className="col-span-2">{booking.guest}</p>

                        <p className="font-semibold col-span-1">Date:</p>
                        <p className="col-span-2">{booking.date}</p>

                        <p className="font-semibold col-span-1">Total Amount:</p>
                        <p className="col-span-2">{booking.totalAmount}</p>

                        <p className="font-semibold col-span-1">Booking Status:</p>
                        <p className="text-[#009990] font-semibold col-span-2">{booking.bookingStatus}</p>
                    </div>


                    <div className="flex justify-end space-x-4 mt-6 items-center">
                        <span className="text-black">Contact customer</span>

                        <button className="flex items-center space-x-2 text-black cursor-pointer p-1 rounded">
                            <FaPhone size={16} />
                        </button>

                        <button className="flex items-center space-x-2 text-black cursor-pointer p-1 rounded">
                            <FaEnvelope size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingDetails;
