"use client";
import Image from "next/image";
import React, { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { SiTicktick } from "react-icons/si";

const MarketingToolsCard = ({ item,icon }) => {
  const [connected, setConnected] = useState(item.connected);

  return (
    <div className="w-full bg-white rounded-xl  p-6  mb-6 font-inter">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="">
            <Image src={item.icon} alt="icon"  />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#0A0A0A]">{item.name}</h3>
            <p className="text-gray-500 text-sm">{item.description}</p>
          </div>
        </div>

        {/* Status badge */}
        <div
          className={`text-sm font-medium px-3 py-1 rounded-full ${
            connected ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
          }`}
        >
          {connected ? <div className="flex items-center gap-1">
                      <SiTicktick />
                      <p >Connected</p>
                    </div> : "Disconnected"}
        </div>
      </div>

      {/* Details section */}
      <div className="bg-gray-50 p-4 rounded-lg mt-4 text-sm">
        {Object.entries(item.fields).map(([key, value]) => (
          <div key={key} className="flex justify-between py-1">
            <span className="capitalize text-gray-600">
              {key.replace(/([A-Z])/g, " $1")}:
            </span>
            <span className="text-gray-800">{value}</span>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-4">
        <button className="px-4 py-2 border border-[#000000]/10 text-[#0A0A0A] rounded-lg text-sm flex items-center gap-2">
        <IoSettingsOutline className="h-4 w-4 cursor-pointer
        " />
          Configure
        </button>

        <button className="px-4 py-2 border border-[#000000]/10 text-[#0A0A0A]  rounded-lg text-sm">
          Test Connection
        </button>

        {connected ? (
          <button
            className="px-4 py-2 border border-[#000000]/10 text-[#0A0A0A]  rounded-lg text-sm cursor-pointer
            "
            onClick={() => setConnected(false)}
          >
            Disconnect
          </button>
        ) : (
          <button
            className="px-4 py-2 border border-[#000000]/10 text-[#0A0A0A]  rounded-lg text-sm cursor-pointer
            "
            onClick={() => setConnected(true)}
          >
            Connect
          </button>
        )}
      </div>
    </div>
  );
};

export default MarketingToolsCard;
