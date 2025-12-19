import React from "react";
import { Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const panelVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "spring", stiffness: 260, damping: 30 },
  },
  exit: {
    x: "100%",
    transition: { type: "spring", stiffness: 260, damping: 30 },
  },
};

const OrderPanel = ({ orders, setOrders, onClose, onOrder }) => {
  const discount = 0.05;
  const subtotal = orders.reduce((sum, o) => sum + o.newPrice * o.qty, 0);
  const total = subtotal * (1 - discount);

  /* ===================== FIXED HANDLERS ===================== */

  const handleNoteChange = (id, size, value) => {
    setOrders(prev =>
      prev.map(o =>
        o.id === id && o.size === size ? { ...o, note: value } : o
      )
    );
  };

  const handleRemove = (id, size) => {
    setOrders(prev => prev.filter(o => !(o.id === id && o.size === size)));
  };

  const increaseQty = (id, size) => {
    setOrders(prev =>
      prev.map(o =>
        o.id === id && o.size === size
          ? { ...o, qty: o.qty + 1 }
          : o
      )
    );
  };

  const decreaseQty = (id, size) => {
    setOrders(prev =>
      prev.map(o =>
        o.id === id && o.size === size
          ? { ...o, qty: Math.max(1, o.qty - 1) }
          : o
      )
    );
  };

  /* =========================================================== */

  return (
    <AnimatePresence>
      <motion.div
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="
          fixed top-0 right-0 z-50
          w-full sm:w-[90%] md:w-[380px] lg:w-[360px]
          h-full
          bg-slate-950
          border-l border-[#2A2A3A]
          flex flex-col
        "
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="
            fixed top-4 right-4 z-50
            w-10 h-10
            rounded-full
            bg-[#2A2A3A]
            text-white
            hover:bg-red-500
            flex items-center justify-center
            text-lg font-bold
          "
        >
          ✕
        </button>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <h2 className="text-white text-lg font-semibold mb-4">
            Orders #3456
          </h2>
           {/* ORDER TYPE */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button className="bg-[#FF9F43] text-black  hover:bg-orange-400  hover:text-black text-xs px-3 py-1.5 rounded-md font-medium">
                Dine In
              </button>
              <button className="border border-[#FF9F43] text-[#FF9F43] hover:bg-orange-400  hover:text-black text-xs px-3 py-1.5 rounded-md">
                Take away
              </button>
              <button className="border border-[#FF9F43] text-[#FF9F43] hover:bg-orange-400  hover:text-black text-xs px-3 py-1.5 rounded-md">
                Delivery
              </button>
            </div>

          {/* HEADER */}
          <div className="flex justify-between text-xs text-gray-400 mb-4">
            <span>Item</span>
            <div className="flex gap-8">
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
                      className="w-9 h-9 rounded-full"
                    />
                    <div className="min-w-0">
                      <p className="text-sm text-white truncate">
                        {item.name}
                        <span className="text-orange-400 text-xs ml-1">
                          ({item.size})
                        </span>
                      </p>
                      <p className="text-xs text-gray-400">
                        {item.newPrice.toFixed(2)} AED
                      </p>
                    </div>
                  </div>

                  {/* QTY */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => decreaseQty(item.id, item.size)}
                      className="w-6 h-6 bg-[#2A2A3A] text-white rounded"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-white">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => increaseQty(item.id, item.size)}
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
                    onChange={e =>
                      handleNoteChange(
                        item.id,
                        item.size,
                        e.target.value
                      )
                    }
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
                    onClick={() =>
                      handleRemove(item.id, item.size)
                    }
                    className="
                      w-9 h-9
                      border border-orange-400
                      rounded-md
                      flex items-center justify-center
                      text-[#FF9F43]
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
        <div className="border-t border-[#2A2A3A] p-4 text-sm">
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
            className="
              w-full
              bg-[#FF9F43]
              shadow-xl shadow-orange-500/40
              hover:bg-orange-300
              transition
              text-black
              font-semibold
              py-3
              rounded-lg
            "
          >
            Order now
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OrderPanel;
