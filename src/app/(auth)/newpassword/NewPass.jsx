"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Password from "@/src/components/Password";
import toast from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "@/src/config/api";

const NewPass = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  // 🔐 Protect route (must come from OTP)
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("resetEmail");
    if (!storedEmail) {
      router.push("/forgotpassword");
    }
  }, [router]);

  /* ---------------- HANDLE CHANGE ---------------- */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { password, confirmPassword } = formData;

    if (!password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${BASE_URL}/auth/reset-password`, {
        new_password: password,
        confirm_password: confirmPassword,
      });

      if (res.data) {
        toast.success("Password reset successfully");
        sessionStorage.removeItem("resetEmail");
        router.push("/success");
      } else {
        toast.error(res.data?.message || "Failed to reset password");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to reset password. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid justify-center items-center h-screen bg-[#EAEAEA]">
      <main className="bg-white py-20 px-18 rounded-3xl">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-7 w-[480px]"
        >
          {/* 🔑 Hidden username field (accessibility fix) */}
          <input
            type="email"
            name="email"
            autoComplete="username"
            value={
              typeof window !== "undefined"
                ? sessionStorage.getItem("resetEmail") || ""
                : ""
            }
            readOnly
            hidden
          />

          <h3 className="font-inter font-medium text-[32px] text-[#333333]">
            Set a new password
          </h3>

          <p className="font-inter text-[#333333] mb-5 text-center">
            Create a new password. Ensure it differs from previous ones for
            security
          </p>

          <Password
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />

          <Password
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Enter your password again"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-[#900616] text-white w-full font-semibold py-3 rounded-lg mt-5 disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default NewPass;
