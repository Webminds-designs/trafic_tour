import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { toast } from "react-toastify";
import axios from "axios";


const Payment = () => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  const { data } = location.state || {};
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [formData, setFormData] = useState({
    country: "Sri Lanka",
    firstName: user.firstName,
    lastName: user.lastName,
    address: "",
    city: "",
    postalCode: "",
    contactNumber: user.phone,
    paymentMethod: "card", // Default payment method
  });

  // Generate Order ID
  const generateOrderId = () => {
    return `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };

  //order details
  const orderDetails = {
    order_id: generateOrderId(),
    user_id: user?.id || "",
    package_id: data?._id || "",
    amount: data?.price || 0,
    first_name: user?.firstName || "",
    last_name: user?.lastName || "",
    email: user?.email || "",
    passportId: user?.passportId || "",
  };
   //order details
  const bookingData ={
    userId: user?.id || "",
    packageId: data?._id || "",
    guests: 1,
    checkingDate:checkInDate,
    checkOutDate:checkOutDate ,
    billingDetails: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      city: formData.city,
      postalCode: formData.postalCode,
      country: formData.country,
      contactNumber: user.phone,
    },
  }

  //get check out data
  const handleCheckInChange = (e) => {
    const selectedDate = e.target.value;
    setCheckInDate(selectedDate);

    if (selectedDate) {
      // Calculate check-out date (5 days later)
      const checkIn = new Date(selectedDate);
      checkIn.setDate(checkIn.getDate() + data.duration.days);
      const formattedCheckOut = checkIn.toISOString().split("T")[0]; // Format to YYYY-MM-DD
      setCheckOutDate(formattedCheckOut);
    }
  };

  // Handle radio button change for payment method
  const handlePaymentChange = (e) => {
    setFormData({ ...formData, paymentMethod: e.target.value });
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleConfirm = (e) => {
    e.preventDefault();

    // Validation checks
    if (!formData.firstName.trim()) {
      toast.error("First name is required");
      return;
    }

    if (!formData.lastName.trim()) {
      toast.error("Last name is required");
      return;
    }

    if (!formData.address.trim()) {
      toast.error("Address is required");
      return;
    }

    if (!formData.city.trim()) {
      toast.error("City is required");
      return;
    }

    if (!formData.postalCode.trim() || isNaN(formData.postalCode)) {
      toast.error("Postal Code is required and must be a number");
      return;
    }

    if (!formData.contactNumber.trim() || formData.contactNumber.length < 10 || isNaN(formData.contactNumber)) {
      toast.error("Valid Contact Number is required (minimum 10 digits)");
      return;
    }
    if (!checkInDate) {
      toast.error("Check-In Date is required");
      return;
    }
    
    if (!checkOutDate) {
      toast.error("Check-Out Date is required");
      return;
    }
    

    // If all validations pass
    console.log("Billing Details:", formData);
    setIsConfirmed(true);
    toast.success("Billing details confirmed!");
  };

  return (
    <div className="bg-white p-6 px-24">
      <Navbar />

      <main className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-22">
        {/* Left Section - Tour Details */}
        <div>
          <img src={data.imageUrl} alt="image" className="rounded-lg h-[400px] w-full" />
          <h2 className="text-2xl font-medium mt-4">{data.name}</h2>
          <div className="mt-4 space-y-3 font-medium">
          <div className="flex flex-col space-y-2">
      <div className="flex justify-between">
        <span className="text-gray-600">Check-In Date</span>
        <input
          type="date"
          className="border text-gray-600 rounded px-2 py-1"
          value={checkInDate}
          onChange={handleCheckInChange}
        />
      </div>

      <div className="flex justify-between">
        <span className="text-gray-600">Check-Out Date</span>
        <input
          type="date"
          className="border text-gray-600 rounded px-2 py-1"
          value={checkOutDate}
          readOnly // Prevent user from manually changing it
        />
      </div>
    </div>
            <div className="flex justify-between"><span className="text-gray-600">Package Type</span><span className="text-gray-800">{data.type}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Guest</span><span className="text-blue-500">{user.firstName} {user.lastName}</span></div>
            <div className="flex justify-between font-medium text-lg mt-4"><span>Total Amount</span><span>{data.price}</span></div>
          </div>
        </div>

        {/* Right Section - Billing */}
        <div>
          {/* Back Button */}
          {isConfirmed && (
            <button
              className=" flex items-end justify-end bg-white  text-black border  font-medium py-2 rounded-lg p-1 transition duration-300"
              type="button"
              onClick={() => setIsConfirmed(false)}
            >
              Back
            </button>
          )}

          {!isConfirmed ? (
            <>
              <h3 className="text-xl font-medium mb-4">Billing:</h3>
              <form className="space-y-4 font-medium" onSubmit={handleConfirm}>
                <div>
                  <label className="block text-gray-900">Country / Region</label>
             
                  <input
                      className="w-full bg-gray-100 text-gray-500 rounded-lg p-2"
                      value={formData.country}
                      onChange={handleInputChange}
                      name="country"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-600">First Name</label>
                    <input
                      name="firstName"
                      className="w-full bg-gray-100 text-gray-500 rounded-lg p-2"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600">Last Name</label>
                    <input
                      name="lastName"
                      className="w-full bg-gray-100 text-gray-500 rounded-lg p-2"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-600">Address</label>
                  <input
                    name="address"
                    className="w-full bg-gray-100 text-gray-500 rounded-lg p-2"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-600">City</label>
                    <input
                      name="city"
                      className="w-full bg-gray-100 text-gray-500 rounded-lg p-2"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600">Postal Code</label>
                    <input
                      name="postalCode"
                      className="w-full bg-gray-100 text-gray-500 rounded-lg p-2"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-600">Contact Number</label>
                  <input
                    name="contactNumber"
                    className="w-full bg-gray-100 text-gray-500 rounded-lg p-2"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Payment Selection */}
                <div>
                  <h4 className="text-lg font-medium mt-4">Pay with:</h4>
                  <div className="flex items-center mt-2">
                    <input
                      type="radio"
                      id="card"
                      name="paymentMethod"
                      className="mr-2"
                      value="card"
                      checked={formData.paymentMethod === "card"}
                      onChange={handlePaymentChange}
                    />
                    <label htmlFor="card" className="mr-4">Card</label>
                    <input
                      type="radio"
                      id="bank-transfer"
                      name="paymentMethod"
                      className="mr-2"
                      value="bank-transfer"
                      checked={formData.paymentMethod === "bank-transfer"}
                      onChange={handlePaymentChange}
                    />
                    <label htmlFor="bank-transfer">Bank Transfer</label>
                  </div>
                </div>

                <button className="w-full bg-black text-white py-3 rounded-lg mt-4" type="submit">Continue</button>
              </form>
            </>
          ) : (
            <>
              {/* Show payment form based on selected method */}
              {formData.paymentMethod === "card" ? <CardPayment order={orderDetails} formData={formData} bookingData={bookingData}/> : <BankTransfer order={orderDetails} formData={formData} bookingData={bookingData}/>}
            </>
          )}
        </div>
      </main>
    </div>
  );
};


const CardPayment = ({ order, formData ,bookingData}) => {
 
   //create bookings
   const createBooking = async (bookingData) => {
    
    try {
      const response = await axios.post("http://localhost:6400/api/bookings", bookingData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 201) {
        toast.success("Booking successful!");
        return response.data;
      } else {
        toast.error("Booking failed. Please try again.");
        return null;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred while booking.");
      return null;
    }
  };

  const handleCardPayment = async () => {
    const dbDetails = {
      userId: order?.user_id,        // user ID
      packageId: order?.package_id,      // Package ID
      amount: order?.amount, // Payment amount
      status: "completed",
      paymentMethod: formData?.paymentMethod, // Ensure paymentMethod exists in formData
      transactionId: order?.order_id,  // Unique transaction ID for the payment
    };


    try {
      // Make a POST request to the backend with the payment details
      const response = await axios.post("http://localhost:6400/api/payments", dbDetails);

      // Check if the payment was successful
      if (response.status === 201) {
        createBooking(bookingData)
        toast.success("Payment created successfully!");
      } else {
        throw new Error("Payment creation failed");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      toast.error(error.response?.data?.message || "An error occurred during payment processing.");
    }
  };


  const handlePayment = async () => {
    try {

      // Fetch hash from backend
      const response = await fetch("http://localhost:6400/api/payhere/hash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      const data = await response.json();
      if (!data.success) {
        console.error("Payment Initialization Failed:", data.message);
        toast.error("Payment failed: " + data.message);
        return;
      }

      const payment = {
        sandbox: true,
        merchant_id: data.merchant_id,
        return_url: undefined,
        cancel_url: undefined,
        notify_url: "http://localhost:5000/api/payhere/notify",
        order_id: order.order_id,
        items: order.items,
        amount: Number(order.amount).toFixed(2),
        currency: "LKR",
        first_name: order.firstName,
        last_name: order.lastName,
        email: order.email,
        phone: order.phone,
        address: "Colombo",
        city: "Colombo",
        country: "Sri Lanka",
        delivery_address: "Colombo",
        delivery_city: "Colombo",
        delivery_country: "Sri Lanka",
        hash: data.hash,
      };

      console.log("🔹 Sending Payment Request:", payment);

      payhere.onCompleted = function onCompleted(orderId) {
        console.log("Payment Completed. Order ID:", orderId);
        handleCardPayment();


      };

      payhere.onDismissed = function onDismissed() {
        console.log("Payment dismissed by user");
        toast.error("Payment cancelled.");
      };

      payhere.onError = function onError(error) {
        console.error("PayHere Payment Error:", error);
        toast.error("Payment error: " + error);
      };

      payhere.startPayment(payment);
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error("Payment request failed. Check console for details.");
    }
  };
  const [formCardData, setFormCardData] = useState({
    cardNumber: "5534 2834 8857 5370",
    expiryMonth: "01",
    expiryYear: "2026",
    cvv: "",
    name: "",
    saveCard: false,
  });

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormCardData({
      ...formCardData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payment Details:", formCardData);
    toast.success("Payment submitted successfully!");
  };

  return (
    <div className="flex justify-center min-h-screen ">
      <form
        onSubmit={handleSubmit}
        className="text-center bg-white p-6 rounded-lg w-full max-w-md "
      >
        <h2 className="text-xl font-medium mb-4 text-start">Payment:</h2>

        {/* Payment Type Selection */}
        <div className="flex justify-between font-medium mb-4">
          <button type="button" className="flex-1 py-2 px-4 bg-gray-100 text-center rounded-l-lg border-r-2 border-gray-200">
            Debit Card
          </button>
          <button type="button" className="flex-1 py-2 px-4 bg-gray-100 text-center rounded-r-lg relative">
            Credit Card
          </button>
        </div>

        {/* Card Number */}
        <div className="mb-4">
          <label className="block text-start text-gray-700 mb-2">Card Number</label>
          <input
            className="w-full p-3 rounded-lg bg-gray-100"
            type="text"
            name="cardNumber"
            value={formCardData.cardNumber}
            onChange={handleChange}
            required
          />
        </div>

        {/* Expiry Date & CVV */}
        <div className="flex mb-4">
          <div className="w-1/2 pr-2">
            <label className="block text-start text-gray-700 mb-2">Expiry Date</label>
            <div className="flex">
              <select
                className="w-1/2 p-3 rounded-l-lg bg-gray-100"
                name="expiryMonth"
                value={formCardData.expiryMonth}
                onChange={handleChange}
                required
              >
                <option value="01">Jan</option>
                <option value="02">Feb</option>
                <option value="03">Mar</option>
                <option value="04">Apr</option>
                <option value="05">May</option>
                <option value="06">Jun</option>
                <option value="07">Jul</option>
                <option value="08">Aug</option>
                <option value="09">Sep</option>
                <option value="10">Oct</option>
                <option value="11">Nov</option>
                <option value="12">Dec</option>
              </select>
              <input
                className="w-1/2 p-3 rounded-r-lg bg-gray-100"
                type="text"
                name="expiryYear"
                value={formCardData.expiryYear}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="w-1/2 pl-2">
            <label className="block text-start text-gray-700 mb-2">CVV</label>
            <input
              className="w-full p-3 rounded-lg bg-gray-100"
              type="password"
              name="cvv"
              value={formCardData.cvv}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-start text-gray-700 mb-2">Name</label>
          <input
            className="w-full p-3 border rounded-lg bg-gray-100"
            type="text"
            name="name"
            value={formCardData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Save Card Option */}
        <div className="flex items-center mb-4">
          <input
            className="mr-2"
            type="checkbox"
            name="saveCard"
            checked={formCardData.saveCard}
            onChange={handleChange}
          />
          <label className="text-gray-700">Save card for future checkouts</label>
        </div>

        {/* Pay Now Button */}
        <button onClick={handlePayment} className="w-full py-3 bg-black text-white rounded-lg">
          Pay Now
        </button>
      </form>
    </div>
  );
};

// Bank Transfer Component
  const BankTransfer = ({ order,bookingData }) => {
    const [paymentProof, setPaymentProof] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [referenceNumber, setReferenceNumber] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    console.log(bookingData);
    //create bookings
    const createBooking = async (bookingData) => {
    
      try {
        const response = await axios.post("http://localhost:6400/api/bookings", bookingData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        if (response.status === 201) {
          toast.success("Booking successful!");
          return response.data;
        } else {
          toast.error("Booking failed. Please try again.");
          return null;
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred while booking.");
        return null;
      }
    };
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setPaymentProof(file);
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
      }
    };
  
    const handleReferenceChange = (e) => {
      setReferenceNumber(e.target.value);
    };
  
    const handlePaymentSubmission = async () => {
      if (!paymentProof) {
        toast.error("Please upload a payment proof.");
        return;
      }
      if (!referenceNumber.trim()) {
        toast.error("Reference number is required.");
        return;
      }
  
      setIsSubmitting(true);
  
      const formData = new FormData();
      formData.append("userId", order.user_id);
      formData.append("packageId", order.package_id);
      formData.append("amount", order.amount);
      formData.append("paymentMethod", "bank_transfer");
      formData.append("transactionId", referenceNumber);
      formData.append("paymentProof", paymentProof);
  
      try {
        const response = await axios.post("http://localhost:6400/api/payments", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.status === 201) {
          createBooking(bookingData)
          toast.success("Payment successfully created!");
        }
      } catch (error) {
        console.error("Error creating payment:", error);
        toast.error(error.response?.data?.message || "An error occurred while processing the payment.");
      } finally {
        setIsSubmitting(false);
      }
    };
  
    return (
      <div className="flex font-medium justify-center min-h-screen">
        <div className="text-center p-8 bg-white w-full max-w-lg">
          <h2 className="text-3xl text-start text-gray-800">Bank Transfer</h2>
          <p className="text-gray-600 font-medium mt-4 text-lg">
            Use the following details to complete your payment:
          </p>
  
          <div className="mt-6 space-y-4">
            <div className="flex justify-between text-left">
              <p className="font-medium text-gray-700">Bank Name:</p>
              <p className="text-gray-800">ABC Bank</p>
            </div>
  
            <div className="flex justify-between text-left">
              <p className="font-medium text-gray-700">Account Number:</p>
              <p className="text-gray-800">123456789</p>
            </div>
  
            <div className="flex justify-between text-left">
              <p className="font-medium text-gray-700">Branch:</p>
              <p className="text-gray-800">Colombo Main Branch</p>
            </div>
  
            <div className="flex justify-between text-left">
              <p className="font-medium text-gray-700">SWIFT Code:</p>
              <p className="text-gray-800">ABCD1234</p>
            </div>
          </div>
  
          {/* Reference Number Input */}
          <div className="mt-6">
            <label className="block text-start font-medium text-gray-700 mb-2">Reference Number</label>
            <input
              type="text"
              placeholder="Enter Reference Number"
              value={referenceNumber}
              onChange={handleReferenceChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>
  
          {/* Upload Payment Proof Section */}
          <div className="mt-6">
            <label className="block text-start font-medium text-gray-700 mb-2">Upload Payment Proof</label>
            <div className="flex justify-center items-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-500 transition">
              <input
                type="file"
                id="payment-proof"
                className="hidden"
                accept="image/*,.pdf"
                onChange={handleFileChange}
              />
              <label htmlFor="payment-proof" className="text-gray-700 text-lg hover:text-black cursor-pointer p-6">
                Choose a file
              </label>
            </div>
  
            {previewUrl && (
              <div className="mt-4">
                <p className="text-sm text-gray-600">Preview:</p>
                <div className="mt-2">
                  {paymentProof.type.startsWith("image") ? (
                    <img
                      src={previewUrl}
                      alt="Payment Proof Preview"
                      height={100}
                      className="max-w-full h-auto rounded-lg"
                    />
                  ) : (
                    <p className="text-gray-600">File type: {paymentProof.type}</p>
                  )}
                </div>
              </div>
            )}
  
            <p className="mt-2 text-sm text-gray-600">Accepted file formats: JPG, PNG, PDF</p>
          </div>
  
          <div className="mt-6">
            <button
              onClick={handlePaymentSubmission}
              className="mt-4 px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Upload Payment Proof"}
            </button>
          </div>
        </div>
      </div>
    );
  };
  


export default Payment;
