"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Layout({ children }) {
  const pathname = usePathname();

  const linkClasses = (path) => {
    const isActive =
      path === "/account"
        ? pathname.startsWith("/account") &&
          !pathname.startsWith("/account/notification") 
        : pathname.startsWith(path);

    return `font-inter py-2 px-4 rounded-3xl ${
      isActive ? "text-white bg-[#900616]" : "text-[#0A0A0A]"
    }`;
  };

  return (
    <div className="font-inter">

      <h3 className="capitalize text-black text-2xl">Account Settings</h3>
      <p className="text-[#606060] mt-2">
        Track performance and optimize your AI assistant
      </p>

      <div className="bg-white py-2 px-5 flex gap-10 mt-8 rounded-full">
        <Link href="/account" className={linkClasses("/account")}>
          Profile
        </Link>
{/* 
        <Link href="/account/notification" className={linkClasses("/account/notification")}>
          Notification
        </Link> */}
      </div>

      <div className="mt-6">{children}</div>
    </div>
  );
}
