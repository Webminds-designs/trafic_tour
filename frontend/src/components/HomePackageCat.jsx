import React from "react";
import PackageCatCards from "./PackageCatCards";
import img3 from "../assets/pack03.jpg";
import img2 from "../assets/pack02.png";
import img1 from "../assets/pack01.png";

const HomePackageCat = () => {
  return (
    <div className="w-full h-min-screen flex flex-col justify-center items-center p-6 md:px-24">
      {/* Header Section */}
      <div className="w-full h-auto md:h-72  bg-white flex flex-col md:flex-row justify-between mb-8 pt-20">
        <p className="flex text-base md:text-lg lg:text-lg w-full md:w-1/2 lg:w-[500px] text-black  ">
        Step into a land where ancient heritage meets stunning landscapes. From misty mountains to sun-kissed beaches, every destination has a story to tell. Immerse yourself in a journey of culture, adventure, and unforgettable memories, carefully curated for an extraordinary experience.
        </p>
        <div className="flex text-3xl md:text-5xl lg:text-6xl w-full md:w-1/2 lg:w-[720px] text-black  justify-center p-4">
        Unveil Destinations Beyond Dreams
        </div>
      </div>

      {/* Packages Grid */}
      <div className="w-full h-full align-middle grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-20">
        {/* Always visible card (Mobile and up) */}
        <PackageCatCards
          packageItem={{
            title: "Classic Sri Lankan Tour",
            description:
              "Experience the serenity of hill stations with our exclusive packages.",
            imageUrl: img3,
          }}
        />

        {/* Second card - hidden on mobile */}
        <div className="hidden md:block">
          <PackageCatCards
            packageItem={{
              title: "Coastal Escape",
              description:
                "Experience the serenity of hill stations with our exclusive packages.",
              imageUrl: img1,
            }}
          />
        </div>

        {/* Third card - hidden on mobile */}
        <div className="hidden md:block">
          <PackageCatCards
            packageItem={{
              title: "Adventure Package",
              description:
                "Experience the serenity of hill stations with our exclusive packages.",
              imageUrl: img2,
            }}
          />
        </div>
      </div>
      <div className="px-4 py-3 w-fit text-center bg-secondary text-white rounded-lg cursor-pointer mt-4 hover:bg-secondary-dark">
        Check more packages
      </div>
    </div>
  );
};

export default HomePackageCat;
