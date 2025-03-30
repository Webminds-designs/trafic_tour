import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaTiktok, FaInstagram } from "react-icons/fa";
import Navbar from "../components/Navbar";
import elephant from "../assets/elephant.png";
import girl from "../assets/girl.png";
import devil from "../assets/devil.png";
import backgroundImage from "../assets/dencersGroup.svg";
import JourneyImage from "../assets/journey.png";
import voice1 from "../assets/voice1.png";
import voice2 from "../assets/voice2.png";
import voice3 from "../assets/voice3.png";
import bring1 from "../assets/bring1.png";
import bring2 from "../assets/bring2.png";
import bring3 from "../assets/bring3.png";
import bring4 from "../assets/bring4.png";
import Footer from "../components/Footer";

const AboutUs = () => {
    const content = [
        {
            img: bring1,
            title: "Explore Without Limits",
            text: "Let the roads of Sri Lanka lead you to hidden treasures, from misty mountains to golden beaches, as we create journeys that touch your heart.",
        },
        {
            img: bring2,
            title: "Guided by Stories,Not Just Maps",
            text: "Travel with experienced guides who reveal the soul of Sri Lanka—where every temple tells a story, and every forest is alive with nature.",
        },
        {
            img: bring3,
            title: "Taste the Flavors, Feel the Culture",
            text: "From rice and curry to Ceylon tea, every bite tells a tale. Join us for spice-filled adventures and strolls through markets filled with tradition.",
        },
        {
            img: bring4,
            title: "Where Adventure Runs Free",
            text: "See the wild beauty of Yala’s leopards, chase waterfalls in Ella, and dive into clear waters full of marine life.",
        },
    ];


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
            <div className="bg-gray-100 text-black font-sans">
                {/* Header Section */}
                <header className="text-center py-10 md:py-20">
                    <div
                        className="inline-block px-4 py-3 md:px-8 md:py-6 relative bg-cover bg-center h-full w-full md:w-[700px]"
                        style={{
                            backgroundImage: `url(${backgroundImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <motion.h1
                            className="text-4xl md:text-5xl lg:text-6xl font-base mt-10 md:mt-30 relative z-20"
                            initial="hidden"
                            whileInView="visible"
                            variants={textVariants}
                            transition={{ duration: 0.8 }}
                        >
                            Refreshingly Sri Lanka
                        </motion.h1>
                        <motion.p
                            className="text-sm md:text-lg mt-2 md:mt-3 font-base relative z-10"
                            initial="hidden"
                            whileInView="visible"
                            variants={textVariants}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            Where every journey feels like a new discovery, blending nature, culture, and adventure in the heart of the island.
                        </motion.p>
                    </div>

                    <motion.p
                        className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 md:mt-6 text-[#305F7A] sinhala-text"
                        initial="hidden"
                        whileInView="visible"
                        variants={textVariants}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        ආයුබෝවන්
                    </motion.p>

                    <motion.p
                        className="text-4xl md:text-5xl lg:text-6xl mt-6 md:mt-10 font-base text-[#305F7A] relative"
                        initial="hidden"
                        whileInView="visible"
                        variants={textVariants}
                        transition={{ duration: 0.8, delay: 0.9 }}
                    >
                        <span className="relative inline-block">
                            A
                            <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-5xl md:text-6xl lg:text-7xl">˜</span>
                        </span>
                        yob
                        <span className="relative inline-block">
                            o
                            <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-5xl md:text-6xl lg:text-7xl">˜</span>
                        </span>
                        wan
                    </motion.p>
                </header>

                {/* Images Section */}
                <div className="flex justify-center items-center mt-4 md:mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10 p-4 md:p-6 mb-10 md:mb-20 rounded-lg">
                        <motion.img
                            src={elephant}
                            alt="Elephant"
                            className="w-full h-auto md:w-[400px] md:h-[600px] object-cover rounded-lg"
                            initial="hidden"
                            whileInView="visible"
                            whileHover="hover"
                            variants={{ ...textVariants, ...hoverVariants }}
                            transition={{ duration: 0.8 }}
                        />
                        <motion.img
                            src={girl}
                            alt="Girl"
                            className="w-full h-auto md:w-[400px] md:h-[600px] object-cover rounded-lg"
                            initial="hidden"
                            whileInView="visible"
                            whileHover="hover"
                            variants={{ ...textVariants, ...hoverVariants }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        />
                        <motion.img
                            src={devil}
                            alt="Devil"
                            className="w-full h-auto md:w-[400px] md:h-[600px] object-cover rounded-lg"
                            initial="hidden"
                            whileInView="visible"
                            whileHover="hover"
                            variants={{ ...textVariants, ...hoverVariants }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        />
                    </div>
                </div>

                {/* What We Bring To You Section */}
                <section className="text-center my-4">
                    <motion.h2
                        className="text-4xl md:text-5xl lg:text-6xl font-base"
                        initial="hidden"
                        whileInView="visible"
                        variants={textVariants}
                        transition={{ duration: 0.8 }}
                    >
                        What We <span className="border-b-2">Bring</span> to You
                    </motion.h2>
                    <div className="flex flex-col items-center p-4 md:p-8">
                        {content.map((item, index) => (
                            <motion.div
                                key={index}
                                className="flex flex-col md:flex-row p-2 rounded-lg mb-6 md:mb-12 w-full max-w-4xl"
                                style={{ backgroundColor: "rgba(155, 208, 239, 0.28)" }}
                                initial="hidden"
                                whileInView="visible"
                                variants={textVariants}
                                transition={{ duration: 0.8, delay: index * 0.3 }}
                            >
                                <motion.img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-full md:w-50 h-50 object-cover rounded-lg"
                                    whileHover="hover"
                                    variants={hoverVariants}
                                />
                                <div className="w-full md:w-2/3 pl-0 md:pl-6 flex flex-col justify-center mt-4 md:mt-0">
                                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-base mb-2 text-left">{item.title}</h2>
                                    <p className="text-black text-left">{item.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Journey Section */}
                <div className="flex justify-center items-center p-4 md:p-10">
                    <div className="flex flex-col lg:flex-row p-3 rounded-lg max-w-7xl w-full">
                        {/* Text Section */}
                        <motion.div
                            className="w-full lg:w-2/3 pr-0 lg:pr-4 flex flex-col justify-center"
                            initial="hidden"
                            whileInView="visible"
                            variants={textVariants}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl md:text-5xl lg:text-5xl font-base mb-2">
                                Whare Every <br />
                                Journey Tells a <br />
                                Story
                            </h2>
                            <p className="mt-4 text-black text-left leading-relaxed max-w-xl">
                                Beyond the map, beyond the miles—travel is a feeling, a rhythm, a story waiting to unfold. From misty highlands to golden shores, we don’t just take you places—we awaken your sense of wonder. Whether you’re a soul that roams or a dreamer taking your first step, let’s journey together, discovering the magic of the Pearl of the Indian Ocean.
                            </p>
                        </motion.div>

                        {/* Image Section */}
                        <motion.div
                            className="w-full lg:w-1/3 mt-6 lg:mt-0 flex justify-center"
                            initial="hidden"
                            whileInView="visible"
                            variants={textVariants}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            <motion.img
                                src={JourneyImage}
                                alt="JourneyImage"
                                className="w-full md:w-3/4 lg:w-full h-auto rounded-lg"
                                whileHover="hover"
                                variants={hoverVariants}
                            />
                        </motion.div>
                    </div>
                </div>

                {/* Voices Behind Our Stories Section */}
                <section className="text-center py-10 px-10 md:py-28">
                    <div className="text-center my-2">
                        <motion.h2
                            className="text-4xl md:text-5xl lg:text-6xl font-base mb-10 md:mb-20"
                            initial="hidden"
                            whileInView="visible"
                            variants={textVariants}
                            transition={{ duration: 0.8 }}
                        >
                            The voices behind our stories
                        </motion.h2>
                    </div>
                    <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 max-w-5xl mx-auto text-center">
                        {[
                            { name: "Sheli Rashmika", img: voice1 },
                            { name: "Hassaja Rathnayake", img: voice2 },
                            { name: "Shivani Paliwal", img: voice3 },
                        ].map((person, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-lg overflow-hidden w-full md:w-1/3 mb-6 md:mb-0"
                                initial="hidden"
                                whileInView="visible"
                                variants={textVariants}
                                transition={{ duration: 0.8, delay: index * 0.3 }}
                            >
                                <motion.img
                                    src={person.img}
                                    alt={person.name}
                                    className="w-full h-60 md:h-80 object-cover"
                                    whileHover="hover"
                                    variants={hoverVariants}
                                />
                                <div className="text-center p-4">
                                    <h3 className="text-lg font-base">{person.name}</h3>
                                    <div className="flex justify-center gap-4 md:gap-7 mt-3 mb-2 text-2xl text-black">
                                        <FaInstagram />
                                        <FaTiktok />
                                        <FaFacebook />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
                <Footer />
            </div>
        </>
    );
};

export default AboutUs;