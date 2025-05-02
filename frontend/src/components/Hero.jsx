import React from "react";
import video from "../assets/0501.mp4";
import { motion } from "framer-motion";

const Hero = () => {
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
    <section className="flex flex-col items-start justify-end h-screen bg-hero-pattern bg-cover bg-center bg-no-repeat bg-black">
      <video
        className="w-full h-screen object-cover "
        src={video}
        autoPlay
        loop
        muted
       preload="none"
      ></video>

      <motion.div
        className="absolute font-codeNext-r h-2/3 flex flex-col items-start justify-end z-10 text-start w-full md:w-1/2 lg:w-[600px] px-4 md:px-24 gap-8 my-6 "
        initial="hidden"
        whileInView="visible"
        variants={textVariants}
        transition={{ duration: 0.5 }}
      >
        <h1 className=" text-5xl md:text-5xl font-bold  text-white">
          A window to new <span className="border-b-1">adventures</span>
        </h1>
        <p className="text-white text-sm md:text-sm">
          The path to discovery is limitless, offering views of landscapes yet
          to be explored. Every journey starts with curiosity, and Traffic Tours
          is here to turn that curiosity into unforgettable experiences.
        </p>
        <div className="px-4 py-2 bg-white rounded-2xl hover:bg-black mb-4 hover:text-white cursor-pointer transform transition duration-300">
          Start your Advanture
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
