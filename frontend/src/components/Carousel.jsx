import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Adamspeak from "../assets/Carousel/Adamspeak.jpg";
import Mirissa from "../assets/Carousel/Mirissa.png";
import Ruwanweli from "../assets/Carousel/Ruwanweli.jpg";
import Temple from "../assets/Carousel/Temple.png";

const slides = [
  {
    title: "Adam's Peak",
    description:
      "Adam's Peak (Sri Pada) is a sacred mountain in Sri Lanka, standing at 2,243 meters (7,359 feet) above sea level. It is a popular pilgrimage site known for the Sri Pada (Sacred Footprint) at its summit, which different religious traditions attribute to Lord Buddha, Lord Shiva, Adam, or Saint Thomas.",
    background: Adamspeak,
  },
  {
    title: "Temple of the Tooth",
    description:
      "The Temple of the Tooth Relic, located in Kandy, Sri Lanka, is one of the most sacred Buddhist sites in the world. It houses a relic believed to be the tooth of the Buddha, attracting pilgrims and visitors from all over the globe.",
    background: Temple,
  },
  {
    title: "Mirissa Beach",
    description:
      "Mirissa, a stunning coastal town in southern Sri Lanka, is famous for its golden beaches, turquoise waters, and vibrant marine life. It is one of the best places for whale watching and offers a perfect getaway for surfers and beach lovers.",
    background: Mirissa,
  },
  {
    title: "Ruwanwelisaya Stupa",
    description:
      "The Ruwanwelisaya Stupa, located in Anuradhapura, Sri Lanka, is one of the most significant Buddhist stupas in the world. Built by King Dutugemunu in 140 B.C., it stands as a symbol of Sri Lanka's rich cultural and religious heritage.",
    background: Ruwanweli,
  },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);
  const nextIndex = (currentIndex - 1) % slides.length;

  // Auto-play
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <div className="absolute top-1/12 left-1/2 transform -translate-x-1/2 z-50 text-white bg-blend-darken text-3xl md:text-6xl font-medium drop-shadow-lg text-center hidden md:block">
        Essence of Ceylon
      </div>

      {/* Background Image Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[currentIndex].title}
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[currentIndex].background})` }}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.7 }}
          transition={{ duration: 0.1 }}
        >
          {/* Dark Overlay to Enhance Text Readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </motion.div>
      </AnimatePresence>

      {/* topic */}

      {/* Slide Content */}
      {slides.map((slide, index) => (
        <AnimatePresence mode="wait" key={index}>
          {currentIndex === index && (
            <div className="absolute inset-0 flex md:top-1/3 md:left-20 md:w-2/5 md:m-0 m-10 text-white ">
              <div className="md:max-w-3xl overflow-hidden">
                <motion.h1
                  key={index}
                  initial={{ opacity: 0, y: 40, scale: 1 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 1, y: -60, scale: 1 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="md:text-5xl text-4xl font-bold overflow-hidden"
                >
                  {slide.title}
                </motion.h1>
                <div className="overflow-hidden mt-10 mb-1">
                  <motion.h1
                    key={index}
                    initial={{ opacity: 0, y: 120, scale: 1 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -80, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeIn",
                      exit: { duration: 0.2, ease: "easeIn" },
                    }}
                    className="overflow-hidden"
                  >
                    <p className="md:text-lg text-lg">{slide.description}</p>
                  </motion.h1>
                </div>
                <div className="   flex inset-0  justify-self-start items-center  md:mt-16">
                  {/* <button className="bg-white text-black md:mt-0 mt-4 py-3 px-6 rounded-md md:text-xl text-sm shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-2xl focus:outline-none">
                    See More Sites
                  </button> */}
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      ))}

      {/* Slide Indicators */}
      <div className="absolute top-1/2 left-10 transform -translate-y-1/2  flex-col items-center hidden lg:block">
        <div className="w-[2px] h-12 bg-white/50 ml-[11px]" />
        {slides.map((_, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={` rounded-full text-center ${
                index === currentIndex
                  ? "bg-white/80 w-6 h-6"
                  : "bg-white w-3 h-3"
              }`}
            />
            {index !== slides.length - 1 && (
              <div className="w-[2px] h-12 bg-white/50 p-0" />
            )}
          </div>
        ))}
        <div className="w-[2px] h-12 bg-white/50 ml-[11px]" />
      </div>

      {/* Image slider */}

      <div className="absolute md:left-3/4 left-2/4 flex md:top-2/6 bottom-20  mr-10 transform items-center">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide.background}
            alt={slide.title}
             loading="lazy"
            className={`object-cover rounded-2xl transition-transform -left-4/4 duration-700 ease-in-out transform cursor-pointer 
        ${
          index === currentIndex
            ? "lg:w-[290px] lg:h-[380px] md:w-[240px]  md:h-[250px] w-[140px] h-[160px] scale-110 shadow-xl opacity-100 absolute"
            : "lg:w-[220px] lg:h-[240px] md:w-[210px] md:h-[200px] w-[70px] h-[70px] mx-3"
        }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
