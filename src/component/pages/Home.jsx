// // Secondcompact.jsx
// import React, { useEffect, useState } from "react";
// import dish1 from "../assets/dish1.svg";
// import dish2 from "../assets/dish2.svg";
// import dish3 from "../assets/dish3.svg";
// import dish4 from "../assets/dish4.svg";
// import dish5 from "../assets/dish5.svg";

// import { Search, ShoppingCart, ChevronDown } from "lucide-react";
// import OrderPanel from "./OrderPanel";
// import Sidebaritem from "./Sidebaritem";
// import CategoryTabs from "./CategoryTabs";
// import Receipt from "./Receipt";
// import DishGrid from "./DishGrid";
// import DineTypeSelector from "./DineTypeSelector";

// const dishes = [
//   { id: 1, name: "Healthy noodle with spinach leaf", oldPrice: 32, newPrice: 25, available: "22 Bowls available", image: dish1, category: "today", dine: ["Dine In", "Take Away"] },
//   { id: 2, name: "Hot spicy fried rice with omelette", oldPrice: 31, newPrice: 25, available: "13 Bowls available", image: dish2, category: "south", dine: ["Take Away"] },
//   { id: 3, name: "Spicy instant noodle with omelette", oldPrice: 42, newPrice: 32.89, available: "17 Bowls available", image: dish3, category: "today", dine: ["Dine In"] },
//   { id: 4, name: "Healthy noodle with spinach leaf", oldPrice: 32, newPrice: 25, available: "22 Bowls available", image: dish4, category: "today", dine: ["Take Away"] },
//   { id: 5, name: "Hot spicy fried rice with omelette", oldPrice: 31, newPrice: 25, available: "13 Bowls available", image: dish5, category: "south", dine: ["Dine In"] },
//   { id: 6, name: "Healthy noodle with spinach leaf", oldPrice: 32, newPrice: 25, available: "22 Bowls available", image: dish1, category: "today", dine: ["Take Away"] },
//   { id: 7, name: "Hot spicy fried rice with omelette", oldPrice: 31, newPrice: 25, available: "13 Bowls available", image: dish2, category: "today", dine: ["Dine In"] },
//   { id: 8, name: "Spicy instant noodle with omelette", oldPrice: 42, newPrice: 32.89, available: "17 Bowls available", image: dish3, category: "south", dine: ["Take Away"] },
//   { id: 9, name: "Healthy noodle with spinach leaf", oldPrice: 32, newPrice: 25, available: "22 Bowls available", image: dish4, category: "our", dine: ["Dine In"] },
//   { id: 10, name: "Hot spicy fried rice with omelette", oldPrice: 31, newPrice: 25, available: "13 Bowls available", image: dish5, category: "today", dine: ["Dine In"] },
//   { id: 11, name: "Hot spicy fried rice with omelette", oldPrice: 31, newPrice: 25, available: "13 Bowls available", image: dish2, category: "south", dine: ["Dine In"] },
//   { id: 12, name: "Spicy instant noodle with omelette", oldPrice: 42, newPrice: 32.89, available: "17 Bowls available", image: dish3, category: "our", dine: ["Take Away"] },
//   { id: 13, name: "Healthy noodle with spinach leaf", oldPrice: 32, newPrice: 25, available: "22 Bowls available", image: dish4, category: "today", dine: ["Dine In", "Take Away"] },
//   { id: 14, name: "Hot spicy fried rice with omelette", oldPrice: 31, newPrice: 25, available: "13 Bowls available", image: dish5, category: "south", dine: ["Dine In", "Take Away"] },
//   { id: 15, name: "Healthy noodle with spinach leaf", oldPrice: 32, newPrice: 25, available: "22 Bowls available", image: dish1, category: "our", dine: ["Dine In", "Take Away"] },
//   { id: 16, name: "Hot spicy fried rice with omelette", oldPrice: 31, newPrice: 25, available: "13 Bowls available", image: dish2, category: "today", dine: ["Dine In", "Take Away"] },
//   { id: 17, name: "Spicy instant noodle with omelette", oldPrice: 42, newPrice: 32.89, available: "17 Bowls available", image: dish3, category: "south", dine: ["Dine In", "Take Away"] },
//   { id: 18, name: "Healthy noodle with spinach leaf", oldPrice: 32, newPrice: 25, available: "22 Bowls available", image: dish4, category: "our", dine: ["Dine In", "Take Away"] },
//   { id: 19, name: "Hot spicy fried rice with omelette", oldPrice: 31, newPrice: 25, available: "13 Bowls available", image: dish5, category: "today", dine: ["Dine In", "Take Away"] },
// ];

// const Home = () => {
//   const [orders, setOrders] = useState([]);
//   const [showOrderPanel, setShowOrderPanel] = useState(false);
//   const [showReceipt, setShowReceipt] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [dateTime, setDateTime] = useState(new Date());
//   const [dineType, setDineType] = useState("Dine In");
//   const [showDine, setShowDine] = useState(false);
//   const [activeCategory, setActiveCategory] = useState("today");
//   const [selectedSizes, setSelectedSizes] = useState({});
//   const [addedDishes, setAddedDishes] = useState({});
//   const [notification, setNotification] = useState("");

