"use client";
import Image from "next/image";
import React from "react";
import Avatar from "@/public/Avatar.png";
import { IoMdNotificationsOutline } from "react-icons/io";
import Link from "next/link";


const Topbar = () => {
  

  return (
    <div className=" flex items-center justify-end gap-10 bg-[#FFFFFF] p-2  ">

      
      
      
      
       
      
            
            <Link href="/notification">
              <IoMdNotificationsOutline className="h-8 w-8  cursor-pointer" />
            </Link>
          

        <Image src={Avatar} alt="profile" />
      
    </div>
  );
};

export default Topbar;
