"use client";
import SocialAccountCard from "./SocialAccountCard";
import { useState } from "react";
import { AiFillTikTok } from "react-icons/ai";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";

export default function SocialMediaChannels() {
  const [instagramConnected, setInstagramConnected] = useState(false);
  const [facebookConnected, setFacebookConnected] = useState(true);
  const [linkedinConnected, setLinkedinConnected] = useState(false);
  const [tiktokConnected, setTiktokConnected] = useState(true);

  return (
    <div className="grid grid-cols-2 gap-6 mt-5">
      {/* Instagram */}
      <SocialAccountCard
        icon={<FaInstagram className="text-[#F6339A]" />}
        title="Instagram"
        description="Connect your Instagram account to manage your DMs."
        connected={instagramConnected}
        connectButton={`bg-[#F6339A]`}
        connectedAccount="@jamie.coach"
        onConnect={() => setInstagramConnected(true)}
        onDisconnect={() => setInstagramConnected(false)}
        onSettings={() => console.log("Open IG settings")}
      />

      {/* Facebook */}
      <SocialAccountCard
        icon={<FaFacebook className="text-[#155DFC]" />}
        title="Facebook"
        description="Connect your Facebook account to manage messages."
        connected={facebookConnected}
        connectButton={`bg-[#155DFC]`}
        connectedAccount="@jamie.fb"
        onConnect={() => setFacebookConnected(true)}
        onDisconnect={() => setFacebookConnected(false)}
        onSettings={() => console.log("Open FB settings")}
      />

      {/* Linkedin */}
      <SocialAccountCard
        icon={<FaLinkedin className="text-[#155DFC]" />}
        title="Linkedin"
        description="Connect your Instagram account to manage your DMs."
        connected={linkedinConnected}
        connectButton={`bg-[#155DFC]`}
        connectedAccount="@jamie.coach"
        onConnect={() => setLinkedinConnected(true)}
        onDisconnect={() => setLinkedinConnected(false)}
        onSettings={() => console.log("Open IG settings")}
      />

      {/* Tiktok */}
      <SocialAccountCard
        icon={<AiFillTikTok className=" w-10 h-10" />}
        title="TikTok"
        description="Manage TikTok DMs and comments"
        connected={tiktokConnected}
        connectButton={`bg-[#000000]`}
        connectedAccount="@jamie.fb"
        onConnect={() => setTiktokConnected(true)}
        onDisconnect={() => setTiktokConnected(false)}
        onSettings={() => console.log("Open FB settings")}
      />
    </div>
  );
}
