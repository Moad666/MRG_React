import React from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <Navbar />
      <div className="flex flex-col items-center">
        <span className="bg-gradient-to-t from-[#c7d2fe] to-[#8678f9] bg-clip-text text-5xl text-transparent">
          Moroccan Restaurant Guide
        </span>
        <span className="bg-gradient-to-t from-[#c7d2fe] to-[#8678f9] bg-clip-text text-2xl text-transparent mt-5">
          Discover the best Moroccan restaurants around you, showcasing
          authentic flavors and exceptional dining experiences.
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 p-6 mt-40">
        <div className="max-w-md max-auto bg-gray-950/60 border border-gray-900 rounded-3xl p-4 rounded-lg shadow-lg">
          <img
            src="https://annuaire.yalaho.ma/wp-content/uploads/2016/04/44003qjPvaf.jpg"
            alt="Restaurant 1"
            className="w-full h-50 object-cover rounded-t-lg"
          />
          <h3 className="text-lg font-semibold mt-2 text-white">
            Restaurant Title 1
          </h3>
          <p className="text-gray-200 mt-1">
            A brief description of Restaurant 1, highlighting its unique dishes
            and ambiance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
