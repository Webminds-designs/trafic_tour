import React from "react";
import riverstone from "../assets/riverstone.png";
import piduruthalagala from "../assets/piduruthalagala.png";
import ruwanweliseya from "../assets/ruwanweliseya.png";
import dambulla from "../assets/dambulla.png";
import girihanduseya from "../assets/girihanduseya.png";
import Instagram from "../assets/instergram.jpg";
import Navbar from "../components/Navbar";

const ContactUs = () => {
    return (
        <>
            <Navbar />
            <div className="bg-[#F1F1F1] pt-10 md:pt-20 items-center">
                <div className="max-w-7xl mx-auto px-2 md:px-6 lg:px-10 pt-20 md:pt-36">
                    {/* Header Section and Contact Info/Form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 lg:gap-40 items-start">
                        {/* Left Column: Header and Contact Info */}
                        <div>
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-base mb-4">LET'S CONNECT</h1>
                            <div className="mt-8 md:mt-12">
                                <p className="text-base md:text-lg font-base">E-MAIL ADDRESS</p>
                                <p className="text-[#009990] mb-4 md:mb-6 font-base">TRAFFICTOURS@COMPANYNAME.COM</p>
                                <p className="text-base md:text-lg font-base">WORKING HOURS</p>
                                <p className="text-[#009990] font-base">MON - SAT, 8:00 AM - 5:00 PM (SLT) UTC +5:30</p>
                            </div>
                        </div>

                        {/* Right Column: Contact Form */}
                        <div className="p-4 md:p-6 rounded-md -mt-8 md:-mt-12">
                            <form className="p-4 md:p-6 rounded-lg font-base">
                                {/* First & Last Name */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm mb-1">FIRST NAME</label>
                                        <input
                                            type="text"
                                            placeholder="ENTER NAME"
                                            className="w-full bg-[#E2E7EA] p-2 md:p-3 mb-2 rounded-md text-gray-600"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm mb-1">LAST NAME</label>
                                        <input
                                            type="text"
                                            placeholder="ENTER LAST NAME"
                                            className="w-full bg-[#E2E7EA] p-2 md:p-3 mb-2 rounded-md text-gray-600"
                                        />
                                    </div>
                                </div>

                                {/* Email Address */}
                                <div className="mb-4">
                                    <label className="block text-sm mb-1">EMAIL ADDRESS *</label>
                                    <input
                                        type="email"
                                        placeholder="ENTER YOUR EMAIL"
                                        className="w-full bg-[#E2E7EA] p-2 md:p-3 mb-2 rounded-md text-gray-600"
                                    />
                                </div>

                                {/* Subject */}
                                <div className="mb-4">
                                    <label className="block text-sm mb-1">SUBJECT *</label>
                                    <input
                                        type="text"
                                        placeholder="ENTER SUBJECT"
                                        className="w-full bg-[#E2E7EA] p-2 md:p-3 mb-2 rounded-md text-gray-600"
                                    />
                                </div>

                                {/* Message */}
                                <div className="mb-4">
                                    <label className="block text-sm mb-1">MESSAGE *</label>
                                    <textarea
                                        placeholder="ENTER MESSAGE"
                                        rows="4"
                                        className="w-full bg-[#E2E7EA] p-2 md:p-3 mb-2 rounded-md text-gray-600"
                                    />
                                </div>

                                {/* Send Button */}
                                <button className="w-full bg-[#009990] text-white py-2 md:py-3 rounded-md font-base hover:bg-gray-900 transition">
                                    SEND
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Divider Text */}
                    <div className="text-center my-20 md:my-36 font-base text-4xl md:text-5xl lg:text-7xl">
                        <h2>&</h2>
                        <h2>GO PLACES YOU WILL REMEMBER</h2>
                    </div>



                    {/* Image Gallery */}
                    <div className="flex flex-wrap gap-4 mb-20 md:grid md:grid-cols-3 md:grid-rows-2 lg:grid-cols-4 lg:grid-rows-2">
                        {/* First Row */}
                        <div className="relative md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1">
                            <img src={riverstone} alt="Riverstone" className="rounded-lg w-[300px] h-[300px] object-cover aspect-[4/3]" />
                            <p className="absolute bottom-2 left-2 text-white font-base text-lg">RIVERSTONE</p>
                        </div>
                        <div className="relative md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1">
                            <img src={piduruthalagala} alt="Piduruthalagala Rock" className="rounded-lg [300px] h-[300px] object-cover" />
                            <p className="absolute top-2 right-2 text-white font-base text-lg">PIDURUTHALAGALA ROCK</p>
                        </div>
                        <div className="relative md:col-span-1 md:row-span-1 lg:col-span-2 lg:row-span-1">
                            <img src={ruwanweliseya} alt="Ruwanweli Seya" className="rounded-lg w-full h-[300px] object-cover aspect-[4/3]" />
                            <p className="absolute bottom-2 right-2 text-white font-base text-lg">RUWANWELI SEYA</p>
                        </div>

                        {/* Second Row */}
                        <div className="relative flex items-center justify-center w-20 h-20 md:w-32 md:h-32 lg:w-48 lg:h-48 rounded-full hover:scale-105 transition-transform md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1">
                            {/* Gradient Border */}
                            <div
                                className="absolute inset-0 rounded-full border-[1px] border-transparent p-[3px]"
                                style={{
                                    background: "linear-gradient(45deg, #991DB6 0%, #FF3A80 50%, #FCC631 100%)",
                                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                    WebkitMaskComposite: "destination-out",
                                    maskComposite: "exclude",
                                }}
                            ></div>

                            {/* Instagram Image */}
                            <img src={Instagram} alt="Instagram" className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full object-cover" />
                        </div>

                        <div className="relative md:col-span-1 md:row-span-1 lg:col-span-2 lg:row-span-1">
                            <img src={dambulla} alt="Dambulla Rock Temple" className="rounded-lg w-full h-[300px] object-cover aspect-[4/3]" />
                            <p className="absolute top-2 left-2 text-white font-base text-lg">DAMBULLA ROCK TEMPLE</p>
                        </div>

                        <div className="relative md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1">
                            <img src={girihanduseya} alt="Girihandu Seya" className="rounded-lg [300px] h-[300px] object-cover aspect-[4/3]" />
                            <p className="absolute bottom-2 left-2 text-white font-base text-lg">GIRIHANDU SEYA</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default ContactUs;