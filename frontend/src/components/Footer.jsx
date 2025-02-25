import React from "react";
import star from "../assets/star.png";
import pin from "../assets/pin.png";
import telephone from "../assets/telephone.png";
import emailwhite from "../assets/emailwhite.png";
import pinwhite from "../assets/pinwhite.png";

const Footer = () => {
  return (
    <div className="bg-black text-white ">
      <div className=" mx-auto md:px-24 px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start  lg:items-center">
          <div className=" lg:w-1/4 mb-8 lg:mb-0">
            <div className="justify-center">
              <h2 className="text-lg font-light mb-4 text-center sm:text-left">
                Subscribe to learn about our latest news, <br /> updates, and adventures.
              </h2>
              <form className="space-y-4 mx-5">
                <input
                  type="text"
                  placeholder="Your First Name"
                  className="w-full p-4 bg-neutral-900 rounded-2xl"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-4 bg-neutral-900 rounded-2xl"
                />
                <input
                  type="text"
                  placeholder="Zip Code"
                  className="w-full p-4 bg-neutral-900 rounded-2xl"
                />
                <button
                  type="submit"
                  className="w-full p-4 bg-white text-black rounded-4xl"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="w-full lg:w-1/2 pt-0 mt-0 ">
            <div className="flex items-center mb-4 justify-center sm:justify-start">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <img src={star} alt="start" width={20} />
                ))}
              </div>
              <span className="ml-2 text-lg font-light">5/5 on</span>
              <span className="ml-2 text-lg font-medium text-white">Google</span>
            </div>

            <div className="hidden lg:block">
              <div className="text-[40px] font-light mb-12 ">
                “I love your build because you made it for people like us who don’t know what we’re doing. It just works.”
              </div>
              <div className="flex items-center my-7">
                <img
                  src="https://www.noovolife.com/images/roundedrectangles/rr-1.jpeg"
                  alt="Profile"
                  className="w-15 h-10 rounded-2xl mr-4"
                />
                <div className="m-2">
                  <p className="font-normal ">Jane, Traveling nurse</p>
                  <p className="flex text-sm text-gray-500">
                    <img src={pin} alt="pin" width={15} height={15} className="m-2" />
                    <span className="m-1"> Over 2700 miles traveled from Las Vegas</span>
                  </p>
                </div>
              </div>
            </div>
          </div>


        </div>
        <div className="flex flex-col lg:flex-row justify-between items-start mx-6 lg:items-center">
          <div></div>
          <div className="grid md:grid-cols-2 grid-cols-4  lg:grid-cols-4 md:gap-16 gap-0 border-t border-neutral-700 ">
            {[
              { title: "Buy", links: ["Inventory", "Rentals", "Find a Dealer"] },
              { title: "Models", links: ["The Lite", "The Pop", "The Plus"] },
              { title: "Help Me Choose", links: ["Configure", "Blog", "Events"] },
              { title: "trafic tours", links: ["FAQ", "Resources", "Service", "Contact"] }
            ].map((section, index) => (
              <div key={index} className="mt-4">
                <h3 className="font-light text-neutral-400 mb-4">{section.title}</h3>
                <ul className="font-extralight">
                  {section.links.map((link, i) => (
                    <li key={i} className="hover:text-gray-300 cursor-pointer">{link}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-8">
          <div className="flex flex-col lg:flex-row justify-between">
            <div className=" lg:mb-0">
              <h1 className="text-3xl">TRAFFIC TOURES</h1>
              <div className="space-y-1 mt-5">
                <p className="flex md:text-[17px] text-[12px]"> <div className="border-[1px] border-neutral-600 rounded-full mr-2">  <img src={telephone} alt="telephone" width={10} height={10} className="m-2" /> </div>+1(000)000-0000</p>
                <p className="flex md:text-[17px] text-[12px]"> <div className="border-[1px] border-neutral-600  rounded-full mr-2">  <img src={emailwhite} alt="emailwhite" width={10} height={10} className="m-2" /> </div> contact@traffictoures.com</p>
                <p className="flex md:text-[17px] text-[12px]"> <div className="border-[1px] border-neutral-600  rounded-full mr-2">  <img src={pinwhite} alt="pinwhite" width={10} height={10} className="m-2" /> </div> 4495 Copper Sage St Las Vegas, NV 89115</p>
              </div>

            </div>

          </div>
        </div>

        <div className="flex flex-col md:flex-row">


          <div className="md:w-1/2 flex pt-8 px-4">
            <div className="font-extralight text-gray-400 text-[10px] text-center md:text-left">
              Traffic Tours provides the information on this website for general purposes only. We do not guarantee the accuracy, reliability, or availability of the content, products, or services. Any reliance on this information is at your own risk. We are not responsible for any loss or damage resulting from the use of this site.
            </div>
          </div>


          <div className="w-full md:w-1/2 flex justify-between p-10 flex-col md:flex-row px-4">
            <div>
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-5">
                <div className="flex space-x-4">
                  <div>Cookies</div>
                  <div>Terms</div>
                  <div>Privacy Policy</div>
                </div>
              </div>
              <div className="font-light text-gray-300 mt-4 md:mt-0 text-center md:text-left">
                © 2025 Traffic Tours. All Rights Reserved.
              </div>
            </div>
            <div className="font-light text-center md:text-left mt-2">
              made by <span className="font-normal">Webminds</span>
            </div>
          </div>

        </div>


      </div>
    </div>
  );
};

export default Footer;
