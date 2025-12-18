// Secondcompact.jsx
import React, { useEffect, useState } from "react";
import dish1 from "../assets/dish1.svg";
import dish2 from "../assets/dish2.svg";
import dish3 from "../assets/dish3.svg";
import dish4 from "../assets/dish4.svg";
import dish5 from "../assets/dish5.svg";
import logo from "../assets/logo.svg";
import home from "../assets/home.svg";
import offer from "../assets/offer.svg";
import heart from "../assets/heart.svg";
import mail from "../assets/mail.svg";
import notificationIcon from "../assets/notification.svg";
import logout from "../assets/logout.svg";

import { Search, ShoppingCart, ChevronDown } from "lucide-react";
import OrderPanel from "./OrderPanel";

const dishes = [
  { id: 1, name: "Healthy noodle with spinach leaf", oldPrice: 32, newPrice: 25, available: "22 Bowls available", image: dish1,category: "today",dine: ["Dine In", "Take Away"] },
  { id: 2, name: "Hot spicy fried rice with omelette", oldPrice: 31, newPrice: 25, available: "13 Bowls available", image: dish2 ,category: "south",dine: ["Take Away"]},
  { id: 3, name: "Spicy instant noodle with omelette", oldPrice: 42, newPrice: 32.89, available: "17 Bowls available", image: dish3,category: "today",dine: ["Dine In"] },
  { id: 4, name: "Healthy noodle with spinach leaf", oldPrice: 32, newPrice: 25, available: "22 Bowls available", image: dish4,category: "today", dine: ["Take Away"]},
  { id: 5, name: "Hot spicy fried rice with omelette", oldPrice: 31, newPrice: 25, available: "13 Bowls available", image: dish5 ,category: "south",dine: ["Dine In"]},
  { id: 6, name: "Healthy noodle with spinach leaf", oldPrice: 32, newPrice: 25, available: "22 Bowls available", image: dish1,category: "today",dine: ["Take Away"] },
  { id: 7, name: "Hot spicy fried rice with omelette", oldPrice: 31, newPrice: 25, available: "13 Bowls available", image: dish2 ,category: "today",dine: ["Dine In"]},
  { id: 8, name: "Spicy instant noodle with omelette", oldPrice: 42, newPrice: 32.89, available: "17 Bowls available", image: dish3 ,category: "south",dine: ["Take Away"]},
  { id: 9, name: "Healthy noodle with spinach leaf", oldPrice: 32, newPrice: 25, available: "22 Bowls available", image: dish4,category: "our", dine: ["Dine In"]},
  { id: 10, name: "Hot spicy fried rice with omelette", oldPrice: 31, newPrice: 25, available: "13 Bowls available", image: dish5 ,category: "today",dine: ["Dine In"]},
  { id: 11, name: "Hot spicy fried rice with omelette", oldPrice: 31, newPrice: 25, available: "13 Bowls available", image: dish2 ,category: "south",dine: ["Dine In"]},
  { id: 12, name: "Spicy instant noodle with omelette", oldPrice: 42, newPrice: 32.89, available: "17 Bowls available", image: dish3,category: "our",dine: ["Take Away"] },
  { id: 13, name: "Healthy noodle with spinach leaf", oldPrice: 32, newPrice: 25, available: "22 Bowls available", image: dish4,category: "today", dine: ["Dine In", "Take Away"]},
  { id: 14, name: "Hot spicy fried rice with omelette", oldPrice: 31, newPrice: 25, available: "13 Bowls available", image: dish5 ,category: "south",dine: ["Dine In", "Take Away"]},
  { id: 15, name: "Healthy noodle with spinach leaf", oldPrice: 32, newPrice: 25, available: "22 Bowls available", image: dish1,category: "our", dine: ["Dine In", "Take Away"]},
  { id: 16, name: "Hot spicy fried rice with omelette", oldPrice: 31, newPrice: 25, available: "13 Bowls available", image: dish2 ,category: "today",dine: ["Dine In", "Take Away"]},
  { id: 17, name: "Spicy instant noodle with omelette", oldPrice: 42, newPrice: 32.89, available: "17 Bowls available", image: dish3 ,category: "south",dine: ["Dine In", "Take Away"]},
  { id: 18, name: "Healthy noodle with spinach leaf", oldPrice: 32, newPrice: 25, available: "22 Bowls available", image: dish4,category: "our",dine: ["Dine In", "Take Away"] },
  { id: 19, name: "Hot spicy fried rice with omelette", oldPrice: 31, newPrice: 25, available: "13 Bowls available", image: dish5 ,category: "today",dine: ["Dine In", "Take Away"]},

];

const sidebarIcons = [
  { key: "home", src: home },
  { key: "offer", src: offer },
  { key: "heart", src: heart },
  { key: "mail", src: mail },
  { key: "notification", src: notificationIcon },
];

