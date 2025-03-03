import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import forestImage from "../assets/forest.jpg";

const Payment = () => {
    const location = useLocation();
    const { datanew } = location.state || {};
  
    const [formData, setFormData] = useState({
        country: "Sri Lanka",
        firstName: "Malinka",
        lastName: "Weerasinghe",
        address: "20/17, 3rd Lane, Abeyrathne Mawatha",
        city: "Maharagama",
        postalCode: "10290",
        contactNumber: "074 786 1625",
        paymentMethod: "card", // Default payment method
    });

    const [isConfirmed, setIsConfirmed] = useState(false);

    // Handle radio button change for payment method
    const handlePaymentChange = (e) => {
        setFormData({ ...formData, paymentMethod: e.target.value });
    };

    // Handle form submission
    const handleConfirm = (e) => {
        e.preventDefault();

        // Collect all form data
        console.log("Billing Details:", formData);

        setIsConfirmed(true);
    };
    
    
  

    return (
        <div className="bg-white p-6 px-12">
            <Navbar />

            <main className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-22">
                {/* Left Section - Tour Details */}
                <div>
                    <img src={forestImage} alt="image" className="rounded-lg h-[400px] w-full" />
                    <h2 className="text-2xl font-medium mt-4">Mirissa Snorkeling & Fishing Tours</h2>
                    <div className="mt-4 space-y-3 font-medium">
                        <div className="flex justify-between"><span className="text-gray-600">Check-In date</span><span className="text-gray-800">Tue, Jan 20</span></div>
                        <div className="flex justify-between"><span className="text-gray-600">Check-Out date</span><span className="text-gray-800">Tue, Jan 20</span></div>
                        <div className="flex justify-between"><span className="text-gray-600">Package Type</span><span className="text-gray-800">Adventure Package</span></div>
                        <div className="flex justify-between"><span className="text-gray-600">Guest</span><span className="text-blue-500">Mari Sheibly</span></div>
                        <div className="flex justify-between font-medium text-lg mt-4"><span>Total Amount</span><span>59,0000 LKR / $198</span></div>
                    </div>
                </div>

                {/* Right Section - Billing */}
                <div>
                  

                    {!isConfirmed ? (
                        <>  <h3 className="text-xl font-medium mb-4">Billing:</h3>
                        <form className="space-y-4 font-medium" onSubmit={handleConfirm}>
                            <div>
                                <label className="block text-gray-900">Country / Region</label>
                                <select
                                    className="w-full bg-gray-100 text-gray-900 rounded-lg p-2"
                                    value={formData.country}
                                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                >
                                    <option value="Sri Lanka">Sri Lanka</option>
                                    <option value="United States">United States</option>
                                    <option value="United Kingdom">United Kingdom</option>
                                    <option value="India">India</option>
                                    <option value="Canada">Canada</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Germany">Germany</option>
                                    <option value="France">France</option>
                                    <option value="Japan">Japan</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-600">First Name</label>
                                    <input className="w-full bg-gray-100 text-gray-500 rounded-lg p-2"  value={formData.firstName} />
                                </div>
                                <div>
                                    <label className="block text-gray-600">Last Name</label>
                                    <input className="w-full bg-gray-100 text-gray-500 rounded-lg p-2"  value={formData.lastName} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-600">Address</label>
                                <input className="w-full bg-gray-100 text-gray-500 rounded-lg p-2"  value={formData.address} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-600">City</label>
                                    <input className="w-full bg-gray-100 text-gray-500 rounded-lg p-2"  value={formData.city} />
                                </div>
                                <div>
                                    <label className="block text-gray-600">Postal Code</label>
                                    <input className="w-full bg-gray-100 text-gray-500 rounded-lg p-2"  value={formData.postalCode} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-600">Contact Number</label>
                                <input className="w-full bg-gray-100 text-gray-500 rounded-lg p-2"  value={formData.contactNumber} />
                            </div>

                            {/* Payment Selection */}
                            <div>
                                <h4 className="text-lg font-medium mt-4">Pay with:</h4>
                                <div className="flex items-center mt-2">
                                    <input type="radio" id="card" name="paymentMethod" className="mr-2" value="card"
                                        checked={formData.paymentMethod === "card"} onChange={handlePaymentChange} />
                                    <label htmlFor="card" className="mr-4">Card</label>
                                    <input type="radio" id="bank-transfer" name="paymentMethod" className="mr-2" value="bank-transfer"
                                        checked={formData.paymentMethod === "bank-transfer"} onChange={handlePaymentChange} />
                                    <label htmlFor="bank-transfer">Bank Transfer</label>
                                </div>
                            </div>

                            <button className="w-full bg-black text-white py-3 rounded-lg mt-4" type="submit">Continue</button>
                        </form>
                        </>
                    ) : (
                        <>
                            {/* Show payment form based on selected method */}
                            {formData.paymentMethod === "card" ? <CardPayment /> : <BankTransfer />}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};


const CardPayment = () => {
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
      alert("Payment submitted successfully!");
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
          <button type="submit" className="w-full py-3 bg-black text-white rounded-lg">
            Pay Now
          </button>
        </form>
      </div>
    );
  };
  
// Bank Transfer Component
const BankTransfer = () => (
    <div className="flex font-medium  justify-center min-h-screen">
  <div className="text-center p-8 bg-white w-full max-w-lg">
    <h2 className="text-3xl  text-start text-gray-800">Bank Transfer</h2>
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
    <div className="mt-6">
      <label className="block text-start font-medium text-gray-700 mb-2">Upload Payment Proof</label>
      <div className="flex justify-center items-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-gray-500 transition">
        <input
          type="file"
          id="payment-proof"
          className="hidden"
          accept="image/*,.pdf"
        />
        <label htmlFor="payment-proof" className="text-gray-700 text-lg hover:text-black cursor-pointer">
          Choose a file
        </label>
      </div>
      <p className="mt-2 text-sm text-gray-600">Accepted file formats: JPG, PNG, PDF</p>
    </div>

    <div className="mt-6">
      <button className="mt-4 px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-200">
        Upload Payment Proof
      </button>
    </div>
  </div>
</div>

);

export default Payment;
