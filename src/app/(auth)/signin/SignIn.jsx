"use client";

import Image from "next/image";
import React, { useState } from "react";
import InputField from "@/src/components/InputField";
import Password from "@/src/components/Password";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/src/config/api";
import toast from "react-hot-toast";

const SignIn = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ---------------- LOGIN HANDLER ---------------- */
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });

      if (res.data.success) {
        const { access, refresh } = res.data.data;

        //  Save tokens
        Cookies.set("accessToken", access);
        Cookies.set("refreshToken", refresh);

        //  Success toast
        toast.success("Login successful!");

        //  Small delay for UX
        setTimeout(() => {
          router.push("/dashboard");
        }, 600);
      }
    } catch (err) {
        toast.error(
        err.response?.data?.message || "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#EAEAEA] h-screen grid justify-center items-center">
      <main className="bg-white overflow-y-auto hide-scrollbar py-15 px-11 rounded-3xl">
        <form
          onSubmit={handleLogin}
          className="gap-5 flex flex-col items-center w-[480px]"
        >
          <h3 className="font-inter font-medium text-[32px] text-[#333333] mb-6">
            Signin to Account
          </h3>

          <p className="font-inter text-[#333333]">
            Please enter your email and password to continue
          </p>

          {/* -------- EMAIL -------- */}
          <InputField
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            labelClass="text-[#333333] text-[16px]"
            inputClass="border-[#900616] border bg-transparent text-[#5C5C5C] py-3 rounded"
          />

          {/* -------- PASSWORD -------- */}
          <Password
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            inputClass="border"
          />

          {/* -------- ERROR -------- */}
          {error && (
            <p className="text-red-500 text-sm w-full text-left">
              {error}
            </p>
          )}

          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2.5">
              <input
                type="checkbox"
                className="w-4 h-4 accent-[#900616]"
              />
              <p className="text-[#333333] font-inter">
                Remember Password
              </p>
            </div>

            <Link href="/forgotpassword">
              <p className="text-[#900616] font-inter">
                Forgot Password?
              </p>
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#900616] text-white font-semibold text-xl w-full font-inter py-3 rounded-lg cursor-pointer mt-12 disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default SignIn;
