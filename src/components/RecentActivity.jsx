"use client";
import React from "react";
import {
  FiAlertCircle,
  FiCalendar,
  FiFacebook,
  FiInstagram,
  FiMessageCircle,
  FiUserPlus,
  FiUsers,
  FiYoutube,
} from "react-icons/fi";
import { FaInstagram, FaTiktok } from "react-icons/fa";

// ✅ Utility function: platform icon
const getPlatformIcon = (platform = "") => {
  const p = platform.toLowerCase();
  if (p.includes("instagram")) return <FaInstagram className="text-pink-500 text-sm" />;
  if (p.includes("facebook")) return <FiFacebook className="text-blue-600 text-sm" />;
  if (p.includes("youtube")) return <FiYoutube className="text-red-500 text-sm" />;
  if (p.includes("tiktok")) return <FaTiktok className="text-black text-sm" />;
  return null;
};

// ✅ Utility function: dynamic time
function timeAgo(timestamp) {
  const now = new Date();
  const diff = Math.floor((now - timestamp) / 1000); // sec difference

  if (diff < 60) return `${diff} sec ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return `${Math.floor(diff / 86400)} days ago`;
}

const ActivityItem = ({ icon, iconBg, title, subtitle, timestamp, platform }) => {
  return (
    <div className="flex items-center justify-between py-4 ">
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}
        >
          {icon}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <p className=" text-[#0F172B] font-inter font-medium">{title}</p>
            {getPlatformIcon(platform)}
          </div>
          <p className="text-[#45556C] text-sm font-inter line-clamp-1">{subtitle}</p>
        </div>
      </div>

      {/* Right (Dynamic Time) */}
      <p className="text-[#62748E] text-sm font-inter whitespace-nowrap">{timeAgo(timestamp)}</p>
    </div>
  );
};

const RecentActivity = ({ data = [] }) => {
  return (
    <div className="">
      <h2 className=" text-[#0A0A0A] font-inter">Recent Activity</h2>
      <p className="text-[#717182] mb-6 font-inter">
        Latest updates across your Facebook & Instagram 
      </p>

      {data.length > 0 ? (
        data.map((item, idx) => {
          // Find the last message that is NOT from the bot
          const userMessages = (item.messages || []).filter(m => !m.is_from_bot);
          const lastUserMsg = userMessages.length > 0 ? userMessages[0].text : (item.messages?.[0]?.text || "No messages yet");
          
          const timestamp = item.last_interaction ? new Date(item.last_interaction) : new Date();
          
          return (
            <ActivityItem 
              key={item.id || idx}
              platform={item.platform}
              icon={
                item.profile_pic ? (
                  <img src={item.profile_pic} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#900616] text-white flex items-center justify-center font-semibold">
                    {(item.name || "U")[0]}
                  </div>
                )
              }
              iconBg="bg-transparent"
              title={item.name || item.display_name || "Unknown User"}
              subtitle={lastUserMsg}
              timestamp={timestamp}
            />
          );
        })
      ) : (
        <p className="text-[#717182] font-inter text-center py-4">No recent activity</p>
      )}
    </div>
  );
};

export default RecentActivity;
