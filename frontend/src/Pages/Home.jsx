import React from "react";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HomePackageCat from "../components/HomePackageCat";
import Description from "../components/Description";
import FindPackages from "../components/FindPackages";

const Home = () => {
  return (
    <>
      <Navbar fontColor="text-white" />
      <Hero />
      <HomePackageCat />
      <Carousel />
      <Description />
      <FindPackages />
      <Footer />
    </>
  );
};

export default Home;
