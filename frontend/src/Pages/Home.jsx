import React from 'react'
import Footer from '../components/Footer'
import Carousel from '../components/Carousel'


import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <>
      <Navbar fontColor="text-white" />
      <Hero />
      <Carousel />
      <Footer/>
    </>
  );
};


export default Home;
