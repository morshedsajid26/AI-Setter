"use client";

import React from "react";
import Link from "next/link";
import Password from "@/src/components/Password";

const NewPass = () => {
  return (
    <div className=" grid justify-center items-center h-screen bg-[#EAEAEA]">
      <main className="bg-white    overflow-y-auto hide-scrollbar py-20 px-18 rounded-3xl  ">
        <form className=" flex flex-col items-center text-cente gap-7 w-[480px]">
          <h3 className="font-inter font-medium text-[32px] text-[#333333]  ">
            Set a new password
          </h3>

          <p className="font-inter  text-[#333333]  mb-5 text-center">
            Create a new password. Ensure it differs from previous ones for
            security
          </p>

          <Password
            label="Password"
            placeholder="Enter your password"
            name={`password`}
          />

          <Password
            label="Confirm Password"
            placeholder="Enter your password again"
            name={`confirmPassword`}
          />
          <Link href={`/success`} className="w-full">
            <button
              type="submit"
              className="bg-[#900616] text-white w-full font-semibold font-inter  py-3 rounded-lg mt-5 cursor-pointer"
            >
              Update Password
            </button>
          </Link>
        </form>
      </main>
    </div>
  );
};

export default NewPass;
