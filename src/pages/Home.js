import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const Home = () => {
  const [restaurants, setRestaurant] = useState([]);

  const fetchAllRestaurants = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8080/restaurant/findAll"
      );
      setRestaurant(response.data);
    } catch (error) {
      console.error("Something went wrong while fetching courses", error);
    }
  };
  useEffect(() => {
    fetchAllRestaurants();
  }, []);

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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-6 mt-40">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id} // Ensure each card has a unique key
            className="max-w-md mx-auto bg-gray-950/60 border border-gray-900 rounded-3xl p-4 shadow-lg mt-5"
          >
            <img
              src={
                restaurant.image
              }
              alt={restaurant.name}
              className="w-full h-50 object-cover rounded-t-lg"
            />
            <h3 className="text-lg font-semibold mt-2 text-white">
              {restaurant.name}
            </h3>
            <p className="text-gray-200 mt-1">
              {restaurant.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
