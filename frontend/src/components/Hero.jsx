import React from "react";
import video from "../assets/LANDING.mp4";

const Hero = () => {
  return (
    <section className="flex flex-col items-start justify-end h-screen bg-hero-pattern bg-cover bg-center bg-no-repeat bg-black">
      <video
        className="w-full h-screen object-cover opacity-70"
        src={video}
        autoPlay
        loop
        muted
      ></video>
      <div className="absolute h-2/3 flex flex-col items-start justify-end z-10 text-start w-full md:w-2/3 lg:w-[800px] px-4 md:px-12 gap-8 py-8">
        <div>
          <h1 className="w-2/3 text-4xl md:text-4xl  font-bold  text-white font-CodeNext-regular">
            A winbow to New Adventure
          </h1>
          <hr className="w-1/3 border-white" />
        </div>
        <p className="text-white text-sm md:text-lg font-CodeNext-regular">
          The path to discovery is limitless, ofering views of landscapes yet to
          be explored. Every journey starts with curiosity, and TRAFIC TOURS is
          here to turn that curiosity into unforgettable experiences.
        </p>
        <div className="px-4 py-2 text-sm bg-white rounded-3xl font-bold hover:bg-black hover:text-white cursor-pointer transform transition duration-300">
          Start your advanture
        </div>
      </div>
    </section>
  );
};

export default Hero;
