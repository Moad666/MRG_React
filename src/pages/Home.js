import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const [restaurants, setRestaurant] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
    fetchAllCities();
  }, []);

  // find Restaurant by City
  const fetchRestaurantsByCity = async (cityName) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8080/restaurant/findByCity/${cityName}`
      );
      if (response.data.length === 0) {
        setErrorMessage("No restaurants found");
      } else {
        setErrorMessage("");
      }
      setRestaurant(response.data);
    } catch (error) {
      console.error("Error fetching restaurants by city", error);
      setErrorMessage("No restaurants found");
    }
  };

  // fetch all cities
  const fetchAllCities = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8080/city/findAll");
      setCities(response.data);
    } catch (error) {
      console.error("Error fetching cities", error);
    }
  };

  // Handle city selection
  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setCity(selectedCity);
    if (selectedCity) {
      fetchRestaurantsByCity(selectedCity);
    } else {
      fetchAllRestaurants(); // Show all restaurants if no city is selected
    }
  };

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
        <select
          value={city}
          onChange={handleCityChange}
          className=" cursor-pointer mt-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">All Cities</option>
          {cities.map((cityObj) => (
            <option key={cityObj.id} value={cityObj.name}>
              {cityObj.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-6 mt-10">
        {errorMessage ? (
          <p className="col-span-full text-center text-xl text-gray-200">
            {errorMessage}
          </p>
        ) : (
          restaurants.map((restaurant) => (
            <motion.div
              key={restaurant.id}
              layoutId={restaurant.id}
              onClick={() => {
                setSelectedId(restaurant.id);
                setSelectedRestaurant(restaurant);
              }}
              className="max-w-md mx-auto bg-gray-950/60 border border-gray-900 rounded-3xl p-4 shadow-lg mt-5 cursor-pointer"
            >
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-50 object-cover rounded-t-lg"
              />
              <h3 className="text-lg font-semibold mt-2 text-white">
                {restaurant.name}
              </h3>
              <p className="text-gray-200 mt-1">{restaurant.description}</p>
            </motion.div>
          ))
        )}

        <AnimatePresence>
          {selectedId && selectedRestaurant && (
            <motion.div
              layoutId={selectedId}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={() => setSelectedId(null)}
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ width: "0%", height: "0%" }}
                animate={{ width: "80%", height: "80%" }}
                exit={{ width: "0%", height: "0%" }}
                className="bg-gray-800 p-6 rounded-lg shadow-xl text-white flex items-center space-x-6"
              >
                <div className="w-1/2">
                  <h2 className="text-5xl font-bold">
                    {selectedRestaurant.name}
                  </h2>
                  <p className="text-3xl text-gray-200 mt-2">
                    {selectedRestaurant.description}
                  </p>
                  <p className="mt-10">
                    Location : {selectedRestaurant.location}
                  </p>
                  <p className="mt-2">Phone : {selectedRestaurant.phone}</p>
                  <p className="mt-2">
                    Rating : {selectedRestaurant.averageRating}
                  </p>
                  <p className="mt-2">
                    Open Hours : {selectedRestaurant.ouvert} -{" "}
                    {selectedRestaurant.fermer}
                  </p>

                  <button
                    onClick={() => setSelectedId(null)}
                    className="mt-4 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600"
                  >
                    Close
                  </button>
                </div>

                <div className="w-1/2">
                  <img
                    src={selectedRestaurant.image}
                    alt={selectedRestaurant.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Home;
