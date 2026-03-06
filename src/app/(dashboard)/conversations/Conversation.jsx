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
        const res = await axiosInstance.get(`/conversation`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        
        
        const rawList = res.data || [];
       

        const normalized = rawList.map((rawItem) => {
          // Flatten if API returns { coversation: {...} } or { conversation: {...} } instead of a flat object
          const item = rawItem.coversation || rawItem.conversation || rawItem;

          return {
            id: item.id,

            // LEFT LIST
            name: item.client_name || item.client_external_id || "Unknown",
            platform: item.source?.platform || "facebook",
            lastMessage: item.last_message || "No messages yet",
            lastMessageAt: formatLastMessageTime(item.lead?.last_response),


            //  ADD SCORE FOR CONVERSATION LIST
            score: item.lead?.score ?? 0,
            unread: 0,

            // placeholder
            messages: [],

            // RIGHT PANEL
            leadDetails: {
              leadScore: item.lead?.score ?? 0,
              tags: [item.lead?.status || "New"],
              contact: {
                name: item.client_name,
                email: "N/A",
                phone: "N/A",
                location: "N/A",
                jobTitle: "N/A",
              },
              lastInteractions: [
                {
                  label: "Last response",
                  time: item.lead?.last_response || "",
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
      //  PRESERVE SCORE + LEAD DETAILS
      setActiveConversation({
        ...conversation,
        score: conversation.score ?? 0,
        messages: [],
      });

      const res = await axiosInstance.get(
        `/conversation/${conversation.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const apiMessages = res.data?.messages || [];

      const normalizedMessages = apiMessages.map((msg) => {
        let textContent = "";
        if (msg.sender_type === "bot") {
          textContent = msg.message?.reply_text || msg.message?.reply || msg.reply_text || msg.reply || (typeof msg.message === 'string' ? msg.message : "");
        } else {
          textContent = msg.message?.text || msg.message?.body || msg.message?.comment || msg.text || (typeof msg.message === 'string' ? msg.message : "");
          // Fallback if it's an object without standard text fields
          if (!textContent && msg.message && typeof msg.message === 'object') {
            const possibleText = Object.values(msg.message).find(v => typeof v === 'string');
            textContent = possibleText || JSON.stringify(msg.message);
          }
        }

        return {
          from: msg.sender_type === "bot" ? "assistant" : "user",
          text: textContent,
          time: new Date(msg.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
      });

      //  UPDATE ONLY MESSAGES (DON’T DROP SCORE)
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
    <div className="grid grid-cols-12 gap-1">
      <div className="col-span-3 bg-white p-2">
        {/* <Bredcumb /> */}
        <ConversationList
          data={conversations}
          activeId={activeConversation?.id}
          onSelect={handleSelectConversation}
        />
      </div>

      <div className="col-span-6 bg-white">
        <ChatWindow data={activeConversation} />
      </div>

      <div className="col-span-3 bg-white">
        <ActiveLeads data={activeConversation?.leadDetails} />
      </div>
    </div>
  );
}
