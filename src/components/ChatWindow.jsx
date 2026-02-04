"use client";
import React, { useRef, useEffect, useState } from "react";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { FiFacebook, FiLinkedin, FiSend } from "react-icons/fi";

export default function ChatWindow({ data }) {
  const bottomRef = useRef(null);

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
  const [input, setInput] = useState("");

  /* ---------------- RELOAD WHEN CONVERSATION CHANGES ---------------- */
  useEffect(() => {
    setMessages(buildInitialMessages(data));
  }, [data]);

  /* ---------------- AUTO SCROLL ---------------- */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!data) {
    return (
      <div className="flex items-center justify-center bg-white h-full">
        Select a conversation to start chatting
      </div>
    );
  }

  /* ---------------- SEND MESSAGE (UI ONLY) ---------------- */
  const sendMessage = () => {
    if (!input.trim()) return;

    const newMsg = {
      from: "user",
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  /* ---------------- PLATFORM NORMALIZE ---------------- */
  const platform =
    data.platform?.includes("instagram")
      ? "instagram"
      : data.platform?.includes("linkedin")
      ? "linkedin"
      : data.platform?.includes("tiktok")
      ? "tiktok"
      : "facebook";

  /* ---------------- SAFE INITIALS ---------------- */
  const initials = (data.name || "U")
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <div className="flex flex-col justify-between bg-white font-inter h-full overflow-scroll hide-scrollbar">
      {/* ---------------- HEADER ---------------- */}
      <div className="p-4 bg-white flex items-center gap-3 ">
        <div className="w-10 h-10 bg-[#900616] text-white rounded-full flex items-center justify-center font-semibold">
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
        {platform === "linkedin" && (
          <span className="text-blue-600 text-xl">
            <FiLinkedin />
          </span>
        )}
        {platform === "tiktok" && (
          <span className="text-blue-600 text-xl">
            <FaTiktok />
          </span>
        )}
      </div>

      {/* ------------ MESSAGE AREA ------------ */}
      <div
        className="flex-1 overflow-y-auto p-5 space-y-6 hide-scrollbar"
        style={{ maxHeight: "calc(80vh )" }}
      >
        {messages.map((msg, idx) => (
          <div key={idx} className="flex flex-col">
            {msg.from === "assistant" && (
              <p className="text-xs text-[#94A3B8] mb-1">
                AI Assistant
              </p>
            )}

            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-[15px]
                ${
                  msg.from === "assistant"
                    ? "bg-[#AE1022] text-white rounded-br-none"
                    : "bg-[#F1F5F9] text-[#0F172B] rounded-bl-none"
                }`}
              style={{
                alignSelf:
                  msg.from === "assistant"
                    ? "flex-start"
                    : "flex-end",
              }}
            >
              {msg.text}
            </div>

            <p
              className="text-xs text-[#94A3B8] mt-1"
              style={{
                alignSelf:
                  msg.from === "assistant"
                    ? "flex-start"
                    : "flex-end",
              }}
            >
              {msg.time}
            </p>
          </div>
        ))}

        <div ref={bottomRef} />
      </div>

      {/* ---------------- CTA CARD ---------------- */}
      {/* <div className="bg-[#E7FDEB] border border-[#B9F8CF] p-5 rounded-lg m-4 mt-2 flex justify-between">
        <div>
          <h3 className="font-semibold text-[#0E5135] text-[15px] mb-1">
            Ready to book a discovery call?
          </h3>
          <p className="text-sm text-[#0E5135]">
            15–20 minute intro session
          </p>
        </div>

        <button className="px-5 py-2 bg-[#00A63E] hover:bg-[#00A63E]/80 text-white font-medium rounded-lg transition-all duration-300 cursor-pointer">
          Schedule
        </button>
      </div> */}

      {/* ---------------- QUICK ACTION BUTTONS ---------------- */}
      {/* <div className="flex flex-wrap gap-3 px-4">
        <button className="border px-4 py-2 rounded-full text-sm text-[#334155]">
          Send pricing info
        </button>
        <button className="border px-4 py-2 rounded-full text-sm text-[#334155]">
          Share testimonials
        </button>
        <button className="border px-4 py-2 rounded-full text-sm text-[#334155]">
          Explain program details
        </button>
      </div> */}

      {/* ---------------- INPUT BAR ---------------- */}
      {/* <div className="p-4 bg-white">
        <div className="flex items-center gap-3 bg-[#EEF1F5] px-4 py-3 rounded-full">
          <input
            className="flex-1 bg-transparent outline-none text-sm text-[#717182] placeholder:text-[#717182]"
            placeholder="Type a message... (AI will review before sending)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && sendMessage()
            }
          />

          <button
            className="text-[#900616]"
            onClick={sendMessage}
          >
            <FiSend size={20} />
          </button>
        </div>

        <p className="text-xs mt-2 text-[#94A3B8]">
          AI Assistant is active — responses are automated but
          you can override anytime
        </p>
      </div> */}
    </div>
  );
}
