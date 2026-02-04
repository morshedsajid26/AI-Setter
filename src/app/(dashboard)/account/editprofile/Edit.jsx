"use client";

import InputField from "@/src/components/InputField";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { BASE_URL } from "@/src/config/api";
import { useRouter } from "next/navigation";


const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const Edit = () => {
  const fileInputRef = useRef(null);

  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    business_name: "",
    website: "",
  });

  /* ================= FETCH SAVED PROFILE ================= */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = Cookies.get("accessToken");

        const res = await axios.get(`${BASE_URL}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFormData({
          first_name: res.data.first_name || "",
          last_name: res.data.last_name || "",
          email: res.data.email || "",
          business_name: res.data.business_name || "",
          website: res.data.website || "",
        });

        if (res.data.image) {
          setPreview(res.data.image);
        }
      } catch (err) {
        console.error("FETCH ERROR:", err);
        toast.error("Failed to load profile data");
      }
    };

    fetchProfile();
  }, []);

  /* ================= INPUT CHANGE ================= */
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* ================= IMAGE PICK ================= */
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files allowed");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("Image must be under 5MB");
      return;
    }

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ================= URL VALIDATION ================= */
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  /* ================= UPDATE PROFILE (PUT) ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const token = Cookies.get("accessToken");

      const payload = new FormData();

      if (formData.first_name)
        payload.append("first_name", formData.first_name);

      if (formData.last_name)
        payload.append("last_name", formData.last_name);

      if (formData.business_name)
        payload.append("business_name", formData.business_name);

      if (formData.website) {
        if (!isValidUrl(formData.website)) {
          toast.error("Website must be a valid URL (https://example.com)");
          setLoading(false);
          return;
        }
        payload.append("website", formData.website);
      }

      if (imageFile) {
        payload.append("image", imageFile);
      }

      await axios.put(`${BASE_URL}/auth/profile`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Profile updated successfully");

     setTimeout(() => {
          router.push("/account");
        }, 600);
      
    } catch (err) {
      console.error("UPDATE ERROR:", err.response?.data);
      toast.error(
        err.response?.data?.message || "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  const initials =
    (formData.first_name?.[0] || "U") +
    (formData.last_name?.[0] || "");

  return (
    <div className="bg-white rounded-2xl p-6">
      <p className="font-inter text-[#0A0A0A]">Profile Information</p>
      <p className="text-[#717182] font-inter mt-1.5">
        Update your personal details
      </p>

      <form onSubmit={handleSubmit}>
        {/* ================= AVATAR ================= */}
        <div className="flex items-center gap-6 my-6">
          <div className="w-20 h-20 bg-[#BF0C21] text-white rounded-full flex items-center justify-center text-3xl overflow-hidden">
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

          <div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-[#900616] py-2 px-3 rounded-lg text-white cursor-pointer"
            >
              Upload Photo
            </button>

            <input
              ref={fileInputRef}
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />

            <p className="text-sm mt-1 text-[#555]">
              JPG, PNG or GIF. Max 5MB.
            </p>
          </div>
        </div>

        {/* ================= FORM ================= */}
        <div className="grid grid-cols-12 gap-6">
          <InputField
            type="text"
            className="col-span-6"
            inputClass="rounded-lg"
            label="First Name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />

          <InputField
            type="text"
            className="col-span-6"
            inputClass="rounded-lg"
            label="Last Name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />

          <InputField
            type="email"
            className="col-span-12"
            inputClass="rounded-lg"
            label="Email"
            name="email"
            value={formData.email}
            readOnly
          />

          <InputField
            type="text"
            className="col-span-12"
            inputClass="rounded-lg"
            label="Business Name"
            name="business_name"
            value={formData.business_name}
            onChange={handleChange}
          />

          <InputField
            type="text"
            className="col-span-12"
            inputClass="rounded-lg"
            label="Website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://example.com"
          />
        </div>

        <div className="flex justify-center">
          <button
            disabled={loading}
            className="bg-[#900616] py-3 px-12 rounded-lg text-white mt-6 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
