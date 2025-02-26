import React from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import { FaFacebook, FaTiktok, FaInstagram } from "react-icons/fa";
import Navbar from "../components/Navbar";
import elephant from "../assets/elephant.png";
import girl from "../assets/girl.png";
import devil from "../assets/devil.png";
import backgroundImage from "../assets/dancers.png";
import JourneyImage from "../assets/journey.png";
import voice1 from "../assets/voice1.png";
import voice2 from "../assets/voice2.png";
import voice3 from "../assets/voice3.png";
import bring1 from "../assets/bring1.png";
import bring2 from "../assets/bring2.png";
import bring3 from "../assets/bring3.png";
import bring4 from "../assets/bring4.png";

const AboutUs = () => {
    const content = [
        {
            img: bring1,
            title: "WANDER WITHOUT LIMITS",
            text: "Let the winding roads of Sri Lanka lead you to hidden gems, from mist-kissed mountains to golden shores, as we craft journeys that speak to your soul.",
        },
        {
            img: bring2,
            title: "GUIDED BY STORIES, NOT JUST MAPS",
            text: "Travel with expert guides who unveil the heart of Sri Lanka—where every temple whispers legends, and every forest hums with life.",
        },
        {
            img: bring3,
            title: "FEAST ON FLAVORS, SAVOR THE CULTURE",
            text: "From fragrant rice & curry to the finest Ceylon tea, every bite tells a story. Join us for spice-laden adventures and market strolls where the aromas of tradition linger.",
        },
        {
            img: bring4,
            title: "WHERE ADVENTURE ROAMS WILD & FREE",
            text: "Witness the untamed beauty of Yala’s leopards, chase waterfalls in the heart of Ella, and dive into azure waters teeming with vibrant marine life.",
        },
    ];

    // Animation variants for text
    const textVariants = {
        hidden: { y: 50, opacity: 0 }, // Start below and invisible
        visible: { y: 0, opacity: 1 }, // Move up and fade in
    };

    // Hover animation for images
    const hoverVariants = {
        hover: { scale: 1.05, transition: { duration: 0.3 } }, // Scale up on hover
    };

    return (
        <>
            <Navbar />
            <div className="bg-[#C8C7C6] text-black font-sans" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                {/* Header Section */}
                <header className="text-center py-20">
                    <div
                        className="inline-block px-8 py-6 relative bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${backgroundImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <motion.h1
                            className="text-6xl font-base mt-30 relative z-20"
                            initial="hidden"
                            whileInView="visible"
                            variants={textVariants}
                            transition={{ duration: 0.8 }}
                        >
                            REFRESHINGLY SRI LANKA
                        </motion.h1>
                        <motion.p
                            className="text-lg mt-3 font-base relative z-10"
                            initial="hidden"
                            whileInView="visible"
                            variants={textVariants}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            WHERE EVERY JOURNEY FEELS LIKE A NEW DISCOVERY, BLENDING NATURE, CULTURE AND ADVENTURE IN THE HEART OF THE ISLAND
                        </motion.p>
                    </div>

                    <motion.p
                        className="text-5xl font-bold mt-6 text-[#305F7A] sinhala-text"
                        initial="hidden"
                        whileInView="visible"
                        variants={textVariants}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        ආයුබෝවන්
                    </motion.p>

                    <motion.p
                        className="text-6xl mt-10 font-base text-[#305F7A] relative"
                        initial="hidden"
                        whileInView="visible"
                        variants={textVariants}
                        transition={{ duration: 0.8, delay: 0.9 }}
                    >
                        <span className="relative inline-block">
                            A
                            <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-7xl">˜</span>
                        </span>
                        YUB
                        <span className="relative inline-block">
                            O
                            <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-7xl">˜</span>
                        </span>
                        WAN
                    </motion.p>
                </header>

                {/* Images Section */}
                <div className="flex justify-center items-center mt-8">
                    <div className="grid grid-cols-3 gap-10 p-6 mb-20 rounded-lg">
                        <motion.img
                            src={elephant}
                            alt="Elephant"
                            className="w-[400px] h-[600px] object-cover rounded-lg"
                            initial="hidden"
                            whileInView="visible"
                            whileHover="hover"
                            variants={{ ...textVariants, ...hoverVariants }}
                            transition={{ duration: 0.8 }}
                        />
                        <motion.img
                            src={girl}
                            alt="Girl"
                            className="w-[400px] h-[600px] object-cover rounded-lg"
                            initial="hidden"
                            whileInView="visible"
                            whileHover="hover"
                            variants={{ ...textVariants, ...hoverVariants }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        />
                        <motion.img
                            src={devil}
                            alt="Devil"
                            className="w-[400px] h-[600px] object-cover rounded-lg"
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
                        className="text-6xl font-base"
                        initial="hidden"
                        whileInView="visible"
                        variants={textVariants}
                        transition={{ duration: 0.8 }}
                    >
                        WHAT WE BRING TO YOU
                    </motion.h2>
                    <div className="flex flex-col items-center p-8">
                        {content.map((item, index) => (
                            <motion.div
                                key={index}
                                className="flex p-2 rounded-lg mb-12 w-full max-w-4xl"
                                style={{ backgroundColor: "rgba(155, 208, 239, 0.28)" }}
                                initial="hidden"
                                whileInView="visible"
                                variants={textVariants}
                                transition={{ duration: 0.8, delay: index * 0.3 }}
                            >
                                <motion.img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-1/3 h-40 object-cover rounded-lg"
                                    whileHover="hover"
                                    variants={hoverVariants}
                                />
                                <div className="w-2/3 pl-6 flex flex-col justify-center">
                                    <h2 className="text-4xl font-base mb-2 text-left">{item.title}</h2>
                                    <p className="text-black text-left">{item.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Journey Section */}
                <div className="flex justify-center items-center p-10">
                    <div className="flex p-3 rounded-lg max-w-7xl w-full">
                        <motion.div
                            className="w-2/3 pr-4 flex flex-col justify-center"
                            initial="hidden"
                            whileInView="visible"
                            variants={textVariants}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-6xl font-base mb-2">
                                WHERE EVERY <br />
                                JOURNEY TELLS A <br />
                                STORY
                            </h2>
                            <p className="mt-4 text-black text-left leading-relaxed max-w-xl">
                                Beyond the map, beyond the miles—travel is a feeling, a rhythm, a story waiting to unfold. From misty highlands to golden shores, we don’t just take you places—we awaken your sense of wonder. Whether you’re a soul that roams or a dreamer taking your first step, let’s journey together, discovering the magic of the Pearl of the Indian Ocean.
                            </p>
                        </motion.div>
                        <motion.div
                            className="w-1/3"
                            initial="hidden"
                            whileInView="visible"
                            variants={textVariants}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            <motion.img
                                src={JourneyImage}
                                alt="JourneyImage"
                                className="w-7xl h-[400px] rounded-lg"
                                whileHover="hover"
                                variants={hoverVariants}
                            />
                        </motion.div>
                    </div>
                </div>

                {/* Voices Behind Our Stories Section */}
                <section className="text-center py-28">
                    <div className="text-center my-2">
                        <motion.h2
                            className="text-6xl font-base mb-20"
                            initial="hidden"
                            whileInView="visible"
                            variants={textVariants}
                            transition={{ duration: 0.8 }}
                        >
                            VOICES BEHIND OUR STORIES
                        </motion.h2>
                    </div>
                    <div className="flex justify-center gap-8 max-w-5xl mx-auto text-center">
                        {[
                            { name: "SHELI RASHMIKA", img: voice1 },
                            { name: "HANSAJA RATHNAYAKE", img: voice2 },
                            { name: "SHIVANI PALIWAL", img: voice3 },
                        ].map((person, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-lg overflow-hidden w-1/3"
                                initial="hidden"
                                whileInView="visible"
                                variants={textVariants}
                                transition={{ duration: 0.8, delay: index * 0.3 }}
                            >
                                <motion.img
                                    src={person.img}
                                    alt={person.name}
                                    className="w-full h-90 object-cover"
                                    whileHover="hover"
                                    variants={hoverVariants}
                                />
                                <div className="text-center p-4">
                                    <h3 className="text-lg font-base">{person.name}</h3>
                                    <div className="flex justify-center gap-7 mt-3 mb-2 text-2xl text-black">
                                        <FaInstagram />
                                        <FaTiktok />
                                        <FaFacebook />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
};

export default AboutUs;