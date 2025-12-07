"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Layout({ children }) {
  const pathname = usePathname();

  const linkClasses = (path) => {
    let isActive = false;

    if (path === "/ai/settings") {
      isActive =
        pathname === "/ai/settings"; 
    } 
    else {
      isActive = pathname.startsWith(path);
    }

    return `font-inter py-2 px-4 rounded-3xl ${
      isActive ? "text-white bg-[#900616]" : "text-[#0A0A0A]"
    }`;
  };

  return (
    <div className="font-inter">
      <h3 className="capitalize text-black text-2xl">AI Settings</h3>
      <p className="text-[#606060] mt-2">
        Customize JamieGPT's tone, behavior, and rules
      </p>

      <div className="bg-white py-2 px-5 flex gap-10 mt-8 rounded-full">
        
        {/* Tab 1 */}
        <Link href="/ai/settings" className={linkClasses("/ai/settings")}>
          Tone & Personality
        </Link>

        {/* Tab 2 */}
        <Link href="/ai/settings/qualification" className={linkClasses("/ai/settings/qualification")}>
          Qualification Flows
        </Link>

        {/* Tab 3 */}
        <Link href="/ai/settings/automation" className={linkClasses("/ai/settings/automation")}>
          Follow up automation
        </Link>

      </div>

      <div className="mt-6">{children}</div>
    </div>
  );
}
