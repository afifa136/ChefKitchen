import React from "react";
import { Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const panelVariants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: { type: "spring", stiffness: 260, damping: 30 } },
  exit: { x: "100%", transition: { type: "spring", stiffness: 260, damping: 30 } },
};

const OrderPanel = ({ orders, setOrders, onClose, onOrder }) => {
  const discount = 0.05;
  const subtotal = orders.reduce((sum, o) => sum + o.newPrice * o.qty, 0);
  const total = subtotal * (1 - discount);

  const handleNoteChange = (id, value) => {
    setOrders(prev =>
      prev.map(o => (o.id === id ? { ...o, note: value } : o))
    );
  };

  const handleRemove = id => {
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  const increaseQty = id => {
    setOrders(prev =>
      prev.map(o => (o.id === id ? { ...o, qty: o.qty + 1 } : o))
    );
  };

  const decreaseQty = id => {
    setOrders(prev =>
      prev.map(o => (o.id === id ? { ...o, qty: Math.max(1, o.qty - 1) } : o))
    );
  };

  return (
    <AnimatePresence>
      {orders && (
        <motion.div
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="
            fixed top-0 right-0 z-50
            w-full sm:w-[90%] md:w-[380px] lg:w-[360px]
            h-full
            bg-[#1B1B2B]
            border-l border-[#2A2A3A]
            flex flex-col
          "
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="
              fixed top-4 right-4
              sm:top-4 sm:right-4
              z-50
              w-10 h-10
              rounded-full
              bg-[#2A2A3A]
              text-white
              hover:bg-red-500 hover:text-white
              flex items-center justify-center
              text-lg font-bold
            "
          >
            ✕
          </button>

          {/* CONTENT */}
          <div className="flex-1 overflow-y-auto scrollbar-hide p-4 sm:p-6">
            <h2 className="text-white text-lg font-semibold mb-4">
              Orders
            </h2>

            {/* ORDER TYPE */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button className="bg-orange-400 text-black text-xs px-3 py-1.5 rounded-md font-medium">
                Dine In
              </button>
              <button className="border border-orange-400 text-orange-400 text-xs px-3 py-1.5 rounded-md">
                Take away
              </button>
              <button className="border border-orange-400 text-orange-400 text-xs px-3 py-1.5 rounded-md">
                Delivery
              </button>
            </div>

            {/* TABLE HEADER */}
            <div className="flex justify-between text-xs text-gray-400 mb-4">
              <span>Item</span>
              <div className="flex gap-6 sm:gap-8">
                <span>Qty</span>
                <span>Price</span>
              </div>
            </div>

            {/* ITEMS */}
            <div className="space-y-5">
              {orders.map(item => (
                <div key={`${item.id}-${item.size}`}>
                  <div className="flex justify-between items-center gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                      <div className="min-w-0">
                        <p className="text-sm text-white truncate max-w-[150px] sm:max-w-[180px]">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {item.newPrice.toFixed(2)} AED
                        </p>
                      </div>
                    </div>

                    {/* QTY */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="w-6 h-6 bg-[#2A2A3A] text-white rounded"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-white">{item.qty}</span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="w-6 h-6 bg-[#2A2A3A] text-white rounded"
                      >
                        +
                      </button>
                    </div>

                    <p className="text-sm text-white w-12 text-right shrink-0">
                      {(item.newPrice * item.qty).toFixed(2)}
                    </p>
                  </div>

                  {/* NOTE + DELETE */}
                  <div className="flex gap-3 mt-3">
                    <input
  value={item.note || ""}
  onChange={e => handleNoteChange(item.id, e.target.value)}
  placeholder="Order Note..."
  className="
    flex-1
    bg-[#2A2A3A]
    text-xs text-gray-300
    px-3 py-2
    rounded-md
    outline-none
  "
/>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="
                        w-9 h-9
                        border border-orange-400
                        rounded-md
                        flex items-center justify-center
                        text-orange-400
                        hover:bg-orange-400 hover:text-black
                        transition
                      "
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SUMMARY */}
          <div className="border-t border-[#2A2A3A] bg-[#1B1B2B] p-4 text-sm">
            <div className="flex justify-between text-gray-400 mb-2">
              <span>Discount</span>
              <span>{discount * 100}%</span>
            </div>

            <div className="flex justify-between text-gray-300 mb-4">
              <span>Sub total</span>
              <span>{total.toFixed(2)} AED</span>
            </div>

            <button
              onClick={onOrder}
              className="w-full bg-orange-400 shadow-xl shadow-orange-500/40 hover:bg-orange-300 transition text-black font-semibold py-3 rounded-lg"
            >
              Order now
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OrderPanel;
