import { useState } from "react";
// import { IoMailOutline } from "react-icons/io5";
import riverstone from "../assets/riverstone.png";
import piduruthalagala from "../assets/piduruthalagala.png";
import ruwanweliseya from "../assets/ruwanweliseya.png";
import dambulla from "../assets/dambulla.png";
import girihanduseya from "../assets/girihanduseya.png";
import Instagram from "../assets/instergram.jpg";
import Navbar from "../components/Navbar";
// import axios from "axios";
import { toast } from "react-toastify";
import api from "../services/api";
import { motion } from "framer-motion";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, subject, message } = formData;

    if (!firstName || !lastName || !email || !subject || !message) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      // const response = await axios.post(
      //   "http://localhost:3000/api/send-email",
      //   {
      //     from: email,
      //     to: "contact.deneth@gmail.com", // Replace with actual email
      //     subject,
      //     text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nMessage: ${message}`,
      //   }
      // );

      const response = await api.post("/send-email", {
        from: email,
        to: "contact.deneth@gmail.com", // Replace with actual email
        subject,
        text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nMessage: ${message}`,
      });

      if (response.status === 200) {
        toast.success("Email sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error("Failed to send email. Please try again later.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.error(error);
    }
  };

  // Animation variants for text
  const textVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  // Hover animation for images
  const hoverVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };
  return (
    <>
      <Navbar />
      <div className="bg-[#F1F1F1] pt-10 md:pt-20 items-center">
        <div className="max-w-7xl mx-auto px-2 md:px-6 lg:px-10 pt-20 md:pt-36">
          {/* Header Section and Contact Info/Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 lg:gap-40 items-start">
            {/* Left Column: Header and Contact Info */}
            <div>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-base mb-4"
                initial="hidden"
                whileInView="visible"
                variants={textVariants}
                transition={{ duration: 0.6 }}
              >
                Let&#39;s Connect
              </motion.h1>
              <motion.div
                className="mt-8 md:mt-12"
                initial="hidden"
                whileInView="visible"
                variants={textVariants}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="flex">
                  {" "}
                  <p className="text-base md:text-lg font-base">
                    Email Address
                  </p>
                </div>
                <p className="text-[#009990] mb-4 md:mb-6 font-base">
                  info@srilankatraffictours.com
                </p>
                <p className="text-base md:text-lg font-base">Working Hours</p>
                <p className="text-[#009990] font-base">
                  Mon - Sat, 8:00 AM - 5:00 PM (SLT) UTC +5:30
                </p>
              </motion.div>
            </div>

            {/* Right Column: Contact Form */}
            <motion.div
              className="p-4 md:p-6 rounded-md -mt-8 md:-mt-12"
              initial="hidden"
              whileInView="visible"
              variants={textVariants}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <form
                onSubmit={handleSubmit}
                className="p-4 md:p-6 rounded-lg font-base"
              >
                {/* First & Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm mb-1">First Name</label>
                    <input
                      type="text"
                      placeholder="Enter your first name"
                      className="w-full bg-[#E2E7EA] p-2 md:p-3 mb-2 rounded-md text-gray-600"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Last Name</label>
                    <input
                      type="text"
                      placeholder="Enter your last name"
                      className="w-full bg-[#E2E7EA] p-2 md:p-3 mb-2 rounded-md text-gray-600"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="mb-4">
                  <label className="block text-sm mb-1">Email Address *</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-[#E2E7EA] p-2 md:p-3 mb-2 rounded-md text-gray-600"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                {/* Subject */}
                <div className="mb-4">
                  <label className="block text-sm mb-1">Subject *</label>
                  <input
                    type="text"
                    placeholder="Enter subject"
                    className="w-full bg-[#E2E7EA] p-2 md:p-3 mb-2 rounded-md text-gray-600"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                  />
                </div>

                {/* Message */}
                <div className="mb-4">
                  <label className="block text-sm mb-1">Message *</label>
                  <textarea
                    placeholder="Enter your message"
                    rows="4"
                    className="w-full bg-[#E2E7EA] p-2 md:p-3 mb-2 rounded-md text-gray-600"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                </div>

                {/* Send Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="w-3/4 bg-[#009990] text-white py-2 md:py-3 rounded-3xl font-base hover:bg-gray-900 transition"
                  >
                    Send
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
          {/* Divider Text */}
          <div className="text-center my-20 md:my-36 font-base text-4xl md:text-5xl lg:text-5xl">
            <h2>Go to places you will remember</h2>
          </div>
          {/* Image Gallery */}
          <div className="flex flex-wrap gap-8 mb-20">
            {/* First Row */}
            <motion.div
              className="relative"
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              variants={{ ...textVariants, ...hoverVariants }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={riverstone}
                alt="Riverstone"
                className="rounded-lg w-[300px] h-[300px] object-cover aspect-[4/3]"
                loading="lazy"
              />
              <p className="absolute bottom-2 left-2 text-white font-base text-lg">
                Riverstone
              </p>
            </motion.div>
            <motion.div
              className="relative"
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              variants={{ ...textVariants, ...hoverVariants }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <img
                src={piduruthalagala}
                alt="Piduruthalagala Rock"
                className="rounded-lg w-[300px] h-[300px] object-cover"
                loading="lazy"
              />
              <p className="absolute top-2 right-2 text-white font-base text-lg">
                Piduruthalagala Rock
              </p>
            </motion.div>
            <motion.div
              className="relative"
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              variants={{ ...textVariants, ...hoverVariants }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <img
                src={ruwanweliseya}
                alt="Ruwanweli Seya"
                className="rounded-lg w-[450px] h-[300px] object-cover aspect-[4/3]"
                loading="lazy"
              />
              <p className="absolute bottom-2 right-2 text-white font-base text-lg">
                Ruwanweli Seya
              </p>
            </motion.div>

            {/* Second Row */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              variants={{ ...textVariants, ...hoverVariants }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative flex items-center justify-center w-75 h-75 rounded-full hover:scale-105 transition-transform">
                {/* Gradient Border */}
                <div
                  className="absolute inset-0 rounded-full border-[1px] border-transparent p-[3px]"
                  style={{
                    background:
                      "linear-gradient(45deg, #991DB6 0%, #FF3A80 50%, #FCC631 100%)",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "destination-out",
                    maskComposite: "exclude",
                  }}
                ></div>

                {/* Instagram Image */}
                <img
                  src={Instagram}
                  alt="Instagram"
                  className="w-16 h-16 rounded-full object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              variants={{ ...textVariants, ...hoverVariants }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <img
                src={dambulla}
                alt="Dambulla Rock Temple"
                className="rounded-lg w-[450px] h-[300px] object-cover aspect-[4/3]"
                loading="lazy"
              />
              <p className="absolute top-2 left-2 text-white font-base text-lg">
                Dambulla Rock Temple
              </p>
            </motion.div>

            <motion.div
              className="relative"
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              variants={{ ...textVariants, ...hoverVariants }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <img
                src={girihanduseya}
                alt="Girihandu Seya"
                className="rounded-lg w-[300px] h-[300px] object-cover aspect-[4/3]"
                loading="lazy"
              />
              <p className="absolute bottom-2 left-2 text-white font-base text-lg">
                Girihandu Seya
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
