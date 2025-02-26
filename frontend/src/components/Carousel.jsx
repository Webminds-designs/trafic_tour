import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: "SIGIRIYA",
    description:
      "Sigiriya, also known as the Lion's Rock, is an ancient rock fortress located in the central part of Sri Lanka. It is one of the country's most iconic landmarks and a UNESCO World Heritage site. The fortress rises nearly 200 meters above the surrounding plain and is renowned for its stunning views, rich history, and impressive architecture.",
    background:
      "https://media.istockphoto.com/id/2171272665/photo/aerial-view-of-sigiriya-lions-rock-sigiriya-or-sinhagiri-lion-rock-ancient-rock-fortress-near.jpg?s=2048x2048&w=is&k=20&c=JVyxYrOAEYQWEPhmADCiDC5P7JsWZQsgxewYohVeAYw=",
  },
  {
    title: "COLOMBO",
    description: "Colombo is the commercial capital and largest city of Sri Lanka, located on the western coast of the island. It is a bustling metropolis that blends modernity with colonial charm, featuring a mix of skyscrapers, historic buildings, and scenic coastal views. The city is known for its vibrant markets, cultural landmarks, and diverse cuisine.",
    background:
      "https://storage.googleapis.com/a1aa/image/NCQczxwXKpsFcZBwznKOWsFinhkzcJlicnQ3Mg-tyR0.jpg",
  },
  {
    title: "GALLE",
    description:
      "Galle is a historic coastal city in southern Sri Lanka, known for its well-preserved colonial architecture, stunning beaches, and vibrant culture. It is most famous for the Galle Fort, a UNESCO World Heritage Site built by the Portuguese in the 16th century and later expanded by the Dutch. The fort features and beautiful ocean views.",
    background:
      "https://images.unsplash.com/photo-1589373797397-d19670f47549?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "ADAM'S PEAK",
    description: "Adam's Peak (Sri Pada) is a sacred mountain in Sri Lanka, standing at 2,243 meters (7,359 feet) above sea level. It is a popular pilgrimage site known for the Sri Pada (Sacred Footprint) at its summit, which different religious traditions attribute to Lord Buddha, Lord Shiva, Adam, or Saint Thomas.",
    background:
      "https://storage.googleapis.com/a1aa/image/ifrnCqVsmXwBBmo_RHK5LCyInZf1LkJwuyaFjPgOzM4.jpg",
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

  // Auto-play
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
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
          <div className="absolute inset-0 bg-black/20"></div>
        </motion.div>
      </AnimatePresence>

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
                  className="md:text-5xl text-3xl font-bold overflow-hidden"
                >
                  {slide.title}
                </motion.h1>
                <div className="overflow-hidden mt-10 mb-1">
                  <motion.h1
                    key={index}
                    initial={{ opacity: 0, y: 120, scale: 1 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -80, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeIn", exit: { duration: 0.2, ease: "easeIn" } }}
                    className="overflow-hidden"
                  >
                    <p className="md:text-lg text-lg">{slide.description}</p>
                  </motion.h1>
                </div>
                <div className="   flex inset-0  justify-self-start items-center  md:mt-16">
        <button className="bg-white text-black md:mt-0 mt-4 py-3 px-6 rounded-md md:text-xl text-sm shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-2xl focus:outline-none">
          SEE MORE SITES
        </button>
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
              className={` rounded-full text-center ${index === currentIndex
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
            className={`object-cover rounded-2xl transition-transform -left-4/4 duration-700 ease-in-out transform cursor-pointer 
        ${index === currentIndex
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
