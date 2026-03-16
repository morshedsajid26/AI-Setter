"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "@/src/config/axios";
import Cookies from "js-cookie";

import Bredcumb from "@/src/components/Bredcumb";
import ConversationList from "@/src/components/ConversationList";
import ChatWindow from "@/src/components/ChatWindow";
import ActiveLeads from "@/src/components/ActiveLeads";
import { BASE_URL } from "@/src/config/api";
import { formatLastMessageTime } from "@/src/utils/formatLastMessageTime";

export default function Conversation() {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [loading, setLoading] = useState(true);

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
            from: msg.is_from_bot ? "assistant" : "user",
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
        from: msg.is_from_bot ? "assistant" : "user",
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
        />
      </div>

      <div className="col-span-9 bg-white flex flex-col min-h-0">
        <ChatWindow data={activeConversation} />
      </div>
    </div>
  );
}
