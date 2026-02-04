"use client";

import InputField from "@/src/components/InputField";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "@/src/config/api";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(null);

  /* ---------------- FETCH PROFILE ---------------- */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = Cookies.get("accessToken");

        const res = await axios.get(`${BASE_URL}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(res.data);

        // ✅ FIX: set image preview
        if (res.data?.image) {
          setPreview(res.data.image);
        } else {
          setPreview(null);
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6">
        <p className="font-inter text-[#717182]">Loading profile...</p>
      </div>
    );
  }

  /* ---------------- ERROR ---------------- */
  if (!profile) {
    return (
      <div className="bg-white rounded-2xl p-6">
        <p className="font-inter text-red-500">Failed to load profile</p>
      </div>
    );
  }

  /* ---------------- INITIALS ---------------- */
  const initials =
    (profile.first_name?.[0] || "U") +
    (profile.last_name?.[0] || "");

  return (
    <div>
      {/* ================= PROFILE INFO ================= */}
      <div className="bg-white rounded-2xl p-6">
        <div>
          <p className="font-inter text-[#0A0A0A]">Profile Information</p>
          <p className="text-[#717182] font-inter mt-1.5">
            Update your personal details
          </p>
        </div>

        {/* ================= AVATAR ================= */}
        <div className="w-20 h-20 bg-[#BF0C21] text-white rounded-full flex items-center justify-center text-3xl overflow-hidden my-6">
          {preview ? (
            <img
              src={preview}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            initials.toUpperCase()
          )}
        </div>

        {/* ================= FORM ================= */}
        <form className="grid grid-cols-12 gap-5 md:gap-x-10 gap-y-6">
          <InputField
            className="col-span-6"
            inputClass="rounded-lg"
            readOnly
            value={profile.first_name || ""}
            label="First Name"
          />

          <InputField
            className="col-span-6"
            inputClass="rounded-lg"
            readOnly
            value={profile.last_name || ""}
            label="Last Name"
          />

          <InputField
            className="col-span-12"
            inputClass="rounded-lg"
            readOnly
            value={profile.email || ""}
            label="Email"
          />

          <InputField
            className="col-span-12"
            inputClass="rounded-lg"
            readOnly
            value={profile.business_name || ""}
            label="Business Name"
          />

          <InputField
            className="col-span-12"
            inputClass="rounded-lg"
            readOnly
            value={profile.website || ""}
            label="Website"
          />
        </form>

        <Link href="/account/editprofile">
          <button className="bg-[#900616] py-2 px-12 rounded-lg font-inter text-white mt-6 cursor-pointer">
            Edit
          </button>
        </Link>
      </div>

      {/* ================= TEAM MEMBERS ================= */}
      <div className="bg-white rounded-2xl p-6 mt-10">
        <div>
          <p className="font-inter text-[#0A0A0A]">Team Members</p>
          <p className="text-[#717182] font-inter mb-6 mt-1.5">
            Invite team members to collaborate
          </p>
        </div>

        <div className="flex items-center gap-x-5">
          <InputField
            placeholder="email@example.com"
            inputClass="rounded-lg"
          />

          <button className="bg-[#900616] mt-2 py-3 px-8 rounded-lg font-inter text-white cursor-pointer">
            Invite
          </button>
        </div>

        {/* ================= OWNER ================= */}
        <div className="border border-[#E2E8F0] p-4 rounded-lg flex items-center justify-between mt-6">
          <div className="flex items-center gap-5">
            <div className="w-10 h-10 bg-[#BF0C21] text-white rounded-full flex items-center justify-center font-inter">
              {preview ? (
        <img
          src={preview}
          alt="owner"
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        initials.toUpperCase()
      )}
            </div>

            <div>
              <h3 className="font-inter text-[#0A0A0A]">
                {profile.first_name} {profile.last_name}
              </h3>
              <p className="text-[#717182] font-inter">
                {profile.email}
              </p>
            </div>
          </div>

          <span className="py-1 px-2 bg-[#900616] rounded-lg font-inter text-white">
            Owner
          </span>
        </div>

        {/* ================= STATIC MEMBER ================= */}
        <div className="border border-[#E2E8F0] bg-white p-4 rounded-xl flex items-center justify-between mt-6 hover:shadow-sm transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#E2E8F0] text-[#45556C] rounded-full flex items-center justify-center font-inter font-semibold">
              SK
            </div>

            <div className="leading-tight">
              <h3 className="font-inter text-[#0A0A0A] font-medium">
                Sarah Kim
              </h3>
              <p className="text-[#717182] font-inter text-sm">
                sarah@coach.com
              </p>
            </div>
          </div>

          <button
            className="px-3 py-1.5 text-sm font-inter font-medium
            text-[#900616] border border-[#900616] rounded-lg
            hover:bg-[#900616] hover:text-white
            transition-all duration-300"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
