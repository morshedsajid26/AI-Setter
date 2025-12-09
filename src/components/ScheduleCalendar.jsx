"use client";
import SocialAccountCard from "./SocialAccountCard";
import { useState } from "react";
import { AiFillTikTok } from "react-icons/ai";
import calendar from "@/public/calendar.png";
import calendly from "@/public/calendly.png";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";
import BookingConnectionCard from "./BookingConnectionCard";

export default function ScheduleCalendar() {
  const [instagramConnected, setInstagramConnected] = useState(false);
  const [facebookConnected, setFacebookConnected] = useState(true);
  const [linkedinConnected, setLinkedinConnected] = useState(false);
  const [tiktokConnected, setTiktokConnected] = useState(true);

  return (
    <div className="grid grid-cols-3 gap-6 mt-5">
      {/* Instagram */}
      <BookingConnectionCard
        icon={calendly}
        title="Calendly"
        description="Share your Calendly booking links"
        connected={instagramConnected}
        bookingUrl={`https://book.jamie.coach/discovery`}
        onConnect={() => setInstagramConnected(true)}
        onDisconnect={() => setInstagramConnected(false)}
        onSettings={() => console.log("Open IG settings")}
      />

      {/* Facebook */}
      <BookingConnectionCard
        icon={calendar}
        title="Cal.com"
        description="Open-source scheduling platform"
        connected={facebookConnected}
         bookingUrl={`https://book.jamie.coach/discovery`}
        onConnect={() => setFacebookConnected(true)}
        onDisconnect={() => setFacebookConnected(false)}
        onSettings={() => console.log("Open FB settings")}
      />

      {/* Linkedin */}
      <BookingConnectionCard
        icon={calendly}
        title="Calendly"
        description="Share your Calendly booking links"
        connected={linkedinConnected}
         bookingUrl={`https://book.jamie.coach/discovery`}
        onConnect={() => setLinkedinConnected(true)}
        onDisconnect={() => setLinkedinConnected(false)}
        onSettings={() => console.log("Open IG settings")}
      />

      
    </div>
  );
}
