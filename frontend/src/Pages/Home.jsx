import React from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar fontColor="text-white" />
      {/* hero section with image and text  */}
      <section className="flex flex-col items-center justify-center h-screen bg-hero-pattern bg-cover bg-center bg-no-repeat bg-amber-500">
        <h1 className="text-4xl font-bold text-white">
          Welcome to our website
        </h1>
        <p className="text-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </section>
    </>
  );
};

export default Home;
