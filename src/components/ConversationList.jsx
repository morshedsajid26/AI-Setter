"use client";
import React, { useMemo, useState } from "react";
import { FaInstagram, FaSearch, FaTiktok } from "react-icons/fa";
import { FiFacebook, FiInstagram, FiLinkedin } from "react-icons/fi";

/* -------- PLATFORM NORMALIZER -------- */
const normalizePlatform = (platform = "") => {
  if (platform.includes("instagram")) return "instagram";
  if (platform.includes("linkedin")) return "linkedin";
  if (platform.includes("tiktok")) return "tiktok";
  return "facebook";
};

export default function ConversationList({
  data = [],
  onSelect,
  activeId,
}) {
  const [platformFilter, setPlatformFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  /* -------- SAFE + NORMALIZED DATA -------- */
  const safeData = useMemo(() => {
    if (!Array.isArray(data)) return [];

    return data.map((item) => ({
      ...item,
      platform: normalizePlatform(item.platform),
      score: item.score ?? 0,
      unread: item.unread ?? 0,
    }));
  }, [data]);

  /* -------- TIME SORT -------- */
  const convertToDate = (timeAgo = "") => {
    const now = new Date();
    if (timeAgo.includes("m ago"))
      return new Date(now - parseInt(timeAgo) * 60000);
    if (timeAgo.includes("h ago"))
      return new Date(now - parseInt(timeAgo) * 3600000);
    if (timeAgo.includes("d ago"))
      return new Date(now - parseInt(timeAgo) * 86400000);
    return now;
  };

  const sortedData = useMemo(() => {
    return [...safeData].sort(
      (a, b) =>
        convertToDate(b.lastMessageAt) -
        convertToDate(a.lastMessageAt)
    );
  }, [safeData]);

  /* -------- FILTER -------- */
  const filteredData = useMemo(() => {
    let result = sortedData;

    if (platformFilter !== "all") {
      result = result.filter(
        (item) => item.platform === platformFilter
      );
    }

    if (searchTerm.trim()) {
      const t = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          (item.name || "").toLowerCase().includes(t) ||
          (item.username || "").toLowerCase().includes(t) ||
          (item.platform || "").toLowerCase().includes(t)
      );
    }

    return result;
  }, [platformFilter, searchTerm, sortedData]);

  return (
    <div className="font-inter">
      {/* SEARCH */}
      <div className="mt-3 relative">
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full py-2.5 pl-10 pr-3 bg-[#F3F3F5] rounded-lg placeholder:text-[#717182] outline-none"
          placeholder="Search conversations..."
        />
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#717182]" />
      </div>

      {/* PLATFORM FILTERS */}
      <div className="flex my-3 gap-5 overflow-x-scroll">
        {["instagram", "facebook", "linkedin", "tiktok"].map(
          (p) => (
            <button
              key={p}
              onClick={() =>
                setPlatformFilter(
                  platformFilter === p ? "all" : p
                )
              }
              className={`flex items-center gap-2 border p-2.5 rounded-lg
                ${
                  platformFilter === p
                    ? "bg-[#900616] text-white"
                    : "border-black/10 text-[#0A0A0A]"
                }`}
            >
              {p === "instagram" && <FiInstagram />}
              {p === "facebook" && <FiFacebook />}
              {p === "linkedin" && <FiLinkedin />}
              {p === "tiktok" && <FaTiktok />}
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          )
        )}
      </div>

      {/* LIST */}
      <div className="overflow-scroll hide-scrollbar h-[66vh]">
        {filteredData.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect?.(item)}
            className={`flex gap-3 p-4 cursor-pointer transition-all
              ${
                activeId === item.id
                  ? "bg-red-50 border-l-4 border-b border-[#900616]"
                  : "bg-white hover:bg-gray-50 border-l-4 border-b border-[#F3F3F5]"
              }`}
          >
            {/* AVATAR */}
            <div className="w-12 h-12 bg-[#BE0016] text-white rounded-full flex items-center justify-center font-semibold">
              {(item.name || "U")
                .split(" ")
                .map((w) => w[0])
                .join("")}
            </div>

            {/* DETAILS */}
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-[#0F172B]">
                    {item.name}
                  </span>

                  {item.platform === "instagram" && (
                    <FaInstagram className="text-pink-500" />
                  )}
                  {item.platform === "facebook" && (
                    <FiFacebook className="text-blue-600" />
                  )}
                  {item.platform === "linkedin" && (
                    <FiLinkedin className="text-blue-600" />
                  )}
                  {item.platform === "tiktok" && (
                    <FaTiktok className="text-blue-600" />
                  )}
                </div>

                <span className="text-sm text-gray-500">
                  {item.lastMessageAt}
                </span>
              </div>

              <p className="text-[#45556C] text-sm mt-1">
                {item.lastMessage}
              </p>

              <div className="flex items-center gap-3 mt-3">
                <span
                  className={`px-4 py-1 rounded-full text-sm font-semibold
                    ${
                      item.score >= 80
                        ? "bg-green-50 text-green-600"
                        : "bg-yellow-50 text-yellow-600"
                    }`}
                >
                  Score: {item.score}
                </span>

                {item.unread > 0 && (
                  <span className="bg-[#900616] text-white text-sm px-3 py-1 rounded-full">
                    {item.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredData.length === 0 && (
          <p className="text-center text-gray-400 mt-6">
            No conversations found
          </p>
        )}
      </div>
    </div>
  );
}
