"use client";
import React, { useState } from "react";

const NotificationAlert = ({ title, subtitle }) => {
  let [alertOn, setAlertOn] = useState(false);
  return (
    <div className="border border-[#E2E8F0] p-4 rounded-2xl flex justify-between items-center">
      <div>
        <p className="font-inter text-[#0A0A0A]">{title}</p>

        <p className="text-[#717182] font-inter mt-1.5">{subtitle}</p>
      </div>

      <div>
        <button
          onClick={() => setAlertOn(!alertOn)}
          className={`relative w-[38px] h-5 flex items-center rounded-full transition-colors duration-300 ${
            alertOn ? "bg-[#900616]" : "bg-[#CBCED4]"
          }`}
        >
          <span
            className={`absolute h-4 w-4 bg-white rounded-full transition-transform duration-300 ${
              alertOn ? " translate-x-5" : "translate-x-0.5"
            }`}
          ></span>
        </button>
      </div>
    </div>
  );
};

export default NotificationAlert;
