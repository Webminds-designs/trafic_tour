import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { MdCheckCircle, MdCancel } from "react-icons/md";

const bookings = [
    {
        id: 1,
        image: "https://via.placeholder.com/40",
        packageName: "Yala Safari Expedition",
        category: "Adventure",
        paymentStatus: "Paid",
        guest: "Pete Deemer",
        date: "Feb 28 - Feb 30",
    },
    {
        id: 2,
        image: "https://via.placeholder.com/40",
        packageName: "Yala Safari Expedition",
        category: "Adventure",
        paymentStatus: "Failed",
        guest: "Pete Deemer",
        date: "Feb 28 - Feb 30",
    },
    {
        id: 3,
        image: "https://via.placeholder.com/40",
        packageName: "Ella Rock Hiking Tour",
        category: "Hiking",
        paymentStatus: "Paid",
        guest: "Maria Gonzales",
        date: "Mar 12 - Mar 14",
    },
];

const BookingManagement = () => {
    const navigate = useNavigate();

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
                            {bookings.map((booking) => (
                                <tr
                                    key={booking.id}
                                    className="cursor-pointer hover:bg-gray-100"
                                    onClick={() => navigate(`/bookings/${booking.id}`)}
                                >
                                    <td className="flex items-center py-2 px-4">
                                        <img
                                            src={booking.image}
                                            alt="Package"
                                            className="w-8 h-8 rounded-full mr-4"
                                        />
                                        {booking.packageName}
                                    </td>
                                    <td className="py-2 px-4">{booking.category}</td>
                                    <td className="py-2 px-4 flex items-center justify-center space-x-2">
                                        {booking.paymentStatus === "Paid" ? (
                                            <MdCheckCircle className="text-[#009990]" />
                                        ) : (
                                            <MdCancel className="text-red-900" />
                                        )}
                                        <span>{booking.paymentStatus}</span>
                                    </td>
                                    <td className="py-2 px-4">{booking.guest}</td>
                                    <td className="py-2 px-4">{booking.date}</td>
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
