import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import { MdArrowBackIos, MdCheckCircle, MdCancel } from "react-icons/md";

const BookingManagement = () => {
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        {
            id: 4,
            image: "https://via.placeholder.com/40",
            packageName: "Mirissa Whale Watching",
            category: "Wildlife",
            paymentStatus: "Pending",
            guest: "John Smith",
            date: "Apr 5 - Apr 6",
        },
        {
            id: 5,
            image: "https://via.placeholder.com/40",
            packageName: "Sigiriya Rock Fortress Tour",
            category: "Historical",
            paymentStatus: "Failed",
            guest: "Aisha Patel",
            date: "May 20 - May 22",
        }
    ];


    const handleRowClick = (booking) => {
        setSelectedBooking(booking);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedBooking(null);
    };

    return (
        <div className="flex h-full bg-gray-200 font-figtree">
            <Sidebar />
            <div className="flex-1 p-6">
                <Topbar title="Booking Management" />

                <div className="bg-white rounded-lg mt-4">
                    <table className="min-w-full text-center bg-white rounded-lg">
                        <thead>
                            <tr className="p-6">
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
                                    className={`${selectedBooking && selectedBooking.id === booking.id
                                        ? "bg-gray-100"
                                        : ""
                                        } cursor-pointer hover:bg-gray-100`}
                                    onClick={() => handleRowClick(booking)}
                                >
                                    <td className="flex items-center py-2 px-4">
                                        <img
                                            src={booking.image}
                                            alt="Package"
                                            className="w-8 h-8 rounded-full mr-10"
                                        />
                                        {booking.packageName}
                                    </td>
                                    <td className="py-2 px-4">{booking.category}</td>
                                    {/* Payment Status with Icons */}
                                    <td className="py-2 px-4 flex items-center justify-center space-x-2">
                                        {booking.paymentStatus === "Paid" ? (
                                            <MdCheckCircle className="text-[#009990] text-sm" />
                                        ) : (
                                            <MdCancel className="text-red-900 text-sm" />
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

            {/* Booking Details Modal */}
            {isModalOpen && selectedBooking && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-50">
                    <div className="p-6 rounded-lg bg-white w-3xl">
                        {/* Back Button */}
                        <button
                            className="text-black flex items-center mb-7 cursor-pointer"
                            onClick={closeModal}
                        >
                            <MdArrowBackIos className="mr-4 cursor-pointer" size={18} /> Back
                        </button>

                        <img
                            src="/images/tour-image.jpg"
                            alt="Tour Package"
                            className="w-full h-64 object-cover rounded-lg mb-4"
                        />

                        <div className="grid grid-cols-2 gap-y-2 text-black">
                            <p className="font-semibold">Package Name:</p>
                            <p>{selectedBooking.packageName}</p>

                            <p className="font-semibold">Category:</p>
                            <p>{selectedBooking.category}</p>

                            <p className="font-semibold">Payment Status:</p>
                            <div className="flex items-center space-x-2">
                                {selectedBooking.paymentStatus === "Paid" ? (
                                    <MdCheckCircle className="text-[#009990] text-sm" />
                                ) : (
                                    <MdCancel className="text-red-900 text-sm" />
                                )}
                                <p>{selectedBooking.paymentStatus}</p>
                            </div>

                            <p className="font-semibold">Guest:</p>
                            <p>{selectedBooking.guest}</p>

                            <p className="font-semibold">Date:</p>
                            <p>{selectedBooking.date}</p>

                            <p className="font-semibold">Total Amount for the package:</p>
                            <p>$198</p>

                            <p className="font-semibold">Booking Status:</p>
                            <p className="text-[#009990] font-semibold">Confirmed</p>
                        </div>

                        {/* Contact Customer */}
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
            )}
        </div>
    );
};

export default BookingManagement;
