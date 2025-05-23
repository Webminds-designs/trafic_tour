import React from "react";
import PackageCatCards from "./PackageCatCards";
import img3 from "../assets/pack03.jpg";
import img2 from "../assets/pack02.png";
import img1 from "../assets/pack01.png";
import { motion } from "framer-motion";
import dancer from "../assets/dancer.png";
import { Link } from "react-router-dom";

const HomePackageCat = () => {
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
    <div className="relative font-CodeNext-regular z-10 w-full h-min-screen flex flex-col justify-center items-center p-6 md:px-24">
      <div className="relative">
        {/* Header Section */}
        <div className="w-full h-auto md:h-96  bg-white flex flex-col md:flex-row justify-between mb-8 pt-20">
          <motion.p className="flex text-base md:text-lg lg:text-lg w-full md:w-1/2 lg:w-[500px] text-black  "
            initial="hidden"
            whileInView="visible"
            variants={textVariants}
            transition={{ duration: 0.8 }}>
            Step into a land where ancient heritage meets stunning landscapes.
            From misty mountains to sun-kissed beaches, every destination has a
            story to tell. Immerse yourself in a journey of culture, adventure,
            and unforgettable memories, carefully curated for an extraordinary
            experience.
          </motion.p>
          <motion.div className="flex text-3xl md:text-5xl lg:text-6xl w-full md:w-1/2 lg:w-[720px] text-black  justify-end text-right p-4"
            initial="hidden"
            whileInView="visible"
            variants={textVariants}
            transition={{ duration: 0.8 }}>
            Unveil Destinations Beyond Dreams
          </motion.div>
        </div>
        {/* Dancer img */}
        <div
          className="absolute inset-0 bg-cover opacity-25 z-0 left-0 top-30 md:w-[400px] md:h-[600px] w-[300px] h-[500px]"
          style={{
            backgroundImage: `url(${dancer})`,
            backgroundPosition: "",
            backgroundSize: "cover",
          }}
        />
        {/* Packages Grid */}
        <div className="relative z-10 w-full h-full align-middle grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-20">
          {/* Always visible card (Mobile and up) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={textVariants}
            transition={{ duration: 0.8 }}>
            <PackageCatCards
              packageItem={{
                title: "Classic Sri Lankan Tour",
                description:
                  "Experience the serenity of hill stations with our exclusive packages.",
                imageUrl: img3,
              }}
            />
          </motion.div>
          {/* Second card - hidden on mobile */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={textVariants}
            transition={{ duration: 0.8 }}>
            <div className="hidden md:block">
              <PackageCatCards
                packageItem={{
                  title: "Coastal Escape",
                  description:
                    "Experience the serenity of hill stations with our exclusive packages.",
                  imageUrl: img1,
                }}
              />
            </div>
          </motion.div>
          {/* Third card - hidden on mobile */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={textVariants}
            transition={{ duration: 0.8 }}>
            <div className="hidden md:block">
              <PackageCatCards
                packageItem={{
                  title: "Adventure Package",
                  description:
                    "Experience the serenity of hill stations with our exclusive packages.",
                  imageUrl: img2,
                }}
              />
            </div>
          </motion.div>
        </div>
        <Link to="/packages">
          <div className="px-4 py-3 w-fit text-center bg-secondary text-white rounded-lg cursor-pointer mt-4 hover:bg-secondary-dark">
            Check more packages
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomePackageCat;