//   useEffect(() => {
//     const t = setInterval(() => setDateTime(new Date()), 1000);
//     return () => clearInterval(t);
//   }, []);

//   const addToOrder = (dish, size) => {
//     if (!size) {
//       setNotification("Please select a size first!");
//       setTimeout(() => setNotification(""), 2000);
//       return;
//     }

//     setOrders((prev) => {
//       const existing = prev.find((o) => o.id === dish.id && o.size === size);
//       if (existing) {
//         return prev.map((o) =>
//           o.id === dish.id && o.size === size ? { ...o, qty: o.qty + 1 } : o
//         );
//       }
//       return [...prev, { ...dish, qty: 1, size }];
//     });

//     setAddedDishes((prev) => ({ ...prev, [`${dish.id}-${size}`]: true }));

//     setNotification("Your order successfully added!");
//     setTimeout(() => setNotification(""), 2000);
//   };

//   const totalItems = orders.reduce((a, o) => a + o.qty, 0);
//   const subtotal = orders.reduce((a, o) => a + o.newPrice * o.qty, 0);
//   const discount = 0.05;
//   const total = subtotal * (1 - discount);

//   const filteredDishes = dishes.filter(
//     (d) =>
//       (activeCategory === "all" || d.category === activeCategory) &&
//       d.dine.includes(dineType) &&
//       d.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="bg-slate-900 min-h-screen">
//       < className="max-w-[1600px] mx-auto flex relative pl-[72px] main-layout">
//         <Sidebaritem />

//         <div className="flex-1 flex relative">
//           <main
//   className={`flex-1 p-4 sm:p-6 lg:p-8 text-white pt-[260px] ${
//     showOrderPanel ? "mr-[350px]" : ""
//   }`}
// >

//             {/* NOTIFICATION */}
//             {notification && (
//               <div
//                 className={`fixed top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded z-50 ${
//                   notification.includes("success")
//                     ? "bg-green-600"
//                     : "bg-red-600"
//                 }`}
//               >
//                 {notification}
//               </div>
//             )}

//             {/* HEADER */}
//             <div className="fixed top-0 right-0 bg-slate-900 px-6 py-4 z-40 header-offset ">
//               <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
//                 <div>
//                   <h1 className="text-3xl font-semibold">Chef Kitchen</h1>
//                   <p className="text-gray-400 text-sm">
//                     {dateTime.toLocaleString()}
//                   </p>
//                 </div>

//                 <div className="flex items-center gap-4">
//                   <div className="flex items-center bg-[#1A1A2D] px-4 py-2 rounded-lg">
//                     <Search size={18} />
//                     <input
//                       className="ml-2 bg-transparent outline-none"
//                       placeholder="Search food..."
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                     />
//                   </div>

//                   <button
//                     onClick={() => setShowOrderPanel(true)}
//                     className="relative w-12 h-12 bg-[#FF9F43] rounded-xl flex items-center justify-center"
//                   >
//                     <ShoppingCart />
//                     {totalItems > 0 && (
//                       <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
//                         {totalItems}
//                       </span>
//                     )}
//                   </button>
//                 </div>
//               </div>

//               <CategoryTabs
//   activeCategory={activeCategory}
//   setActiveCategory={setActiveCategory}
// />


// <DineTypeSelector
//   dineType={dineType}
//   setDineType={setDineType}
//   showDine={showDine}
//   setShowDine={setShowDine}
// />

// {filteredDishes.length === 0 ? (
//   <p className="text-gray-400 mt-10">
//     {searchQuery
//       ? `No dishes found for "${searchQuery}"`
//       : "No dishes available for this category."}
//   </p>
// ) : (
//   <DishGrid
//     dishes={filteredDishes}
//     showOrderPanel={showOrderPanel}
//     selectedSizes={selectedSizes}
//     setSelectedSizes={setSelectedSizes}
//     addedDishes={addedDishes}
//     addToOrder={addToOrder}
//   />
// )}


//             </div>
//           </main>
//           {/* ORDER PANEL */}
//           {showOrderPanel && (
//             <div className="w-[400px] fixed right-0 top-0 h-full z-40 transition-transform duration-300">
//               <OrderPanel
//                 orders={orders}
//                 setOrders={setOrders}
//                 onClose={() => setShowOrderPanel(false)}
//                 onOrder={() => {
//                   if (orders.length === 0) return alert("Add items first!");
//                   setShowReceipt(true);
//                   setShowOrderPanel(false);
//                 }}
//               />
//             </div>
//           )}
//         </div>
//                  <Receipt
//   show={showReceipt}
//   onClose={() => setShowReceipt(false)}
//   orders={orders}
//   subtotal={subtotal}
//   discount={discount}
//   total={total}
//   dateTime={dateTime}
//   dineType={dineType}
// />
      
//       </div>
//     </div>
    
//   );
// };
// export default Home;
import React, { useEffect, useState } from "react";
import { Search, ShoppingCart } from "lucide-react";

