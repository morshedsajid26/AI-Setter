"use client";

import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "@/src/config/api";

const OTP = () => {
  const router = useRouter();
  const inputs = useRef([]);

  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  // 🔐 email from forgot-password step
  const email =
    typeof window !== "undefined"
      ? sessionStorage.getItem("resetEmail")
      : null;

  /* ---------------- OTP INPUT HANDLERS ---------------- */
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < 4) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputs.current[index - 1]?.focus();
      }
    }
  };

  /* ---------------- VERIFY OTP ---------------- */
  const handleVerify = async (e) => {
    e.preventDefault();

    const otpValue = otp.join(""); // string

    if (otpValue.length !== 5) {
      toast.error("Please enter the 5 digit OTP");
      return;
    }

    if (!email) {
      toast.error("Session expired. Please resend OTP.");
      router.push("/forgotpassword");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${BASE_URL}/auth/verify-otp`, {
        email,
        otp: otpValue, // ✅ STRING OTP
      });

      console.log("VERIFY OTP RESPONSE:", res.data);

      if (res.data) {
        toast.success(res.data.message || "OTP verified successfully");
        router.push("/newpassword");
      } else {
        toast.error(res.data?.message || "Invalid OTP");
      }
    } catch (err) {
      console.error("OTP Verify Error:", err);
      toast.error(
        err.response?.data?.message || "Invalid or expired OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#EAEAEA] grid justify-center items-center h-screen">
      <main className="bg-white py-20 px-15 rounded-3xl">
        <form
          onSubmit={handleVerify}
          className="flex flex-col items-center text-center w-[480px]"
        >
          <h1 className="text-[32px] text-[#333333] font-inter font-medium">
            Check your email
          </h1>

          <p className="font-inter text-[16px] text-[#333333] mt-6">
            We sent a code to your email address. Please check your email for the
            5 digit code.
          </p>

          {/* -------- OTP INPUTS -------- */}
          <div className="flex gap-4 justify-center my-[82px]">
            {otp.map((digit, i) => (
              <input
                key={i}
                type="text"
                inputMode="numeric"
                maxLength={1}
                ref={(el) => (inputs.current[i] = el)}
                value={digit}
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className="w-[47px] h-[49px] border border-[#900616] rounded-[10px] text-center text-xl font-bold text-[#900616] outline-none"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#900616] text-white rounded py-3 font-semibold disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>

          <p className="mt-[92px] text-[#333333]">
            You have not received the email?
            <span
              onClick={() => router.push("/forgotpassword")}
              className="text-[#900616] underline ml-2 cursor-pointer"
            >
              Resend
            </span>
          </p>
        </form>
      </main>
    </div>
  );
};

export default OTP;
