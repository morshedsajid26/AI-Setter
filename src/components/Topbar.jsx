"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Avatar from "@/public/Avatar.png";
import logo from "@/public/logo.png";
import { IoMdNotificationsOutline } from "react-icons/io";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "@/src/config/api";
import toast from "react-hot-toast";

const Topbar = () => {
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = Cookies.get("accessToken");

        const res = await axios.get(`${BASE_URL}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        
        if (res.data?.image) {
          setProfileImage(res.data.image);
        }
      } catch (err) {
        toast.error("Profile fetch error", err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="flex items-center justify-end gap-10 bg-[#FFFFFF] p-3">
      <Link href="/notification">
        <IoMdNotificationsOutline className="h-8 w-8 cursor-pointer text-[#0F172B]" />
      </Link>

      <Link href="/account">
        <Image
          src={profileImage || logo} 
          alt="profile"
          width={70}
          height={60}
          className="rounded-full object-cover"
          unoptimized
        />
      </Link>
    </div>
  );
};

export default Topbar;
