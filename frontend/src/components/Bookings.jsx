import React from 'react';
import { FaTimes } from 'react-icons/fa';

const Bookings = ({ packageItem, closeModal }) => {

  // Function to date format
function dateformat(date) {
  return new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
  });
}

  return (
    <div className="fixed inset-0  backdrop-blur-lg z-50 flex items-center justify-center p-4 sm:p-6">


      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mt-20">
        <h2 className="text-xl font-medium text-center mb-4 m-7">Booking Summary</h2>
        <div className="relative">
          <img
            alt={packageItem.packageId.name}
            className="w-full h-48 object-cover  bg-black/90 opacity-90"
            height="200"
            src={packageItem.packageId.imageUrl}
            width="600"
          />
          <button onClick={closeModal} className="absolute -top-12  right-2 text-white bg-black rounded-sm">
            <FaTimes className="text-xl" />
          </button>
        </div>
        <div className="p-6">
          <div className='relative'>
            <h3 className="absolute text-lg text-white font-medium text-center left-1/2 transform -translate-x-1/2 -top-16">
              {packageItem.packageId.name}
            </h3>

          </div>
          <div className="space-y-4 font-medium">
            <div className="flex justify-between">
              <span className="text-gray-600">Check-in date</span>
              <span className="text-gray-800">{dateformat(packageItem.checkingDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Check-out date</span>
              <span className="text-gray-800">{dateformat(packageItem.checkOutDate)}</span>
            </div>
            <div className="flex justify-between p-3 border-y-1 border-gray-400">
              <span className="text-gray-600">Package Type</span>
              <span className="text-gray-800">{packageItem.packageId.type}</span>
            </div>
            <div className="flex justify-between p-1">
              <span className="text-gray-600">Guest</span>
              <span className="text-blue-500">{packageItem.billingDetails.firstName}</span>
            </div>
            <div className="flex justify-between border-t-1 border-gray-400 pt-4">
              <span className="text-gray-600">Total</span>
              <span className="text-2xl text-teal-500 font-semibold">{packageItem.totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
