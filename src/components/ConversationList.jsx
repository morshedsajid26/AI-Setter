"use client";
import React, { useMemo, useState } from "react";
import { FaInstagram, FaSearch, FaTiktok } from "react-icons/fa";
import { FiFacebook, FiInstagram, FiLinkedin } from "react-icons/fi";

// YOUR DATA
export const data = [
  // 1 -----------------------------
  {
    id: 1,
    name: "Sarah Martinez",
    platform: "instagram",
    score: 85,
    unread: 2,
    lastMessage: "That sounds perfect! When can we schedule?",
    lastMessageAt: "1m ago",
    username: "sarah_wellness",
    messages: [
      {
        from: "user",
        text: "Hi! I saw your post about nutrition coaching...",
        time: "10:33 AM",
      },
      {
        from: "assistant",
        text: "Absolutely! I specialize in helping busy professionals...",
        time: "10:33 AM",
      },
      {
        from: "user",
        text: "Honestly, meal planning. I work 60+ hours...",
        time: "10:35 AM",
      },
      {
        from: "assistant",
        text: "That's a common challenge! Here's what we can do...",
        time: "10:37 AM",
      },
      {
        from: "user",
        text: "That sounds perfect! When can we schedule?",
        time: "10:39 AM",
      },
    ],
    leadDetails: {
      leadScore: 85,
      tags: ["High Intent", "Wellness"],
      contact: {
        name: "Sarah Martinez",
        email: "sarah.m@example.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        jobTitle: "Tech Startup VP",
      },
      lastInteractions: [
        { label: "Engaged with pricing post", time: "2 days ago" },
        { label: "Replied to story", time: "1 week ago" },
      ],
    },
  },

  // 2 -----------------------------
  {
    id: 2,
    name: "Mike Chen",
    platform: "facebook",
    score: 62,
    unread: 0,
    lastMessage: "Thanks for the info. Let me check.",
    lastMessageAt: "2m ago",
    username: "mike_chen",
    messages: [
      {
        from: "user",
        text: "Can you tell me about your pricing?",
        time: "9:15 AM",
      },
      {
        from: "assistant",
        text: "Sure! Our program starts at $199...",
        time: "9:17 AM",
      },
      {
        from: "user",
        text: "Thanks for the info. Let me check.",
        time: "9:18 AM",
      },
    ],
    leadDetails: {
      leadScore: 62,
      tags: ["Medium Intent"],
      contact: {
        name: "Mike Chen",
        email: "mikechen@example.com",
        phone: "+1 (555) 987-6543",
        location: "New York, USA",
        jobTitle: "Entrepreneur",
      },
      lastInteractions: [
        { label: "Viewed pricing page", time: "3 days ago" },
        { label: "Clicked CTA button", time: "1 week ago" },
      ],
    },
  },

  // 3 -----------------------------
  {
    id: 3,
    name: "Emma Rodriguez",
    platform: "instagram",
    score: 78,
    unread: 0,
    lastMessage: "Can you send me pricing details?",
    lastMessageAt: "5m ago",
    username: "emma_fitlife",
    messages: [
      {
        from: "user",
        text: "Can you send me pricing details?",
        time: "8:20 AM",
      },
      {
        from: "assistant",
        text: "Absolutely! Here are the pricing options...",
        time: "8:22 AM",
      },
    ],
    leadDetails: {
      leadScore: 78,
      tags: ["High Intent"],
      contact: {
        name: "Emma Rodriguez",
        email: "emma@example.com",
        phone: "+1 (555) 222-1111",
        location: "Texas, USA",
        jobTitle: "Fitness Coach",
      },
      lastInteractions: [
        { label: "Asked for pricing", time: "1h ago" },
        { label: "Liked a post", time: "2 days ago" },
      ],
    },
  },

  // 4 -----------------------------
  {
    id: 4,
    name: "Alex Thompson",
    platform: "linkedin",
    score: 93,
    unread: 3,
    lastMessage: "I'm interested in your program.",
    lastMessageAt: "10m ago",
    username: "alex_thompson",
    messages: [
      {
        from: "user",
        text: "I'm interested in your program.",
        time: "7:10 AM",
      },
      {
        from: "assistant",
        text: "That's great! Let's get started...",
        time: "7:12 AM",
      },
    ],
    leadDetails: {
      leadScore: 93,
      tags: ["High Intent", "Conversion Likely"],
      contact: {
        name: "Alex Thompson",
        email: "alex@example.com",
        phone: "+1 (555) 676-3344",
        location: "Los Angeles, USA",
        jobTitle: "Marketing Director",
      },
      lastInteractions: [
        { label: "Replied quickly", time: "5 hours ago" },
        { label: "Clicked signup link", time: "1 day ago" },
      ],
    },
  },

  // 5 -----------------------------
  {
    id: 5,
    name: "Olivia Parker",
    platform: "tiktok",
    score: 82,
    unread: 1,
    lastMessage: "This seems helpful! How do I start?",
    lastMessageAt: "15m ago",
    username: "olivia_wellness",
    messages: [
      {
        from: "user",
        text: "Hi! I loved your transformation post.",
        time: "11:05 AM",
      },
      {
        from: "assistant",
        text: "Thank you! Are you looking to begin coaching?",
        time: "11:06 AM",
      },
      {
        from: "user",
        text: "This seems helpful! How do I start?",
        time: "11:07 AM",
      },
    ],
    leadDetails: {
      leadScore: 82,
      tags: ["High Intent", "Warm Lead"],
      contact: {
        name: "Olivia Parker",
        email: "oliviap@example.com",
        phone: "+1 (555) 909-2211",
        location: "Seattle, WA",
        jobTitle: "UI/UX Designer",
      },
      lastInteractions: [
        { label: "DM from Instagram Reel", time: "5m ago" },
        { label: "Liked 6 posts", time: "1 day ago" },
      ],
    },
  },

  // 6 -----------------------------
  {
    id: 6,
    name: "David Miller",
    platform: "facebook",
    score: 66,
    unread: 0,
    lastMessage: "I'll think about it and let you know.",
    lastMessageAt: "20m ago",
    username: "davidmiller",
    messages: [
      {
        from: "user",
        text: "What's the duration of your program?",
        time: "9:50 AM",
      },
      {
        from: "assistant",
        text: "It runs for 8 weeks with full support!",
        time: "9:51 AM",
      },
      {
        from: "user",
        text: "I'll think about it and let you know.",
        time: "9:52 AM",
      },
    ],
    leadDetails: {
      leadScore: 66,
      tags: ["Medium Intent"],
      contact: {
        name: "David Miller",
        email: "davidm@example.com",
        phone: "+1 (555) 292-8765",
        location: "Chicago, IL",
        jobTitle: "Software Engineer",
      },
      lastInteractions: [
        { label: "Visited pricing page", time: "2 days ago" },
        { label: "Commented on post", time: "3 days ago" },
      ],
    },
  },

  // 7 -----------------------------
  {
    id: 7,
    name: "Isabella Gomez",
    platform: "instagram",
    score: 90,
    unread: 4,
    lastMessage: "Can we schedule a call today?",
    lastMessageAt: "30m ago",
    username: "bella_fit",
    messages: [
      { from: "user", text: "Your program looks amazing!", time: "12:10 PM" },
      {
        from: "assistant",
        text: "Thank you! Are you interested in joining?",
        time: "12:11 PM",
      },
      { from: "user", text: "Yes I’m very interested!", time: "12:12 PM" },
      { from: "user", text: "Can we schedule a call today?", time: "12:13 PM" },
    ],
    leadDetails: {
      leadScore: 90,
      tags: ["High Intent", "Conversion Likely"],
      contact: {
        name: "Isabella Gomez",
        email: "bella@example.com",
        phone: "+1 (555) 221-9090",
        location: "Miami, FL",
        jobTitle: "Fitness Model",
      },
      lastInteractions: [
        { label: "Replied instantly", time: "1m ago" },
        { label: "Shared story mention", time: "1 day ago" },
      ],
    },
  },

  // 8 -----------------------------
  {
    id: 8,
    name: "Robert Hill",
    platform: "linkedin",
    score: 58,
    unread: 0,
    lastMessage: "Thanks, I'll review this.",
    lastMessageAt: "40m ago",
    username: "robert_hill",
    messages: [
      {
        from: "user",
        text: "Do you provide corporate wellness packages?",
        time: "8:40 AM",
      },
      {
        from: "assistant",
        text: "Yes! We work with companies as well.",
        time: "8:41 AM",
      },
      { from: "user", text: "Thanks, I'll review this.", time: "8:42 AM" },
    ],
    leadDetails: {
      leadScore: 58,
      tags: ["Cold Lead"],
      contact: {
        name: "Robert Hill",
        email: "robert@example.com",
        phone: "+1 (555) 441-8766",
        location: "Boston, MA",
        jobTitle: "HR Manager",
      },
      lastInteractions: [
        { label: "Opened message", time: "30m ago" },
        { label: "Viewed profile", time: "1 week ago" },
      ],
    },
  },

  // 9 -----------------------------
  {
    id: 9,
    name: "Mia Johnson",
    platform: "tiktok",
    score: 72,
    unread: 1,
    lastMessage: "I want to lose weight before my wedding.",
    lastMessageAt: "45m ago",
    username: "mia_bride",
    messages: [
      {
        from: "user",
        text: "Hi! Do you help with wedding prep?",
        time: "4:25 PM",
      },
      {
        from: "assistant",
        text: "Absolutely! What’s your timeline?",
        time: "4:26 PM",
      },
      {
        from: "user",
        text: "3 months. I want to lose weight before my wedding.",
        time: "4:27 PM",
      },
    ],
    leadDetails: {
      leadScore: 72,
      tags: ["Wedding Lead", "High Intent"],
      contact: {
        name: "Mia Johnson",
        email: "mia.j@example.com",
        phone: "+1 (555) 991-1021",
        location: "Denver, CO",
        jobTitle: "Event Planner",
      },
      lastInteractions: [
        { label: "Instagram DM", time: "3m ago" },
        { label: "Liked transformation posts", time: "2 days ago" },
      ],
    },
  },

  // 10 -----------------------------
  {
    id: 10,
    name: "Ethan Brooks",
    platform: "facebook",
    score: 49,
    unread: 0,
    lastMessage: "Not sure yet. I'll think.",
    lastMessageAt: "50m ago",
    username: "ethan_brooks",
    messages: [
      { from: "user", text: "Do you offer monthly plans?", time: "7:15 AM" },
      {
        from: "assistant",
        text: "Yes! Monthly and quarterly options available.",
        time: "7:16 AM",
      },
      { from: "user", text: "Not sure yet. I'll think.", time: "7:17 AM" },
    ],
    leadDetails: {
      leadScore: 49,
      tags: ["Low Intent"],
      contact: {
        name: "Ethan Brooks",
        email: "ethan@example.com",
        phone: "+1 (555) 771-4433",
        location: "Austin, TX",
        jobTitle: "Delivery Driver",
      },
      lastInteractions: [
        { label: "Seen message", time: "1h ago" },
        { label: "Clicked ad", time: "4 days ago" },
      ],
    },
  },

  // 11 -----------------------------
  {
    id: 11,
    name: "Ava Patel",
    platform: "instagram",
    score: 88,
    unread: 2,
    lastMessage: "Yes please! Send me the link.",
    lastMessageAt: "1h ago",
    username: "ava_wellness",
    messages: [
      { from: "user", text: "Do you have group coaching?", time: "2:01 PM" },
      {
        from: "assistant",
        text: "Yes! We run weekly group sessions.",
        time: "2:02 PM",
      },
      {
        from: "user",
        text: "Sounds good. Yes please! Send me the link.",
        time: "2:03 PM",
      },
    ],
    leadDetails: {
      leadScore: 88,
      tags: ["High Intent", "Ready to Buy"],
      contact: {
        name: "Ava Patel",
        email: "ava.patel@example.com",
        phone: "+1 (555) 533-2209",
        location: "Phoenix, AZ",
        jobTitle: "Nurse Practitioner",
      },
      lastInteractions: [
        { label: "Asked for group program info", time: "5m ago" },
        { label: "Saved workout reel", time: "1 day ago" },
      ],
    },
  },

  // 12 -----------------------------
  {
    id: 12,
    name: "Liam Carter",
    platform: "linkedin",
    score: 81,
    unread: 1,
    lastMessage: "Can you send the corporate proposal?",
    lastMessageAt: "2h ago",
    username: "liam_carter",
    messages: [
      {
        from: "user",
        text: "We are exploring wellness options for our employees.",
        time: "3:20 PM",
      },
      {
        from: "assistant",
        text: "That sounds great. I can prepare a corporate plan.",
        time: "3:21 PM",
      },
      {
        from: "user",
        text: "Perfect. Can you send the corporate proposal?",
        time: "3:22 PM",
      },
    ],
    leadDetails: {
      leadScore: 81,
      tags: ["Corporate Lead", "High Intent"],
      contact: {
        name: "Liam Carter",
        email: "liam.c@example.com",
        phone: "+1 (555) 881-3342",
        location: "Portland, OR",
        jobTitle: "Operations Manager",
      },
      lastInteractions: [
        { label: "Requested corporate plan", time: "15m ago" },
        { label: "Viewed company portfolio", time: "2 days ago" },
      ],
    },
  },
];

