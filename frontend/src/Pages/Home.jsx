import React from "react";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HomePackageCat from "../components/HomePackageCat";

const Home = () => {
  return (
    <>
      <Navbar fontColor="text-white" />
      <Hero />

      <HomePackageCat />

      <Carousel />

    </>
  );
};

export default Home;
