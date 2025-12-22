// Receipt.jsx
import React from "react";

const Receipt = ({
  show,
  onClose,
  orders,
  subtotal,
  discount,
  total,
  dateTime,
  dineType,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 text-white">
      <div className="relative w-full max-w-sm sm:max-w-md bg-[#1B1B2B] rounded-2xl border border-[#2A2A3A]">

        {/* CLOSE ICON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-[#2A2A3A] text-gray-300 hover:bg-red-500 hover:text-white transition"
        >
          ✕
        </button>

        {/* HEADER */}
        <div className="px-5 py-4 border-b border-[#2A2A3A] text-center">
          <h3 className="text-[25px] font-semibold">Order Receipt</h3>
          <p className="text-green-400 text-sm">Thank you for your order</p>
          <p className="text-gray-400 text-xs mt-1">
            {dateTime.toLocaleString()}
          </p>
        </div>

        {/* ITEMS */}
        <div className="px-5 py-4 space-y-3 max-h-60 overflow-y-auto">
          {orders.map((o, i) => (
            <div
              key={`${o.id}-${o.size}-${i}`}
              className="text-sm border-b border-[#2A2A3A] pb-2"
            >
              <div className="flex justify-between">
                <span className="text-[15px]">
                  {o.name} ({o.size}) × {o.qty}
                </span>
                <span>
                  {(o.newPrice * o.qty).toFixed(2)} AED
                </span>
              </div>

              {/* NOTE */}
              {o.note && (
                <p className="text-xs text-red-600 mt-1">
                  Note: {o.note}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* SUMMARY */}
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

        {/* DINE TYPE */}
        <div className="px-5 py-2 text-center">
          <p className="text-[#FF9F43] font-semibold text-sm">
            {dineType}
          </p>
        </div>

        {/* CLOSE BUTTON */}
        <div className="px-5 py-4">
          <button
            onClick={onClose}
            className="w-full bg-[#FF9F43] text-white  py-2.5 rounded-xl font-semibold hover:bg-orange-500 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