export default function ConversationList({ onSelect, activeId }) {
  const [platformFilter, setPlatformFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  function convertToDate(timeAgo) {
    const now = new Date();
    if (timeAgo.includes("m ago"))
      return new Date(now - parseInt(timeAgo) * 60000);
    if (timeAgo.includes("h ago"))
      return new Date(now - parseInt(timeAgo) * 3600000);
    if (timeAgo.includes("d ago"))
      return new Date(now - parseInt(timeAgo) * 86400000);
    return now;
  }

  const sortedData = useMemo(() => {
    return [...data].sort(
      (a, b) => convertToDate(b.lastMessageAt) - convertToDate(a.lastMessageAt)
    );
  }, []);

  // FILTER
  const filteredData = useMemo(() => {
    let result = sortedData;

    // PLATFORM FILTER
    if (platformFilter !== "all") {
      result = result.filter((item) => item.platform === platformFilter);
    }

    // SEARCH FILTER
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
    <div className="   font-inter">
      {/* Search */}
      <div className="mt-3 relative">
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full py-2.5 pl-10 pr-3  bg-[#F3F3F5] rounded-lg placeholder:text-[#717182] outline-none "
          placeholder="Search conversations..."
        />

        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#717182]" />
      </div>

      <div className="flex my-3 gap-5 overflow-x-scroll ">
        <button
          onClick={() =>
            setPlatformFilter(
              platformFilter === "instagram" ? "all" : "instagram"
            )
          }
          className={`flex items-center gap-2 border p-2.5 rounded-lg cursor-pointer
    ${
      platformFilter === "instagram"
        ? "bg-[#900616] text-white"
        : "border-black/10 text-[#0A0A0A]"
    }`}
        >
          <FiInstagram className="w-4 h-4" />
          Instagram
        </button>

        <button
          onClick={() =>
            setPlatformFilter(
              platformFilter === "facebook" ? "all" : "facebook"
            )
          }
          className={`flex items-center gap-2 border p-2.5 rounded-lg cursor-pointer
    ${
      platformFilter === "facebook"
        ? "bg-[#900616] text-white"
        : "border-black/10 text-[#0A0A0A]"
    }`}
        >
          <FiFacebook className="w-4 h-4" />
          Facebook
        </button>

        <button
          onClick={() =>
            setPlatformFilter(
              platformFilter === "linkedin" ? "all" : "linkedin"
            )
          }
          className={`flex items-center gap-2 border p-2.5 rounded-lg cursor-pointer
    ${
      platformFilter === "linkedin"
        ? "bg-[#900616] text-white"
        : "border-black/10 text-[#0A0A0A]"
    }`}
        >
          <FiLinkedin className="w-4 h-4" />
          LinkedIn
        </button>

        <button
          onClick={() =>
            setPlatformFilter(
              platformFilter === "tiktok" ? "all" : "tiktok"
            )
          }
          className={`flex items-center gap-2 border p-2.5 rounded-lg cursor-pointer
    ${
      platformFilter === "tiktok"
        ? "bg-[#900616] text-white"
        : "border-black/10 text-[#0A0A0A]"
    }`}
        >
          <FaTiktok className="w-4 h-4" />
          TikTok
        </button>
      </div>

      <div className="overflow-scroll hide-scrollbar h-[66vh]">
        {/* Conversation Items */}
        {filteredData.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect(item)}
            className={`flex gap-3 p-4 cursor-pointer   transition-all
            ${
              activeId === item.id
                ? "bg-red-50 border-l-4 border-b  border-[#900616]"
                : "bg-white hover:bg-gray-50 border-l-4 border-b border-[#F3F3F5]"
            }`}
          >
            {/* Avatar */}
            <div className="w-12 h-12 bg-[#BE0016] text-white rounded-full flex items-center justify-center font-semibold">
              {item.name
                .split(" ")
                .map((w) => w[0])
                .join("")}
            </div>

            {/* Details */}
            <div className="flex-1">
              {/* Name + Time */}
              <div className="flex justify-between items-center ">
                <div className="flex items-center gap-2">
                  <span className=" text-[#0F172B]">{item.name}</span>

                  {/* Social Icon */}
                  {item.platform === "instagram" && (
                    <span className="text-pink-500 text-xl">
                      <FaInstagram />
                    </span>
                  )}
                  {item.platform === "facebook" && (
                    <span className="text-blue-600 text-xl">
                      <FiFacebook />
                    </span>
                  )}
                  {item.platform === "linkedin" && (
                    <span className="text-blue-600 text-xl">
                      <FiLinkedin />
                    </span>
                  )}

                  {item.platform === "tiktok" && (
                    <span className="text-blue-600 text-xl">
                      <FaTiktok />
                    </span>
                  )}
                </div>

                <span className="text-sm text-gray-500 b">
                  {item.lastMessageAt}
                </span>
              </div>

              {/* Last Message */}
              <p className="text-[#45556C] text-sm mt-1">{item.lastMessage}</p>

              {/* Score + Unread */}
              <div className="flex items-center gap-3 mt-3">
                <span
                  className={`px-4 py-1 rounded-full text-sm font-semibold
                ${
                  item.score >= 80
                    ? "bg-green-50 text-green-600"
                    : "bg-yellow-50 text-yellow-600"
                }
              `}
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
      </div>
    </div>
  );
}
