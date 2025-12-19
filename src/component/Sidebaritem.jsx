import React from "react";
import logo from "../assets/logo.svg";
import { useNavigate, useLocation } from "react-router-dom";

// image icons (NOT components)
import HomeIcon from "../assets/home.svg";
import OfferIcon from "../assets/offer.svg";
import LikeIcon from "../assets/heart.svg";
import MaleIcon from "../assets/mail.svg";
import NotifyIcon from "../assets/notification.svg";
import ExitIcon from "../assets/logout.svg";

const Sidebaritem = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { src: HomeIcon, alt: "Home", path: "/menu" },
    { src: OfferIcon, alt: "Offers", path: "/offers" },
    { src: LikeIcon, alt: "Likes", path: "/likes" },
    { src: MaleIcon, alt: "Profile", path: "/profile" },
    { src: NotifyIcon, alt: "Notifications", path: "/notifications" },
    
  ];

  return (
    
    <aside className="fixed left-0 top-0
        h-screen w-[72px] bg-slate-950 py-6 flex flex-col items-center gap-6 shadow-lg overflow-hidden z-10">
      
      {/* LOGO */}
      <img src={logo} alt="Logo" className="w-10 h-10" />

      {/* ICONS */}
      <div className="flex flex-col gap-6 py-4">
        {items.map((item, i) => {
          const isActive = location.pathname === item.path;

          return (
            <button
              key={i}
              onClick={() => navigate(item.path)}
              className="relative w-12 h-12 flex items-center justify-center"
            >
              {/* ACTIVE CURVE */}
              {isActive && (
                <>
                  <div className="absolute top-[-50%] -right-3 w-3 h-5 bg-slate-900" />
                  <div className="absolute top-[-50%] -right-3 w-3 h-5 bg-slate-950 rounded-br-2xl" />
                  <div className="absolute -right-7 w-20 h-14 bg-slate-900 rounded-l-xl" />
                  <div className="absolute bottom-[-50%] -right-3 w-3 h-5 bg-slate-900" />
                  <div className="absolute bottom-[-50%] -right-3 w-3 h-5 bg-slate-950 rounded-tr-2xl" />
                </>
              )}

              {/* ICON */}
              <div
                className={`relative z-10 p-2 rounded-md transition-all duration-300
                  ${
                    isActive
                      ? "bg-[#FF9F43] shadow-[0_0_18px_rgba(249,115,22,0.75)]"
                      : "bg-transparent hover:shadow-[0_0_16px_rgba(255,159,67,0.55)]"
                  }`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className={`w-5 h-5 transition-all duration-300 
                    ${
                      isActive
                        ? "brightness-0 invert "
                        : "brightness-0 saturate-100 invert-[62%] sepia-[55%] saturate-[1100%] hue-rotate-[5deg]"
                    }
                  `}
                />
              </div>
            </button>
          );
        })}
      </div>
      

      {/* LOGOUT */}
      <button
        onClick={() => navigate("/")}
        className="mt-auto w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white/5 transition-colors duration-300"
      >
        <img src={ExitIcon} alt="Logout" className="w-5 h-5" />
      </button>
    </aside>
  );
};

export default Sidebaritem;