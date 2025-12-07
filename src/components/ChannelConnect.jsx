"use client";
import React, { useState } from "react";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

const ICONS = {
  instagram: <FaInstagram className="text-pink-600 text-2xl" />,
  facebook: <FaFacebookF className="text-blue-600 text-2xl" />,
  linkedin: <FaLinkedinIn className="text-gray-400 text-2xl" />,
};

const ChannelConnect = () => {
  const [channels, setChannels] = useState([
    {
      id: 1,
      type: "instagram",
      title: "Instagram",
      subtitle: "Not connected",
      status: "inactive",
      bg: "bg-pink-50",
      border: "border-pink-200",
    },
    {
      id: 2,
      type: "facebook",
      title: "Facebook",
      subtitle: "Not connected",
      status: "inactive",
      bg: "bg-blue-50",
      border: "border-blue-200",
    },
    {
      id: 3,
      type: "linkedin",
      title: "LinkedIn",
      subtitle: "Not connected",
      status: "inactive",
      bg: "bg-gray-50",
      border: "border-gray-200",
    },
  ]);

  // Handle Connect Click
  const handleConnect = (id) => {
    setChannels((prev) =>
      prev.map((ch) =>
        ch.id === id
          ? {
              ...ch,
              status: "active",
              subtitle: "Jamie Coach",
            }
          : ch
      )
    );
  };

  return (
    <div className="">
      <h2 className="text-xl font-bold mb-4 font-inter">Connected Channels</h2>

      {channels.map((item) => (
        <div
          key={item.id}
          className={`w-full flex items-center justify-between p-4 rounded-xl mb-3 border ${item.border} ${item.bg}`}
        >
          {/* Left */}
          <div className="flex items-center gap-4">
            {ICONS[item.type]}

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
          {item.status === "active" ? (
            <span className="px-3 py-1 font-inter text-sm rounded-lg bg-green-100 text-green-700">
              Active
            </span>
          ) : (
            <button
              onClick={() => handleConnect(item.id)}
              className="px-4 py-1 font-inter text-sm rounded-lg bg-white border border-[#000000]/10 hover:bg-gray-50 text-[#0A0A0A]"
            >
              Connect
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChannelConnect;