const Secondcompact = () => {
  const [activeIcon, setActiveIcon] = useState("home");
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

  const addToOrder = (dish, size = null) => {
    if (!size) {
      alert("Please select a size first!");
      return;
    }

    setOrders(prev => {
      const existing = prev.find(o => o.id === dish.id && o.size === size);
      if (existing) {
        return prev.map(o =>
          o.id === dish.id && o.size === size ? { ...o, qty: o.qty + 1 } : o
        );
      }
      return [...prev, { ...dish, qty: 1, size }];
    });

    setAddedDishes(prev => ({ ...prev, [`${dish.id}-${size}`]: true }));

    setNotification("Your order successfully added!");
    setTimeout(() => setNotification(""), 2000);
  };

  const totalItems = orders.reduce((a, o) => a + o.qty, 0);
  const subtotal = orders.reduce((a, o) => a + o.newPrice * o.qty, 0);
  const discount = 0.05;
  const total = subtotal * (1 - discount);

  const filteredDishes = dishes.filter(d =>
  d.category === activeCategory &&
  d.dine.includes(dineType) &&
  d.name.toLowerCase().includes(searchQuery.toLowerCase())
);

{filteredDishes.length === 0 && (
  <p className="text-gray-400 mt-10 text-center">
    No dishes available for {dineType}
  </p>
)}


  

  return (
    <div className="bg-[#0F0F1A] min-h-screen">
      <div className="max-w-[1600px] mx-auto flex relative">

        {/* LEFT SIDEBAR */}
        <div className="hidden lg:flex w-22 bg-[#06060c] flex-col items-center py-6 border-r border-[#252535] relative">
          <img src={logo} alt="logo" className="w-12 h-12 mb-10" />
          <div className="flex flex-col items-center gap-6 flex-1 w-full">
            {sidebarIcons.map(item => (
              <div key={item.key} className="relative w-full flex justify-center">
                {activeIcon === item.key && (
                  <>
                    <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-22 h-20 bg-[#0F0F1A] rounded-l-xl z-0" />
                    <div className="absolute -top-6 right-[-28px] w-9 h-5 bg-[#0F0F1A] z-0" />
                    <div className="absolute -top-8 right-0 w-4 h-5 bg-[#06060c] rounded-br-full" />
                    <div className="absolute -bottom-6 right-[-28px] w-9 h-5 bg-[#0F0F1A] z-0" />
                    <div className="absolute -bottom-8 right-0 w-4 h-5 bg-[#06060c] rounded-tr-full " />
                  </>
                )}
                <button
                  onClick={() => setActiveIcon(item.key)}
                  className={`relative z-10 w-14 h-14 rounded-xl flex items-center justify-center transition
                    ${activeIcon === item.key ? "bg-orange-400 shadow-xl shadow-orange-500/40" : "hover:bg-[#040413]"}`}
                >
                  <img src={item.src} alt={item.alt} className="w-6 h-6" />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-auto pt-8">
            <img src={logout} alt="logout" className="w-6 h-6 opacity-70" />
          </div>
        </div>

        {/* MAIN CONTENT + ORDER PANEL */}
        <div className="flex-1 flex relative transition-all duration-300">

          {/* MAIN CONTENT */}
          <main className={`flex-1 p-4 sm:p-6 lg:p-8 text-white transition-all duration-300 ${showOrderPanel ? "mr-[3px]" : "mr-0"}`}>

            {/* Notification */}
            {notification && (
              <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50">
                {notification}
              </div>
            )}

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-semibold">Chef Kitchen</h1>
                <p className="text-gray-400 text-sm">{dateTime.toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-[#1A1A2D] px-4 py-2 rounded-lg border border-[#2A2A40]">
                  <Search size={18} className="text-gray-400" />
                  <input
                    className="ml-2 bg-transparent text-sm outline-none text-gray-300"
                    placeholder="Search food..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
                <button
                  onClick={() => setShowOrderPanel(true)}
                  className="relative w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center"
                >
                  <ShoppingCart className="text-black" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* CATEGORY TABS */}
            <div className="mt-6 border-b border-[#2A2A40] overflow-x-auto">
              <div className="flex gap-6 sm:gap-10 min-w-max">
                {[{ key: "today", label: "Today Special" }, { key: "our", label: "Our Specials" }, { key: "south", label: "South Indian Special" }].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveCategory(tab.key)}
                    className={`relative pb-3 text-sm font-medium transition ${activeCategory === tab.key ? "text-orange-400" : "text-gray-400 hover:text-white"}`}
                  >
                    {tab.label}
                    {activeCategory === tab.key && <span className="absolute left-0 -bottom-[1px] w-full h-[2px] bg-orange-400 rounded-full" />}
                  </button>
                ))}
              </div>
            </div>

            {/* DINE TYPE */}
            <div className="flex justify-between items-center mt-8">
              <h2 className="text-lg font-semibold">Choose Dishes</h2>
              <div className="relative">
                <button
                  onClick={() => setShowDine(!showDine)}
                  className="flex items-center gap-2 bg-[#1A1A2D] px-4 py-2 rounded-lg border border-[#2A2A40] text-sm"
                >
                  {dineType}
                  <ChevronDown size={14} />
                </button>
                {showDine && (
                  <div className="absolute right-0 mt-2 bg-[#1A1A2D] rounded-lg overflow-hidden">
                    {["Dine In", "Take Away"].map(opt => (
                      
                      <button key={opt} onClick={() => { setDineType(opt); setShowDine(false); }} className="block px-4 py-2 text-sm hover:bg-[#24243C]">
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* DISH GRID */}
<div
  className={`mt-10 grid grid-cols-2 sm:grid-cols-2 ${showOrderPanel ? "md:grid-cols-3" : "md:grid-cols-4"} gap-6 gap-y-12 pb-28`}
>              {filteredDishes.map(dish => {
                const sizes = ["S","M","L"];
                return (
                  <div key={dish.id} className="bg-[#06060c] p-4 rounded-2xl">
                    <img src={dish.image} alt={dish.name} className="w-24 h-24 mx-auto -mt-14 mb-4 border-3 border-gray-950 rounded-full" />
                    <h3 className="text-sm font-semibold">{dish.name}</h3>
                    <div className="text-xs mt-1">
                      <span className="line-through text-red-500 mr-2">{dish.oldPrice} AED</span>
                      <span className="text-green-400 font-bold">{dish.newPrice} AED</span>
                    </div>
                    <p className="text-gray-500 text-xs mt-1">{dish.available}</p>

                    <div className="flex justify-center gap-2 mt-3">
                      {sizes.map(s => (
                        <button
                          key={s}
                          onClick={() => setSelectedSizes(prev => ({ ...prev, [dish.id]: s }))}
                          className={`w-8 h-8 text-xs rounded-md ${selectedSizes[dish.id] === s ? "bg-orange-500 text-black" : "bg-[#24243C] hover:bg-orange-400 hover:text-black"}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => addToOrder(dish, selectedSizes[dish.id])}
                      className={`w-full mt-4 py-2 rounded-lg text-sm transition ${addedDishes[`${dish.id}-${selectedSizes[dish.id]}`] ? "bg-green-600 text-white" : "bg-orange-500 text-black hover:bg-orange-600"}`}
                    >
                      {addedDishes[`${dish.id}-${selectedSizes[dish.id]}`] ? "Added" : "Add"}
                    </button>
                  </div>
                );
              })}
            </div>
          </main>

          {/* ORDER PANEL */}
          {showOrderPanel && (
            <div className="w-[400px] fixed right-0 top-0 h-full z-40 transition-transform duration-300">
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
            </div>
          )}
        </div>

        {/* RECEIPT */}
        {showReceipt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 text-white">
            <div className="relative w-full max-w-sm sm:max-w-md bg-[#1B1B2B] rounded-2xl border border-[#2A2A3A]">

              <button onClick={() => setShowReceipt(false)}
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-[#2A2A3A] text-gray-300 hover:bg-red-500 hover:text-white transition"
              >✕</button>

              <div className="px-5 py-4 border-b border-[#2A2A3A] text-center">
                <h3 className="text-[25px] font-semibold">Order Receipt</h3>
                <p className="text-green-400 text-sm">Thank you for your order</p>
                <p className="text-gray-400 text-xs mt-1">{dateTime.toLocaleString()}</p>
              </div>

              <div className="px-5 py-4 space-y-2 max-h-60 overflow-y-auto">
                {orders.map((o, i) => (
                  <div >
                     
                  </div>
                  
                ))}
                <div className="px-5 py-4 space-y-3 max-h-60 overflow-y-auto">
  {orders.map((o, i) => (
    <div
      key={i}
      className="text-sm border-b border-[#2A2A3A] pb-2"
    >
      <div className="flex justify-between">
        <span className="text-[15px]">
          {o.name} ({o.size}) × {o.qty}
        </span>
        <span>{(o.newPrice * o.qty).toFixed(2)} AED</span>
      </div>

      {/* NOTE SHOWN HERE */}
      {o.note && (
        <p className="text-xs text-red-600 mt-1">
          Note: {o.note}
        </p>
      )}
    </div>
  ))}
</div>

              </div>

              <div className="px-5 py-4 border-t border-[#2A2A3A] text-sm space-y-2">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>{subtotal.toFixed(2)} AED</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Discount</span>
                  <span>- {(subtotal * discount).toFixed(2)} AED</span>
                </div>
                <div className="flex justify-between font-semibold text-white text-base pt-1">
                  <span>Total</span>
                  <span>{total.toFixed(2)} AED</span>
                </div>
              </div>
              {/* DINE TYPE INFO */}
<div className="px-5 py-2 text-center">
  <p className="text-orange-400 font-semibold text-sm">
    {dineType}
  </p>
</div>

              <div className="px-5 py-4">
                <button
                  onClick={() => setShowReceipt(false)}
                  className="w-full bg-orange-400 text-black py-2.5 rounded-xl font-semibold hover:bg-orange-500 transition"
                >Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Secondcompact;
