"use client";
import React, { useState, useMemo } from "react";
import Bredcumb from "@/src/components/Bredcumb";
import ConversationList, { data } from '@/src/components/ConversationList'
import ChatWindow from "@/src/components/ChatWindow";
import ActiveLeads from "@/src/components/ActiveLeads";


function convertToDate(timeAgo) {
  const now = new Date();

  if (timeAgo.includes("m ago")) {
    const m = parseInt(timeAgo);
    return new Date(now - m * 60000);
  }
  if (timeAgo.includes("h ago")) {
    const h = parseInt(timeAgo);
    return new Date(now - h * 3600000);
  }
  if (timeAgo.includes("d ago")) {
    const d = parseInt(timeAgo);
    return new Date(now - d * 86400000);
  }

  return now;
}
const Conversation = () => {

  const sortedData = useMemo(() => {
    return [...data].sort(
      (a, b) =>
        convertToDate(b.lastMessageAt) - convertToDate(a.lastMessageAt)
    );
  }, []);

   const [activeConversation, setActiveConversation] = useState(
    sortedData[0]
  );

  return (
    <div className='grid grid-cols-12 gap-1 '>
      <div className='bg-white col-span-3 p-2   '>
        <div>
            <Bredcumb/>
        </div>

        <ConversationList
        activeId={activeConversation?.id}
          onSelect={(item) => setActiveConversation(item)}
        />
      </div>
       <div className='bg-red- col-span-6 '>

        <ChatWindow data={activeConversation} />
       </div>
        <div className='bg-white col-span-3'>
          <ActiveLeads data={activeConversation?.leadDetails}  />
        </div>
    </div>
  )
}

export default Conversation









  