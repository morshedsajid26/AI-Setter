"use client";

import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "@/src/config/axios";
import Cookies from "js-cookie";

import Bredcumb from "@/src/components/Bredcumb";
import ConversationList from "@/src/components/ConversationList";
import ChatWindow from "@/src/components/ChatWindow";
import ActiveLeads from "@/src/components/ActiveLeads";
import { BASE_URL } from "@/src/config/api";
import { formatLastMessageTime } from "@/src/utils/formatLastMessageTime";

// Helper to robustly identify if a message is from the bot/AI
const getSenderType = (msg) => {
  if (!msg) return "user";
  const isBot = 
    msg.is_from_bot === true || 
    msg.is_from_bot === "true" || 
    msg.is_from_bot === 1 ||
    msg.sender === "bot" || 
    msg.sender === "assistant" || 
    msg.from === "bot" || 
    msg.is_bot === true ||
    (msg.text && (msg.text.includes("AI Assistant") || msg.text.includes("bot_pending")));

  return isBot ? "assistant" : "user";
};

export default function Conversation() {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wsStatus, setWsStatus] = useState("connecting"); // 'connecting' | 'connected' | 'error'
  const socketRef = useRef(null);

  const token = Cookies.get("accessToken");

  /* ---------------- FETCH CONVERSATION LIST ---------------- */
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axiosInstance.get(`${BASE_URL}/dashboard/users/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const rawList = res.data || [];

        const normalized = rawList.map((item) => {
          const rawMessages = item.messages || [];
          
          // Map and reverse messages so oldest is first (top) and newest is last (bottom)
          const normalizedMessages = [...rawMessages].map((msg) => ({
            from: getSenderType(msg),
            text: msg.text || "",
            time: msg.timestamp_display || new Date(msg.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          })).reverse();

          return {
            id: item.id,
            name: item.name || item.display_name || "Unknown",
            platform: item.platform || "facebook",
            lastMessage: rawMessages.length > 0 ? rawMessages[0].text : "No messages yet",
            lastMessageTimeRaw: item.last_interaction || new Date().toISOString(),
            lastMessageAt: item.last_interaction_display || formatLastMessageTime(item.last_interaction || new Date().toISOString()),
            score: item.score ?? 0,
            unread: 0,
            messages: normalizedMessages,
            leadDetails: {
              leadScore: item.score ?? 0,
              tags: [item.status_display || "New"],
              contact: {
                name: item.name || item.display_name,
                email: "N/A",
                phone: "N/A",
                location: "N/A",
                jobTitle: "N/A",
              },
              lastInteractions: [
                {
                  label: "Last response",
                  time: item.last_interaction_display || "",
                },
              ],
            },
          };
        });

        setConversations(normalized);

        if (normalized.length > 0) {
          handleSelectConversation(normalized[0]);
        }
      } catch (err) {
        console.error("Conversation fetch error ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  /* ---------------- FETCH SINGLE CONVERSATION ---------------- */
  const handleSelectConversation = async (conversation) => {
    try {
      // Clear messages temporarily while loading new ones, preserve other UI details
      setActiveConversation({
        ...conversation,
        messages: [],
      });

      const res = await axiosInstance.get(
        `${BASE_URL}/dashboard/users/${conversation.id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // The new API response is an array containing the single user object
      const item = Array.isArray(res.data) && res.data.length > 0 ? res.data[0] : (res.data || {});
      const rawMessages = item.messages || [];

      // Map and reverse messages so oldest is first (top) and newest is last (bottom)
      const normalizedMessages = [...rawMessages].map((msg) => ({
        from: getSenderType(msg),
        text: msg.text || "",
        time: msg.timestamp_display || new Date(msg.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      })).reverse();

      setActiveConversation((prev) => ({
        ...prev,
        messages: normalizedMessages,
      }));
    } catch (err) {
      console.error("Single conversation fetch error ", err);
    }
  };

  /* ---------------- REAL-TIME WEBSOCKET ---------------- */
  useEffect(() => {
    if (!token) return;

    let retryCount = 0;
    const maxRetries = 5;

    const connectSocket = () => {
      const cleanBaseUrl = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
      const wsUrl = `${cleanBaseUrl.replace(/^http/, "ws")}/ws/dashboard/messages/?token=${token}&ngrok-skip-browser-warning=1`;
      
      console.log("🔌 Attempting WebSocket connection to:", wsUrl);
      const socket = new WebSocket(wsUrl);
      socketRef.current = socket;

      socket.onopen = () => {
        console.log("✅ Chat WebSocket Connected Successfully");
        setWsStatus("connected");
        retryCount = 0;
      };

      socket.onmessage = (event) => {
        try {
          if (!event.data) return;

          const data = JSON.parse(event.data);
          if (!data) return;
          console.log("📩 WebSocket Message Received:", data);
          
          // 1. EXTRACT TEXT: Only from known content fields
          // We avoid using the entire 'data' object as a fallback to prevent JSON bubbles
          let extractedText = "";
          
          if (typeof data.text === "string") {
            extractedText = data.text;
          } else if (typeof data.message === "string") {
            extractedText = data.message;
          } else if (typeof data.content === "string") {
            extractedText = data.content;
          } else if (data.message && typeof data.message.text === "string") {
            // Handle nested Django structures like data.message.text
            extractedText = data.message.text;
          } else if (data.data && typeof data.data.text === "string") {
            extractedText = data.data.text;
          }

          // 2. FORMAT MESSAGE: Only if we actually found text
          if (!extractedText || !extractedText.trim()) {
            console.log("📩 Skipping non-message packet (likely metadata or ACK)");
            return;
          }

          // 3. IDENTIFY SENDER: Use consistent robust check
          const from = getSenderType(data) === "assistant" || getSenderType(data.message) === "assistant" || getSenderType(data.data) === "assistant" 
            ? "assistant" : "user";
          
          console.log(`🔎 ID: ${data.id || data.message_id} | Result: ${from} | Raw is_from_bot: ${data.is_from_bot}`);

          const newMessage = {
            from: from,
            text: extractedText,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          };

          const targetUserId = data.user_id || data.sender_id || data.sender || data.id;
          console.log("🔎 Target User ID:", targetUserId);

          // 1. Update Active Conversation if it belongs to the currently open chat
          setActiveConversation((prev) => {
            if (!prev) return prev;
            
            const isMatch = targetUserId && String(prev.id) === String(targetUserId);
            console.log(`🏠 Active Chat Check: ${prev.id} vs ${targetUserId} -> Match: ${isMatch}`);

            if (isMatch) {
              return {
                ...prev,
                messages: [...prev.messages, newMessage],
              };
            }
            return prev;
          });

          // 2. Update the Sidebar Conversation List
          setConversations((prev) => {
            return prev.map((conv) => {
              if (targetUserId && String(conv.id) === String(targetUserId)) {
                return {
                  ...conv,
                  lastMessage: newMessage.text,
                  lastMessageAt: newMessage.time,
                };
              }
              return conv;
            });
          });

        } catch (err) {
          console.error("Failed to parse WebSocket message", err);
        }
      };

      socket.onclose = () => {
        setWsStatus("error");
        if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(connectSocket, 3000 * retryCount);
        } else {
          console.warn("Chat WebSocket reconnection stopped after max retries.");
        }
      };
      
      socket.onerror = (err) => {
        setWsStatus("error");
        console.error("Chat WebSocket Error", err);
      };
    };

    connectSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [token]); // Removed activeConversation?.id to prevent double/cycling connections

  if (loading) {
    return <div className="p-6 bg-white">Loading...</div>;
  }

  if (conversations.length === 0) {
    return (
      <div className="p-6 bg-white text-gray-500">No conversations found</div>
    );
  }



  return (
    <div className="grid grid-cols-12 gap-1 h-[calc(100vh-90px)] mb-4 overflow-hidden">
      <div className="col-span-3 bg-white p-2 flex flex-col min-h-0">
        {/* <Bredcumb /> */}
        <ConversationList
          data={conversations}
          activeId={activeConversation?.id}
          onSelect={handleSelectConversation}
          wsStatus={wsStatus}
        />
      </div>

      <div className="col-span-9 bg-white flex flex-col min-h-0">
        <ChatWindow 
          data={activeConversation}
        />
      </div>
    </div>
  );
}
