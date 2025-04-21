import React, { useState } from "react";
import star from "../assets/star.png";
import pin from "../assets/pin.png";
import telephone from "../assets/telephone.png";
import emailwhite from "../assets/emailwhite.png";
import pinwhite from "../assets/pinwhite.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import review from "../assets/review/review.png";
import review1 from "../assets/review/review1.png";
import review2 from "../assets/review/review2.png";
import review3 from "../assets/review/review3.png";
import review4 from "../assets/review/review4.png";
import api from "../services/api";

const reviews = [
  {
    text: "Absolutely breathtaking! The climb is challenging, but the views from the top are worth every step. The frescoes and lion's paws are a must-see!",
    name: "Sam Vorona",
    location: "Visited from London",
    image: review1,
  },
  {
    text: "Sigirya Rock was fun climbing . The mirror wall was intersting in that painting s centuries old have been discovered.",
    name: "Arunas Pleckaitis",
    location: "From Sydney, Australia",
    image: review,
  },
  {
    text: "Any visitor must visit to this city to see this town's beauty and feel the ancient culture & never forget to short visit to kandy view point.",
    name: "Wasana Rathnayaka",
    location: "Local Guide",
    image: review3,
  },
  {
    text: "Historical monument. Have a panoramic view of the Galle harbour, sea and the city. Best time to visit this place is during the evening to watch the mesmerizing sunsets",
    name: "Jodi Billings",
    location: "Journeyed from Germany",
    image: review2,
  },
  {
    text: "It's a truly special place. Climbing up the steps to the temple in a pouring rain made it feel like a pilgrimage. The ancient caves and statues really bear the Buddhist spirit.",
    name: "Nelly Papazova",
    location: "Dambulla Royal Cave Temple",
    image: review4,
  },
];

