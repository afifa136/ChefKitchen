import React from "react";
import { useNavigate } from "react-router-dom";

import background from "../assets/background.png";
import foodbg from "../assets/foodbg.png";
import cooking from "../assets/cooking.svg";

const Firstcompact = () => {
  const navigate = useNavigate(); // ✅ navigation hook

  return (
    <div
      id="Header"
      className="w-full h-screen bg-cover bg-center bg-no-repeat relative flex items-center justify-center overflow-hidden"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>

      {/* Centered content */}
      <div className="flex flex-col items-center z-10 px-4 text-center">
        {/* Food image */}
        <div className="relative">
          <img
            src={foodbg}
            alt="Food Artwork"
            className="w-40 sm:w-56 md:w-72 lg:w-80 rounded-xl shadow-xl"
          />

          {/* Cooking icon overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop-blur-sm w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center shadow-lg">
            <img
              src={cooking}
              alt="Cooking Icon"
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
            />
          </div>
        </div>

        {/* Text section */}
        <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold text-white mt-4 sm:mt-6 md:mt-8 leading-tight font-serif">
          Welcome to Chef Kitchen
        </h1>

        <p className="text-gray-200 text-xs sm:text-sm md:text-base lg:text-lg mt-1 sm:mt-2 md:mt-3 max-w-[180px] sm:max-w-xs md:max-w-md leading-relaxed font-serif">
          Check out the awesome food experience! It’s super fresh, quick, and oh-so tasty.
        </p>

        {/* ✅ NAVIGATION BUTTON */}
        <button
          onClick={() => navigate("/menu")}
          className="mt-3 sm:mt-4 md:mt-5 bg-[#FF9F43] text-white w-xs  font-bold px-4 sm:px-6 py-1 sm:py-2 rounded-lg shadow-lg hover:bg-orange-300 transition"
        >
          Explore Menu
        </button>
      </div>
    </div>
  );
};

export default Firstcompact;
