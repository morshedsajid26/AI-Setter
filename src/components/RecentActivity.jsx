"use client";
import React from "react";
import {
  FiAlertCircle,
  FiCalendar,
  FiMessageCircle,
  FiUserPlus,
  FiUsers,
} from "react-icons/fi";

// ✅ Utility function: dynamic time
function timeAgo(timestamp) {
  const now = new Date();
  const diff = Math.floor((now - timestamp) / 1000); // sec difference

  if (diff < 60) return `${diff} sec ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return `${Math.floor(diff / 86400)} days ago`;
}


const ActivityItem = ({ icon, iconBg, title, subtitle, timestamp }) => {
  return (
    <div className="flex items-center justify-between py-4 ">
     
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}
        >
          {icon}
        </div>

        <div>
          <p className=" text-[#0F172B] font-inter">{title}</p>
          <p className="text-[#45556C] text-sm font-inter">{subtitle}</p>
        </div>
      </div>

      {/* Right (Dynamic Time) */}
      <p className="text-[#62748E] text-sm font-inter">{timeAgo(timestamp)}</p>
    </div>
  );
};


const RecentActivity = () => {
  // Dynamic timestamps: last X minutes/hours
  const now = new Date();

  const data = [
    {
      icon: <FiUsers className="text-green-600" />,
      iconBg: "bg-green-100",
      title: "New lead identified",
      subtitle: "@sarah_wellness via Instagram",
      timestamp: new Date(now - 5 * 60 * 1000), // 5 min ago
    },
    {
      icon: <FiCalendar className="text-green-600" />,
      iconBg: "bg-green-100",
      title: "Booking confirmed",
      subtitle: "Discovery call with Mike Chen",
      timestamp: new Date(now - 12 * 60 * 1000), // 12 min ago
    },
    {
      icon: <FiAlertCircle className="text-red-600" />,
      iconBg: "bg-red-100",
      title: "HubSpot sync failed",
      subtitle: "Contact export error — retry now",
      timestamp: new Date(now - 60 * 60 * 1000), // 1 hour ago
    },
    {
      icon: <FiMessageCircle className="text-yellow-600" />,
      iconBg: "bg-yellow-100",
      title: "High-intent conversation",
      subtitle: "@fitness_coach_alex asking about pricing",
      timestamp: new Date(now - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      icon: <FiCalendar className="text-blue-600" />,
      iconBg: "bg-blue-100",
      title: "Booking rescheduled",
      subtitle: "Emma Rodriguez moved to next week",
      timestamp: new Date(now - 3 * 60 * 60 * 1000), // 3 hours ago
    },
  ];

  return (
    <div className="">
      <h2 className=" text-[#0A0A0A] font-inter">Recent Activity</h2>
      <p className="text-[#717182] mb-6 font-inter">
        Latest updates across your channels
      </p>

      {data.map((item, idx) => (
        <ActivityItem key={idx} {...item} />
      ))}
    </div>
  );
};

export default RecentActivity;
