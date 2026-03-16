import React, { useRef, useEffect, useState } from "react";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { FiFacebook, FiLinkedin, FiSend, FiYoutube } from "react-icons/fi";

export default function ChatWindow({ data }) {
  const scrollRef = useRef(null);

  /* ---------------- SAFE INITIAL MESSAGES ---------------- */
  const buildInitialMessages = (conversation) => {
    if (!conversation) return [];

    if (Array.isArray(conversation.messages)) {
      return conversation.messages;
    }

    // fallback: backend only has lastMessage
    if (conversation.lastMessage) {
      return [
        {
          from: "assistant",
          text: conversation.lastMessage,
          time: "now",
        },
      ];
    }

    return [];
  };

  const [messages, setMessages] = useState(
    buildInitialMessages(data)
  );

  /* ---------------- RELOAD WHEN CONVERSATION CHANGES ---------------- */
  useEffect(() => {
    setMessages(buildInitialMessages(data));
  }, [data]);

  /* ---------------- AUTO SCROLL ---------------- */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (!data) {
    return (
      <div className="flex items-center justify-center bg-white h-full">
        Select a conversation to start chatting
      </div>
    );
  }


  /* ---------------- PLATFORM NORMALIZE ---------------- */
  const platform =
    data.platform?.toLowerCase().includes("instagram")
      ? "instagram"
      : data.platform?.toLowerCase().includes("youtube")
        ? "youtube"
        : data.platform?.toLowerCase().includes("tiktok")
          ? "tiktok"
          : "facebook";

  /* ---------------- SAFE INITIALS ---------------- */
  const initials = (data.name || "U")
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <div className="flex flex-col justify-between bg-white font-inter h-full">
      {/* ---------------- HEADER ---------------- */}
      <div className="p-4 bg-white flex items-center gap-3 shrink-0">
        <div className="w-10 h-10 bg-[#900616] text-white rounded-full flex items-center justify-center font-semibold capitalize">
          {initials}
        </div>

        <div>
          <h2 className="font-semibold text-[16px] text-[#0F172B]">
            {data.name || "Unknown"}
          </h2>
          {data.username && (
            <p className="text-sm text-[#94A3B8]">
              @{data.username}
            </p>
          )}
        </div>

        {platform === "instagram" && (
          <span className="text-pink-500 text-xl">
            <FaInstagram />
          </span>
        )}
        {platform === "facebook" && (
          <span className="text-blue-600 text-xl">
            <FiFacebook />
          </span>
        )}
        {platform === "youtube" && (
          <span className="text-red-500 text-xl">
            <FiYoutube />
          </span>
        )}
        {platform === "tiktok" && (
          <span className="text-blue-600 text-xl">
            <FaTiktok />
          </span>
        )}

        <div>
          <span className="bg-[#900616] text-sm text-white px-2 py-1 rounded-full">Lead Score: {data.score}</span>
        </div>
      </div>

      {/* ------------ MESSAGE AREA ------------ */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-5 space-y-2 hide-scrollbar min-h-0"
      >
        {messages.map((msg, idx) => (
          <div key={idx} className="flex flex-col">
            {msg.from === "assistant" && (
              <p className="text-xs text-[#94A3B8] mb-1 text-end">
                AI Assistant
              </p>
            )}

            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-[15px]
                ${msg.from === "assistant"
                  ? "bg-[#AE1022] text-white rounded-br-none"
                  : "bg-[#F1F5F9] text-[#0F172B] rounded-bl-none"
                }`}
              style={{
                alignSelf:
                  msg.from === "assistant"
                    ? "flex-end"
                    : "flex-start",
              }}
            >
              {msg.text}
            </div>

            <p
              className="text-xs text-[#94A3B8] mt-1"
              style={{
                alignSelf:
                  msg.from === "assistant"
                    ? "flex-end"
                    : "flex-start",
              }}
            >
              {msg.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
