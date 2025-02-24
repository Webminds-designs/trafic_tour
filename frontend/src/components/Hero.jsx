import React from "react";
import video from "../assets/LANDING.mp4";

const Hero = () => {
  return (
    <section className="flex flex-col items-start justify-center h-screen bg-hero-pattern bg-cover bg-center bg-no-repeat bg-black">
      <video
        className="w-full h-screen object-cover opacity-70"
        src={video}
        autoPlay
        loop
        muted
      ></video>
      <div className="absolute h-2/3 flex flex-col items-start justify-center z-10 text-start w-full md:w-1/2 lg:w-[600px] px-4 md:px-24 gap-16">
        <h1 className=" text-5xl md:text-6xl font-bold  text-white">
          A WIBDOW TO NEW ADVANTURES
        </h1>
        <p className="text-white text-xl md:text-2xl">
          THE PATH TO DISCOVERY IS LIMITLESS, OFFERING VIEWS OF LANDSCAPES YET
          TO BE EXPLORED. EVERY JOURNEY STARTS WITH CURIOSITY, AND TRAFFIC TOURS
          IS HERE TO TURN THAT CURIOSITY INTO UNFORGETTABLE EXPERIENCES.
        </p>
        <div className="px-4 py-2 bg-white rounded-sm hover:bg-black hover:text-white cursor-pointer transform transition duration-300">
          START YOUR ADVENTURE
        </div>
      </div>
    </section>
  );
};

export default Hero;
