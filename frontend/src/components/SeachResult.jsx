import { useLocation } from "react-router-dom";
import PackageCard from "../components/PackageCard";
import Navbar from "./Navbar";
import Footer from "./Footer";

const SeachResult = () => {
    const location = useLocation();
    const packages = location.state?.packages || [];
  return (
   <>
   <Navbar />
   <div className="mt-10 lg:mt-30 mb-14 lg:mb-28 px-4 sm:px-6 lg:px-20">
   <div className=" bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-10 lg:mt-20">
    {packages
                  .map((packageItem) => (
                    <PackageCard
                      key={packageItem.name}
                      packageItem={packageItem} // Pass the entire package object
                      onExplore={() => console.log(`Exploring ${packageItem.name}`)}
                    />
                  ))}
                  </div>
                  </div>
                  <Footer /></>
  )
}

export default SeachResult