import OrderPanel from "./OrderPanel";
import CategoryTabs from "./CategoryTabs";
import Receipt from "./Receipt";
import DishGrid from "./DishGrid";
import DineTypeSelector from "./DineTypeSelector";
import dishes from "./dishes";
import Sidebaritem from "./Sidebaritem";

const Home = () => {
  const [orders, setOrders] = useState([]);
  const [showOrderPanel, setShowOrderPanel] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [dineType, setDineType] = useState("Dine In");
  const [showDine, setShowDine] = useState(false);
  const [activeCategory, setActiveCategory] = useState("today");
  const [selectedSizes, setSelectedSizes] = useState({});
  const [addedDishes, setAddedDishes] = useState({});
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const t = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const addToOrder = (dish, size) => {
    if (!size) {
      setNotification("Please select a size first!");
      setTimeout(() => setNotification(""), 2000);
      return;
    }

    setOrders((prev) => {
      const existing = prev.find(
        (o) => o.id === dish.id && o.size === size
      );
      if (existing) {
        return prev.map((o) =>
          o.id === dish.id && o.size === size
            ? { ...o, qty: o.qty + 1 }
            : o
        );
      }
      return [...prev, { ...dish, qty: 1, size }];
    });

    setAddedDishes((prev) => ({
      ...prev,
      [`${dish.id}-${size}`]: true,
    }));

    setNotification("Your order successfully added!");
    setTimeout(() => setNotification(""), 2000);
  };

  const totalItems = orders.reduce((a, o) => a + o.qty, 0);
  const subtotal = orders.reduce((a, o) => a + o.newPrice * o.qty, 0);
  const discount = 0.05;
  const total = subtotal * (1 - discount);

  const filteredDishes = dishes.filter(
    (d) =>
      (activeCategory === "all" || d.category === activeCategory) &&
      d.dine.includes(dineType) &&
      d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
  <div className="bg-slate-900 min-h-screen flex text-white">
    <Sidebaritem />

    {/* MAIN LAYOUT */}
    <div className="main-layout flex-1 relative">

      {/* NOTIFICATION */}
{notification && (
  <div
    className={`fixed top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded z-50 ${
      notification.toLowerCase().includes("success")
        ? "bg-green-600"
        : "bg-red-600"
    }`}
  >
    {notification}
  </div>
)}


      {/* HEADER (FIXED) */}
      <div className="fixed top-0 header-offset right-0 bg-slate-900 px-6 py-4 z-40">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">Chef Kitchen</h1>
            <p className="text-gray-400 text-sm">
              {dateTime.toLocaleString()}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center bg-[#1A1A2D] px-4 py-2 rounded-lg">
              <Search size={18} />
              <input
                className="ml-2 bg-transparent outline-none text-white"
                placeholder="Search food..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <button
              onClick={() => setShowOrderPanel(true)}
              className="relative w-12 h-12 bg-[#FF9F43] rounded-xl flex items-center justify-center"
            >
              <ShoppingCart />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* CATEGORY + DINE (FIXED) */}
      <div className="fixed top-[85px] header-offset right-0 bg-slate-900 z-30 px-6">
        <CategoryTabs
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <DineTypeSelector
          dineType={dineType}
          setDineType={setDineType}
          showDine={showDine}
          setShowDine={setShowDine}
        />
      </div>

      {/* MAIN CONTENT + ORDER PANEL */}
      <div className="flex relative transition-all duration-300">

        {/* SCROLLABLE CONTENT */}
        <main
          className={`flex-1 transition-all duration-300 ${
            showOrderPanel ? "mr-[350px]" : "mr-0"
          }`}
        >
                       <main className="flex-1 flex flex-col pt-[200px] sm:pt-[150px] px-4 sm:px-6 lg:px-8">
  {filteredDishes.length === 0 ? (
    <p className="text-gray-400 text-center mt-10">
      {searchQuery
        ? `No dishes found for "${searchQuery}"`
        : "No dishes available for this category."}
    </p>
  ) : (
    <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
      <DishGrid
        dishes={filteredDishes}
        selectedSizes={selectedSizes}
        setSelectedSizes={setSelectedSizes}
        addedDishes={addedDishes}
        addToOrder={addToOrder}
        showOrderPanel={showOrderPanel}
      />
    </div>
  )}
</main>

        </main>

        {/* ORDER PANEL */}
        {showOrderPanel && (
          <OrderPanel
            orders={orders}
            setOrders={setOrders}
            onClose={() => setShowOrderPanel(false)}
            onOrder={() => {
              if (orders.length === 0) return alert("Add items first!");
              setShowReceipt(true);
              setShowOrderPanel(false);
            }}
          />
        )}
      </div>

      {/* RECEIPT */}
      <Receipt
        show={showReceipt}
        onClose={() => setShowReceipt(false)}
        orders={orders}
        subtotal={subtotal}
        discount={discount}
        total={total}
        dateTime={dateTime}
        dineType={dineType}
      />
    </div>
  </div>
);
};

export default Home;
