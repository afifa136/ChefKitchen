import React from "react";

const DishGrid = ({
  dishes,
  showOrderPanel,
  selectedSizes,
  setSelectedSizes,
  addedDishes,
  addToOrder,
}) => {
  return (
      <div className="mt-8 sm:mt-[40px] lg:mt-[100px]">
    <div
      className={`grid grid-cols-2 sm:grid-cols-2 ${
        showOrderPanel ? "md:grid-cols-3" : "md:grid-cols-4"
      } gap-6 gap-y-14 pb-28`}
 >
      {dishes.map((dish) => {
        const sizes = ["S", "M", "L"];
        return (
          <div key={dish.id} className="bg-slate-950 p-4 rounded-2xl">
            <img
              src={dish.image}
              alt={dish.name}
              className="w-24 h-24 mx-auto -mt-12 border-3 border-gray-950 rounded-full"
            />

            <h3 className="text-sm font-semibold">{dish.name}</h3>

            <div className="text-xs mt-1">
              <span className="line-through text-red-500 mr-2">
                {dish.oldPrice} AED
              </span>
              <span className="text-green-400 font-bold">{dish.newPrice} AED</span>
            </div>

            <p className="text-gray-500 text-xs mt-1">{dish.available}</p>

            <div className="flex justify-center gap-2 mt-3">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() =>
                    setSelectedSizes((prev) => ({ ...prev, [dish.id]: s }))
                  }
                  className={`w-8 h-8 text-xs rounded-md ${
                    selectedSizes[dish.id] === s
                      ? "bg-[#FF9F43] text-black"
                      : "bg-[#24243C] hover:bg-orange-500 hover:text-black"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <button
              onClick={() => addToOrder(dish, selectedSizes[dish.id])}
              className={`w-full mt-4 py-2 rounded-lg text-sm transition ${
                addedDishes[`${dish.id}-${selectedSizes[dish.id]}`]
                  ? "bg-green-600 text-white"
                  : "bg-[#FF9F43] text-black hover:bg-orange-500"
              }`}
            >
              {addedDishes[`${dish.id}-${selectedSizes[dish.id]}`] ? "Added" : "Add"}
            </button>
          </div>
        );
      })}
    </div>
    </div>
  );
};

export default DishGrid;
