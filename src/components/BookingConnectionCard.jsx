"use client";
import Image from "next/image";
import React from "react";
import { AiOutlineExport } from "react-icons/ai";

import { IoSettingsOutline } from "react-icons/io5";

export default function BookingConnectionCard({
  icon,
  title,
  description,
  connected,
  onConnect,
  onDisconnect,
  onSettings,
  connectButton,
  bookingUrl,
  className
}) {
  return (
    <div className={`bg-white rounded-2xl p-6 border border-[#E5E7EB] w-full ${className}`}>
      {/* Header Row */}
      <div className="flex justify-between items-start">
        

        {connected ? (
          
          <div className="">
            <div>
              <h3 className="font-inter text-lg text-[#0A0A0A]">Custom Link</h3>
              <p className="text-[#6B7280] font-inter text-sm">
                Use any booking url
              </p>
            </div>
          </div>
        ) : (
            <div className="space-y-2">
            {/* <div className="text-4xl">{icon}</div> */}
            <Image src={icon} alt="icon" width={40} height={40}/>
            <div>
              <h3 className="font-inter text-lg text-[#0A0A0A]">{title}</h3>
              <p className="text-[#6B7280] font-inter text-sm">{description}</p>
            </div>
          </div>
        )}

        {/* Status Badge */}
        <div
          className={`px-3 py-1 rounded-full font-inter text-sm ${
            connected
              ? "bg-[#E8F9ED] text-[#10B981]"
              : "bg-[#F3F4F6] text-[#6B7280]"
          }`}
        >
          {connected ? (
            <div className="flex items-center gap-1">
              <p>Active</p>
            </div>
          ) : (
            "Not Connected"
          )}
        </div>
      </div>

      {/* Connected State UI */}
      {connected ? (
        
            <div className="mt-4">
            {/* Connected URL Box */}
            <p className="text-[#6B7280] text-xs">Booking URL</p>
          <div className="bg-[#F7F9FC] py-2 px-4 rounded-lg text-sm text-[#0A0A0A] font-inter">
            <p> {bookingUrl}</p>
          </div>
            
          

          {/* Buttons */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={onDisconnect}
              className=" cursor-pointer w-full py-2 border border-[#E5E7EB] text-[#0A0A0A] rounded-lg font-inter hover:bg-[#F9FAFB]"
            >
              Disconnect
            </button>

            <button
              onClick={onSettings}
              className="ml-3 w-36 py-2 bg-[#0A0A0A] text-white rounded-lg font-inter flex items-center justify-center gap-2"
            >
              <IoSettingsOutline className="h-5 w-5" />
              Edit Link
            </button>
          </div>
        </div>
      ) : (

        
        // Not Connected State UI
        
          <button
            onClick={onConnect}
            className={`mt-10 w-full cursor-pointer  py-2 rounded-lg font-inter text-white flex items-center justify-center gap-2 bg-[#030213]`}
          >
            <AiOutlineExport className="w-5 h-5" />
            Connect
          </button>
       
      )}
    </div>
  );
}
