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

      <div className="absolute font-codeNext h-2/3 flex flex-col items-start justify-end z-10 text-start w-full md:w-1/2 lg:w-[600px] px-4 md:px-24 gap-8">
        <h1 className=" text-5xl md:text-5xl font-bold  text-white">
        A window to new <span className="border-b-1">adventures</span>
        </h1>
        <p className="text-white text-sm md:text-sm">
        The path to discovery is limitless, offering views of landscapes yet to be explored. Every journey starts with curiosity, and Traffic Tours is here to turn that curiosity into unforgettable experiences.
        </p>
        <div className="px-4 py-2 bg-white rounded-2xl hover:bg-black hover:text-white cursor-pointer transform transition duration-300">
          Start your Advanture

        </div>
      </div>
    </section>
  );
};

export default Hero;
