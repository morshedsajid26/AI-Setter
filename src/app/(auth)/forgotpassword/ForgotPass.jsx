"use client";
import React, { useState } from "react";

import InputField from "@/src/components/InputField";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "@/src/config/api";


const ForgotPass = () => {
 
 const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email) {
    toast.error("Please enter your email address");
    return;
  }

  try {
    setLoading(true);

    const res = await axios.post(
      `${BASE_URL}/auth/forgot-password`,
      { email }
    );

    console.log("OTP API RESPONSE:", res.data);

    if (res.data) {
      toast.success(res.data.message || "OTP sent successfully!");
      sessionStorage.setItem("resetEmail", email);
      router.push("/otp");
    } else {
      toast.error(res.data.message || "Failed to send OTP");
    }
  } catch (err) {
    console.error("OTP Send Error:", err);
    toast.error(
      err.response?.data?.message || "Failed to send OTP"
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="grid justify-center items-center h-screen bg-[#EAEAEA]">
    <main className="bg-white   grid justify-center items-center overflow-y-auto hide-scrollbar py-20 px-11 rounded-3xl  ">
      <form
        onSubmit={handleSubmit}
        className="gap-5 flex flex-col items-center w-[480px] "
      >
        <h3 className="font-inter font-medium text-[32px] text-[#333333] ">
          Forget Password?
        </h3>

        <p className="font-inter  text-[#333333]  mb-5">
          Please enter your email to get verification code
        </p>

        <InputField
          label="Email Address"
          labelClass={`text-[#333333]  text-[16px]`}
          inputClass={`border-[#900616] border bg-transparent rounded  text-[#5C5C5C] py-3 placeholder:text-[#5C5C5C]`}
          name="email"
          type="email"
          // placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          
          
        />
  

          <button 
          type="submit"
          disabled={loading}
          className="bg-[#900616] text-white font-semibold text-xl w-full font-inter py-3 rounded-lg cursor-pointer mt-5">
         {loading ? "Sending OTP..." : "Continue"}
          </button>

        
       
      </form>
    </main>
      </div>
  );
};

export default ForgotPass;
