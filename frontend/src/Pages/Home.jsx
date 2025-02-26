import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HomePackageCat from "../components/HomePackageCat";

const Home = () => {
  return (
    <>
      <Navbar fontColor="text-white" />
      <Hero />
      <HomePackageCat />
    </>
  );
};

export default Home;
