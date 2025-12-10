"use client";
import React from "react";
import { AiOutlineExport } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { SiTicktick } from "react-icons/si";

export default function SocialAccountCard({
  icon,            
  title,           
  description,     
  connected,       
  connectedAccount,
  onConnect,       
  onDisconnect,    
  onSettings,  
  connectButton,    
}) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] w-full">
      {/* Header Row */}
      <div className="flex justify-between items-start">
        
        {/* Left Icon + Title */}
        <div className="flex items-center gap-3">
          <div className="text-4xl">{icon}</div>
          <div>
            <h3 className="font-inter text-lg text-[#0A0A0A]">{title}</h3>
            <p className="text-[#6B7280] font-inter text-sm">{description}</p>
          </div>
        </div>

        {/* Status Badge */}
        <div
          className={`px-3 py-1 rounded-full font-inter text-sm ${
            connected
              ? "bg-[#E8F9ED] text-[#10B981]"     
              : "bg-[#F3F4F6] text-[#6B7280]"     
          }`}
        >
          {connected ? <div className="flex items-center gap-1">
            <SiTicktick />
            <p >Connected</p>
          </div> : "Not Connected"}
        </div>
      </div>

      {/* Connected State UI */}
      {connected ? (
        <div className="mt-5">

          {/* Connected Account Box */}
          <div className="bg-[#F7F9FC] py-3 px-4 rounded-lg text-sm text-[#0A0A0A] font-inter">
            <p className="text-[#6B7280] text-xs">Connected Account</p>
            <p className="mt-1">{connectedAccount}</p>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={onDisconnect}
              className=" cursor-pointer w-full py-2 border border-[#E5E7EB] rounded-lg font-inter hover:bg-[#F9FAFB] text-[#0A0A0A]"
            >
              Disconnect
            </button>

            <button
              onClick={onSettings}
              className="ml-3 w-36 py-2 bg-[#0A0A0A] text-white rounded-lg font-inter flex items-center justify-center gap-2"
            >
                <IoSettingsOutline className="h-5 w-5" />
              Settings
            </button>
          </div>
        </div>
      ) : (
        // Not Connected State UI
        <div className="mt-25">
          <button
            onClick={onConnect}
            className={`w-full cursor-pointer  py-2 rounded-lg font-inter text-white flex items-center justify-center gap-2 ${connectButton}`}
          >
            <AiOutlineExport className="w-5 h-5" /> Connect {title}
          </button>
        </div>
      )}
    </div>
  );
}
