import { useLocation } from "react-router-dom";
import PackageCard from "../components/PackageCard";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";

const SeachResult = () => {
  // Animation variants for text
  const textVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  // Hover animation for images
  const hoverVariants = {
    hover: { scale: 1.05, transition: { duration: 0.8 } },
  };
  const location = useLocation();
  const packages = location.state?.packages || [];
  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row justify-between items-center px-4 sm:px-6 lg:px-20">
  <motion.div
    className="text-left pt-10 lg:pt-30 pb-6 lg:pb-14"
    initial="hidden"
    whileInView="visible"
    variants={textVariants}
    transition={{ duration: 0.8 }}
  >
    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-base m-1">
      <span className="border-b-2">Search</span>
    </h1>
    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-base">
      Results
    </h1>
  </motion.div>
  <div className="text-right px-4 lg:px-7 pt-6">
    <motion.p
      className="text-xs sm:text-sm font-base"
      initial="hidden"
      whileInView="visible"
      variants={textVariants}
      transition={{ duration: 0.8 }}
    >
      Discover curated travel experiences across Sri Lanka based on your search. <br />
      From tropical beaches to misty mountains, find the perfect package <br />
      that matches your dream adventure.
    </motion.p>
  </div>
</div>

      <div className=" mb-14 lg:mb-28 px-4 sm:px-6 lg:px-20">
        <div className=" bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-10 lg:mt-20">
          {packages.map((packageItem) => (
            <motion.div
              key={packageItem.name}
              initial="hidden"
              whileInView="visible"
              variants={textVariants}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <PackageCard
                key={packageItem.name}
                packageItem={packageItem} // Pass the entire package object
                onExplore={() => console.log(`Exploring ${packageItem.name}`)}
              />
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SeachResult;
