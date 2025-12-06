"use client";

import Sidebar from '@/src/components/Sidebar'
import Topbar from '@/src/components/Topbar'
import React from 'react'
import { usePathname } from "next/navigation";

const layout = ({ children }) => {
  const pathname = usePathname();
  const isConversationPage = pathname === "/conversations";
    const isCalendarpage = pathname === "/calendar";

  return (
    <div className='bg-[#EAEAEA]'>
      <div className="flex h-screen overflow-hidden">

        <Sidebar />

        <div className="flex-1 flex flex-col min-w-0 min-h-0">

          <Topbar />

          {/* MAIN CONTAINER */}
          <main
            className={
              `
              flex-1 min-h-0 p-4
              ${isConversationPage|| isCalendarpage
                ? "overflow-hidden "   // ❗ NO SCROLL + FIXED
                : "overflow-y-auto hide-scrollbar p-5"  // default scroll
              }
              `
            }
          >
            <div
              className={
                `
                w-full max-w-full
                ${isConversationPage || isCalendarpage
                  ? "overflow-hidden h-full "   // child won't scroll
                  : "overflow-x-hidden "
                }
                `
              }
            >
              {children}
            </div>
          </main>

        </div>
      </div>
    </div>
  );
};

export default layout;
