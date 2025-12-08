"use client";

import Link from "next/link";
import React, { useRef, useState } from "react";

const OTP = () => {
  const inputs = useRef([]);

  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <div className="bg-[#EAEAEA] grid justify-center items-center h-screen">

    <main className="bg-white   overflow-y-auto hide-scrollbar py-20 px-15 rounded-3xl">
      <form className="flex flex-col items-center text-center w-[480px]">
        <h1 className="text-[32px] text-[#333333]  font-inter font-medium">
          Check your email
        </h1>
        <p className="font-inter text-[16px] text-[#333333] mt-6">
          We sent a code to your email address. Please check your email for the
          4 digit code.
        </p>

        <div className="flex gap-4 justify-center my-[82px]">
          {[...Array(4)].map((_, i) => (
            <input
              key={i}
              type="text"
              inputMode="numeric"
              maxLength={1}
              ref={(el) => (inputs.current[i] = el)}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              value={otp[i]}
              className="appearance-none w-[47px] h-[49px] border border-[#900616] rounded-[10px] text-center outline-none text-xl font-inter font-bold text-[#900616] "
            />
          ))}
        </div>

        <Link href={`/newpassword`} className="w-full">
        <button
          type="submit"
          className="w-full font-inter font-semibold text-[16px] bg-[#900616] text-white rounded py-3 hover:opacity-90 disabled:opacity-50 cursor-pointer"
        >
          Verify
        </button>
        </Link>


        <p className="font-inter text-[16px] text-[#333333]  mt-[92px]">
          You have not received the email?
          <a
            href="/forgotpassword"
            className="text-[#900616] cursor-pointer underline m-2"
          >
            Resend
          </a>
        </p>
      </form>
    </main>
    </div>
  );
};

export default OTP;
