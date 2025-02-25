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
      "Galle is a historic coastal city in southern Sri Lanka, known for its well-preserved colonial architecture, stunning beaches, and vibrant culture. It is most famous for the Galle Fort, a UNESCO World Heritage Site built by the Portuguese in the 16th century and later expanded by the Dutch. The fort features cobblestone streets, charming cafés, boutique shops, and beautiful ocean views.",
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
    const interval = setInterval(nextSlide, 4000);
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
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.5 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Content */}
      
      {slides.map((slide, index) => (
  <div
    key={index}
    className={`absolute inset-0 flex top-1/3 left-20 w-2/5 text-white p-8 transition-all duration-1000 ease-in-out transform ${
      currentIndex === index
        ? "opacity-100 -translate-y-10 scale-100 " 
        : "opacity-0 translate-y-20 scale-8d0 "
    }`}
  >
    <div className="max-w-3xl">
      <h1 className="text-5xl font-bold">{slide.title}</h1>
      <p className="mt-4 text-lg">{slide.description}</p>
      <button className="bg-white m-2 p-3 text-black rounded-xl transition-transform duration-300 transform hover:scale-105">
        SEE MORE SITES
      </button>
    </div>
  </div>
))}







      {/* Slide Indicators */}
      <div className="absolute top-1/2 left-10 transform -translate-y-1/2 flex flex-col items-center gap-2">
        <div className="w-[2px] h-12 bg-white/50 p-0" />
        {slides.map((_, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`m-1 rounded-full text-center ${
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
        <div className="w-[2px] h-12 bg-white/50 p-0" />
      </div>

      {/* Image slider */}
      <div className="absolute bottom-10 left-1/2 flex top-1/2 items-center transform -translate-y-1/2 gap-4 justify-start">
        {slides.map((slide, index) => {
          return (
            <img
              key={index}
              src={slide.background}
              alt={slide.title}
              className={`object-cover rounded-2xl transition-transform duration-700 ease-in-out transform cursor-pointer ${
                index === currentIndex
                  ? "w-[260px] h-[340px] rotate-y-0 scale-110 shadow-xl opacity-100"
                  : "w-[220px] h-[240px]  hover:opacity-100 hover:scale-105 rotate-y-15"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          );
        })}
      </div>
    </div>
  );
}
