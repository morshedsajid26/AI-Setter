"use client";
import React, { useState } from "react";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaTiktok } from "react-icons/fa";

const ICON_COMPONENTS = {
  instagram: FaInstagram,
  facebook: FaFacebookF,
  linkedin: FaLinkedinIn,
  tiktok: FaTiktok,
};

const BRAND_STYLES = {
  instagram: {
    icon: "text-pink-600",
    bg: "bg-pink-50",
    border: "border-pink-200",
  },
  facebook: {
    icon: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  linkedin: {
    icon: "text-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  tiktok: {
    icon: "text-black",
    bg: "bg-gray-100",
    border: "border-gray-300",
  },
};

const ChannelConnect = () => {
  const [channels, setChannels] = useState([
    { id: 1, type: "instagram", title: "Instagram", subtitle: "Not connected", status: "inactive" },
    { id: 2, type: "facebook", title: "Facebook", subtitle: "Not connected", status: "inactive" },
    { id: 3, type: "linkedin", title: "LinkedIn", subtitle: "Not connected", status: "inactive" },
    { id: 4, type: "tiktok", title: "TikTok", subtitle: "Not connected", status: "inactive" },
  ]);

  const toggleStatus = (id) => {
    setChannels((prev) =>
      prev.map((ch) =>
        ch.id === id
          ? {
              ...ch,
              status: ch.status === "active" ? "inactive" : "active",
              subtitle: ch.status === "active" ? "Not connected" : "Jamie Coach",
            }
          : ch
      )
    );
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 font-inter text-[#0F172B]">Connected Channels</h2>

      {channels.map((item) => {
        const Icon = ICON_COMPONENTS[item.type];

        const brand = BRAND_STYLES[item.type];

        const isActive = item.status === "active";

        const bg = isActive ? brand.bg : "bg-gray-50";
        const border = isActive ? brand.border : "border-gray-300";
        const iconColor = isActive ? brand.icon : "text-gray-400";

        return (
          <div
            key={item.id}
            className={`w-full flex items-center justify-between p-4 rounded-xl mb-3 border ${bg} ${border}`}
          >
            {/* Left */}
            <div className="flex items-center gap-4">
              <Icon className={`${iconColor} text-2xl`} />

              <div>
                <p className="font-semibold font-inter text-gray-700">
                  {item.title}
                </p>
                <p className="text-sm font-inter text-gray-500">
                  {item.subtitle}
                </p>
              </div>
            </div>

            {/* Right */}
            {isActive ? (
              <button
                onClick={() => toggleStatus(item.id)}
                className="px-3 py-1 font-inter text-sm rounded-lg bg-green-100 text-green-700"
              >
                Active
              </button>
            ) : (
              <button
                onClick={() => toggleStatus(item.id)}
                className="px-4 py-1 font-inter text-sm rounded-lg bg-white border border-[#000000]/10 hover:bg-gray-50 text-[#0A0A0A]"
              >
                Connect
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ChannelConnect;
