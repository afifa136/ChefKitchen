import React from "react";

const CategoryTabs = ({ activeCategory, setActiveCategory }) => {
  const tabs = [
    { key: "all", label: "All" },
    { key: "today", label: "Today Special" },
    { key: "our", label: "Our Specials" },
    { key: "south", label: "South Indian Special" },
  ];

  return (
    <div className="mt-20 sm:mt-6 border-b border-[#2A2A40] overflow-x-auto no-scrollbar">
      <div className="flex gap-6 ">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveCategory(tab.key)}
          className={`pb-3 ${
            activeCategory === tab.key
              ? "text-[#FF9F43] border-b-2 border-orange-500"
              : "text-gray-400"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
    </div>
  );
};

export default CategoryTabs;
