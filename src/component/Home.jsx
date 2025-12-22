import React, { useEffect, useState } from "react";
import { Search, ShoppingCart } from "lucide-react";

import OrderPanel from "./OrderPanel";
import CategoryTabs from "./CategoryTabs";
import Receipt from "./Receipt";
import DishGrid from "./DishGrid";
import DineTypeSelector from "./DineTypeSelector";
import Sidebaritem from "./Sidebaritem";
import dishes from "./dishes";

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

  /* CLOCK */
  useEffect(() => {
    const t = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  /* ADD TO ORDER (DINE TYPE SAFE) */
  const addToOrder = (dish, size) => {
    if (!size) {
      setNotification("Please select a size first!");
      setTimeout(() => setNotification(""), 2000);
      return;
    }

    setOrders((prev) => {
      const existing = prev.find(
        (o) =>
          o.id === dish.id &&
          o.size === size &&
          o.dineType === dineType
      );

      if (existing) {
        return prev.map((o) =>
          o.id === dish.id &&
          o.size === size &&
          o.dineType === dineType
            ? { ...o, qty: o.qty + 1 }
            : o
        );
      }

      return [
        ...prev,
        {
          ...dish,
          qty: 1,
          size,
          dineType,
        },
      ];
    });

    setAddedDishes((prev) => ({
      ...prev,
      [`${dish.id}-${size}`]: true,
    }));

    setNotification("Your order successfully added!");
    setTimeout(() => setNotification(""), 2000);
  };

  /* TOTALS */
  const totalItems = orders.reduce((a, o) => a + o.qty, 0);
  const subtotal = orders
    .filter((o) => o.dineType === dineType)
    .reduce((a, o) => a + o.newPrice * o.qty, 0);

  const discount = 0.05;
  const total = subtotal * (1 - discount);

  /* FILTER DISHES */
  const filteredDishes = dishes.filter(
    (d) =>
      (activeCategory === "all" || d.category === activeCategory) &&
      d.dine.includes(dineType) &&
      d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-slate-900 min-h-screen flex text-white">
      <Sidebaritem />

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

        {/* HEADER */}
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

        {/* CATEGORY + DINE */}
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

        {/* CONTENT */}
        <div className="flex relative transition-all duration-300">
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
              dineType={dineType}
              setDineType={setDineType}
              onClose={() => setShowOrderPanel(false)}
              onOrder={() => {
                if (
                  orders.filter((o) => o.dineType === dineType)
                    .length === 0
                )
                  return alert("Add items first!");

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
          orders={orders.filter((o) => o.dineType === dineType)}
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