const Footer = () => {
  const [form, setForm] = useState({ name: "", email: "", postalCode: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/subscriptions", form, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setMessage("Subscription successful!");
      setForm({ name: "", email: "", postalCode: "" });
    } catch (error) {
      setMessage(
        error.response?.data?.error || "Something went wrong. Please try again."
      );
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };
  return (
    <div className="bg-black text-white ">
      <div className=" mx-auto md:px-24 px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start  lg:items-center">
          <div className=" lg:w-1/4 mb-8 lg:mb-0">
            <div className="justify-center">
              <h2 className="text-lg font-light mb-4 text-center sm:text-left">
                Subscribe to learn about our latest news, <br /> updates, and
                adventures.
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4 mx-5">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your First Name"
                  className="w-full p-4 bg-neutral-900 rounded-2xl"
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Your Email"
                  className="w-full p-4 bg-neutral-900 rounded-2xl"
                />
                <input
                  type="text"
                  name="postalCode"
                  value={form.postalCode}
                  onChange={handleChange}
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
              <div className="text-center mt-3">
                {" "}
                {message && <p>{message}</p>}
              </div>
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
              <span className="ml-2 text-lg font-medium text-white">
                Google
              </span>
            </div>

            <div className="hidden lg:block">
              <Slider {...settings}>
                {reviews.map((review, index) => (
                  <div key={index} className="z-40">
                    <div className="text-[40px] z-40 font-light mb-12 ">
                      {review.text}
                    </div>
                    <div className="flex items-center my-7">
                      <img
                        src={review.image}
                        alt="Profile"
                        className="w-12 h-12 rounded-2xl mr-4"
                      />
                      <div className="m-2">
                        <p className="font-normal ">{review.name}</p>
                        <p className="flex text-sm text-gray-500">
                          <img
                            src={pin}
                            alt="pin"
                            width={15}
                            height={15}
                            className="m-2"
                          />
                          <span className="m-1"> {review.location}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-start mx-6 lg:items-center">
          <div></div>
          <div className="grid md:grid-cols-4 grid-cols-4 lg:grid-cols-4 md:gap-16 gap-0 border-t border-neutral-700">
            {[
              {
                title: "Packages",
                links: [
                  { name: "Cultural", url: "/packages" },
                  { name: "Romantic", url: "/packages" },
                  { name: "Adventure", url: "/packages" },
                  { name: "Education", url: "/packages" },
                  { name: "All Packages", url: "/packages" },
                ],
              },
              {
                title: "Sites",
                links: [
                  {
                    name: "Galle",
                    url: "https://maps.app.goo.gl/wXHTPKMcFhJ8T9iy8",
                  },
                  {
                    name: "Colombo",
                    url: "https://maps.app.goo.gl/dUbs66EiaWL1TrUM9",
                  },
                  {
                    name: "Unawatuna",
                    url: "https://maps.app.goo.gl/2hzSdfft5YZvmmbS7",
                  },
                  {
                    name: "Adam's Peak",
                    url: "https://maps.app.goo.gl/ReJ38ygADuZ39fxF9",
                  },
                  {
                    name: "Temple of the Tooth",
                    url: "https://maps.app.goo.gl/LcJ7TbvRCJQzpQwB9",
                  },
                ],
              },
              {
                title: "Policies",
                links: [
                  { name: "Privacy Policy", url: "/policies?tab=Privacy%20Policy" },
                  { name: "Return & Refund Policy", url: "/policies?tab=Return%20%26%20Refund%20Policy" },
                  { name: "Terms & Conditions", url: "/policies?tab=Terms%20%26%20Conditions" },
                ],
              },
              {
                title: "Traffic Tours",
                links: [
                  { name: "FAQ", url: "/contact-us" },
                  { name: "Service", url: "/about-us" },
                  { name: "Contact", url: "/contact-us" },
                  { name: "Resources", url: "/about-us" },
                ],
              },
            ].map((section, index) => (
              <div key={index} className="mt-4">
                <h3 className="font-light text-neutral-400 mb-4">
                  {section.title}
                </h3>
                <ul className="font-extralight">
                  {section.links.map((link, i) => (
                    <li key={i} className="hover:text-gray-300 cursor-pointer">
                      <a href={link.url} className="text-inherit">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-8">
          <div className="flex flex-col lg:flex-row justify-between">
            <div className=" lg:mb-0">
              <h1 className="text-2xl">
                TRAFFIC TOURES & TRANSPORTERS (PVT) LTD
              </h1>
              <div className="space-y-1 mt-5">
                <p className="flex md:text-[17px] text-[12px]">
                  {" "}
                  <div className="border-[1px] border-neutral-600 rounded-full mr-2">
                    {" "}
                    <img
                      src={telephone}
                      alt="telephone"
                      width={10}
                      height={10}
                      className="m-2"
                    />{" "}
                  </div>
                  +94 76 785 7066
                </p>
                <p className="flex md:text-[17px] text-[12px]">
                  {" "}
                  <div className="border-[1px] border-neutral-600  rounded-full mr-2">
                    {" "}
                    <img
                      src={emailwhite}
                      alt="emailwhite"
                      width={10}
                      height={10}
                      className="m-2"
                    />{" "}
                  </div>{" "}
                  traffictoures999@gmail.com
                </p>
                <p className="flex md:text-[17px] text-[12px]">
                  {" "}
                  <div className="border-[1px] border-neutral-600  rounded-full mr-2">
                    {" "}
                    <img
                      src={pinwhite}
                      alt="pinwhite"
                      width={10}
                      height={10}
                      className="m-2"
                    />{" "}
                  </div>{" "}
                  232/1/1, 2nd Floor, 'Laksiri Building', High Level Road,
                  Waththegedara, Maharagama
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 flex pt-8 px-4">
            <div className="font-extralight text-gray-400 text-[10px] text-center md:text-left">
              Traffic Tours provides the information on this website for general
              purposes only. We do not guarantee the accuracy, reliability, or
              availability of the content, products, or services. Any reliance
              on this information is at your own risk. We are not responsible
              for any loss or damage resulting from the use of this site.
            </div>
          </div>

          <div className="w-full md:w-1/2 flex justify-between p-10 flex-col md:flex-row px-4">
            <div>
              {/* <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-5">
                <div className="flex space-x-4">
                  <div>Cookies</div>
                  <div>Terms</div>
                  <div>Privacy Policy</div>
                </div>
              </div> */}
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
