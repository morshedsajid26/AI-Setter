"use client";
import Image from "next/image";
import React from "react";
import Avatar from "@/public/Avatar.png";
import logo from "@/public/logo.png";
import { IoMdNotificationsOutline } from "react-icons/io";
import Link from "next/link";

const Topbar = () => {
  return (
    <div className=" flex items-center justify-end gap-10 bg-[#FFFFFF] p-2  ">
      <Link href="/notification">
        <IoMdNotificationsOutline className="h-8 w-8  cursor-pointer text-[#0F172B]" />
      </Link>

      <Link href={`/account`}>
        {/* <Image src={Avatar} alt="profile" /> */}
        <Image src={logo} alt="logo" />
      </Link>
    </div>
  );
};

export default Topbar;
