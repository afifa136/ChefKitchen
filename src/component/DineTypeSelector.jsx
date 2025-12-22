import React from "react";
import { ChevronDown } from "lucide-react";

const DineTypeSelector = ({ dineType, setDineType, showDine, setShowDine }) => {
  const options = ["Dine In", "Take Away", "Delivery"];

  return (
    <div className=" flex flex-1 justify-between items-center gap-4 min-w-[180px] mt-6">
      <h2 className="text-lg font-semibold">Choose Dishes</h2>

      <div className="relative">
        <button
          onClick={() => setShowDine(!showDine)}
          className="flex items-center gap-2 bg-[#1A1A2D] px-4 py-2 rounded-lg"
        >
          {dineType}
          <ChevronDown size={14} />
        </button>

        {showDine && (
          <div className="absolute right-0 mt-2 bg-[#1A1A2D] rounded-lg">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  setDineType(opt);
                  setShowDine(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-[#24243C]"
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DineTypeSelector;
