"use client";
import React, { useState } from "react";
import InputField from "./InputField";
import { FaRegClock } from "react-icons/fa";

const AutomationCard = () => {
  let [alertOn, setAlertOn] = useState(false);
  return (
    <div>
      <div className="bg-[#FFFFFF] rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaRegClock className="text-[#900616]" />

            <div>
              <p className="font-inter text-[#0A0A0A]">No Reply in 2 hours </p>
              <p className="font-inter text-sm text-[#4A5565]">
                Send soft reminder
              </p>
            </div>
          </div>

          <div className="flex  items-center gap-3">
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
            {alertOn ? (
              <span className="px-2 text-center w-20 bg-[#DCFCE7] text-[#008236] rounded-lg">
                Active
              </span>
            ) : (
              <span className="px-2  text-center w-20 bg-[#fcdcdc] text-[#820000] rounded-lg">
                Inactive
              </span>
            )}
          </div>
        </div>

        <div className="mt-8">
          <p className="font-inter text-[#364153]">Trigger</p>
          <div className="grid grid-cols-12 gap-3">
            <InputField className={`col-span-4`} inputClass={`rounded-lg`} />
            <InputField className={`col-span-4`} inputClass={`rounded-lg`} />
            <InputField className={`col-span-4`} inputClass={`rounded-lg`} />
          </div>
        </div>

        <div className="mt-4">
          <p className="font-inter text-[#364153] mb-2">
            Follow-up Message Template
          </p>

          <textarea
            name=""
            id=""
            className="bg-[#F3F3F5] h-25 outline-none p-3 text-[#0A0A0A] placeholder:text-[#5D5D5D] font-inter rounded-xl w-full resize-none"
            placeholder="Enter your follow-up message..."
          ></textarea>
        </div>

        <div className="flex gap-10 items-center">
          <button className="border border-black/10 text-[#0A0A0A] w-full text-center py-2 rounded-lg mt-4 font-inter">
            Text Message
          </button>
          <button className="border border-black/10 w-full text-center py-2 rounded-lg mt-4 font-inter bg-[#900616] text-white">
            Update Rule
          </button>
        </div>
      </div>
    </div>
  );
};

export default AutomationCard;
