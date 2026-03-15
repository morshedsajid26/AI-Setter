"use client";

import InputField from "@/src/components/InputField";
import Dropdown from "@/src/components/Dropdown";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/src/config/axios";
import Cookies from "js-cookie";
import { BASE_URL } from "@/src/config/api";
import Password from "@/src/components/Password";
import toast from "react-hot-toast";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(null);

  // Add User State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addingUser, setAddingUser] = useState(false);
  const [removingUserId, setRemovingUserId] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "", // default to empty
  });

  const [teamMembers, setTeamMembers] = useState([]);

  /* ---------------- FETCH PROFILE ---------------- */
  useEffect(() => {
    const fetchProfileAndTeam = async () => {
      try {
        const token = Cookies.get("accessToken");
        const headers = { Authorization: `Bearer ${token}` };

        const res = await axiosInstance.get(`/auth/me/`, { headers });
        setProfile(res.data);

        if (res.data?.profile_image) {
          setPreview(res.data.profile_image);
        } else {
          setPreview(null);
        }

        // Fetch team members if user is ADMIN
        if (res.data?.role === "ADMIN") {
          const usersRes = await axiosInstance.get(`/auth/users/`, { headers });
          // Filter out the current user from the list if desired, or keep everyone:
          // Currently keeping everyone as per the design with "Owner"
          setTeamMembers(usersRes.data);
        }

      } catch (error) {
        console.error("Profile fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndTeam();
  }, []);

  /* ---------------- ADD USER ---------------- */
  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.password || !newUser.role) {
      toast.error("Please fill all fields, including the role");
      return;
    }

    try {
      setAddingUser(true);
      const token = Cookies.get("accessToken");

      const res = await axiosInstance.post(`${BASE_URL}/auth/users/`, newUser, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Re-fetch the team members list to get the updated data
      const usersRes = await axiosInstance.get(`${BASE_URL}/auth/users/`, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      setTeamMembers(usersRes.data);

      toast.success("User added successfully!");

      // Close and reset modal
      setIsModalOpen(false);
      setNewUser({ name: "", email: "", password: "", role: "" });
    } catch (err) {
      console.error("Add user error:", err);
      toast.error(err.response?.data?.message || "Failed to add user");
    } finally {
      setAddingUser(false);
    }
  };

  /* ---------------- REMOVE USER ---------------- */
  const handleRemoveUser = async (userId) => {
    try {
      setRemovingUserId(userId);
      const token = Cookies.get("accessToken");
      
      await axiosInstance.delete(`${BASE_URL}/auth/users/${userId}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Remove from local state
      setTeamMembers((prev) => prev.filter(member => member.id !== userId));
      toast.success("User removed successfully!");
    } catch (err) {
      console.error("Remove user error:", err);
      toast.error(err.response?.data?.message || "Failed to remove user");
    } finally {
      setRemovingUserId(null);
    }
  };

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
    (profile.name?.[0] || "U") + (profile.name?.split(" ")?.[1]?.[0] || "");

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
            className="col-span-12"
            inputClass="rounded-lg"
            readOnly
            value={profile.name || ""}
            label="Name"
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

      {/* ================= TEAM MEMBERS (ADMIN ONLY) ================= */}
      {profile.role === "ADMIN" && (
        <div className="bg-white rounded-2xl p-6 mt-10">
          <div>
            <p className="font-inter text-[#0A0A0A]">Team Members</p>
            <p className="text-[#717182] font-inter mb-6 mt-1.5">
              Invite team members to collaborate
            </p>
          </div>

          <div className="">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#900616] mt-2 py-3 px-8 rounded-lg font-inter text-white cursor-pointer"
            >
              Add User
            </button>
          </div>

          {/* ================= DYNAMIC MEMBERS LIST ================= */}
          <div className="mt-6 flex flex-col gap-4">
            {[...teamMembers]
              .sort((a, b) => (a.role === "ADMIN" ? -1 : 1)) // Sorts admins to top
              .map((member) => {
                const memberInitials = (member.name && member.name !== "null")
                  ? (member.name[0] + (member.name.split(" ")[1]?.[0] || "")).toUpperCase()
                  : "U";

                const isCurrentUser = member.id === profile.id;

                return (
                  <div
                    key={member.id}
                    className={`border border-[#E2E8F0] p-4 flex items-center justify-between transition-all duration-300 ${isCurrentUser ? "rounded-lg" : "bg-white rounded-xl hover:shadow-sm"
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 ${isCurrentUser ? "bg-[#BF0C21] text-white" : "bg-[#E2E8F0] text-[#45556C]"} rounded-full flex items-center justify-center font-inter font-semibold overflow-hidden`}>
                        {member.profile_image ? (
                          <img
                            src={member.profile_image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          memberInitials
                        )}
                      </div>

                      <div className="leading-tight">
                        <h3 className={`font-inter ${isCurrentUser ? "text-[#0A0A0A]" : "text-[#0A0A0A] font-medium"}`}>
                          {member.name !== "null" ? member.name : "Unknown"} {isCurrentUser && "(You)"}
                        </h3>
                        <p className={`text-[#717182] font-inter ${!isCurrentUser && "text-sm"}`}>
                          {member.email}
                        </p>
                      </div>
                    </div>

                    {isCurrentUser ? (
                      <span className="py-1 px-2 bg-[#900616] rounded-lg font-inter text-white">
                        {member.role}
                      </span>
                    ) : (
                      <button
                        onClick={() => handleRemoveUser(member.id)}
                        disabled={removingUserId === member.id}
                        className="px-3 py-1.5 text-sm font-inter font-medium text-[#900616] border border-[#900616] rounded-lg hover:bg-[#900616] hover:text-white transition-all duration-300 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-[#900616]"
                      >
                        {removingUserId === member.id ? "Removing..." : "Remove"}
                      </button>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* ================= ADD USER MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-inter font-semibold text-2xl text-[#0A0A0A]">
                Add New User
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#717182] hover:text-[#0A0A0A] text-2xl"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleAddUser} className="flex flex-col gap-5">
              <InputField
                label="Name"
                placeholder="John Doe"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                inputClass="rounded-lg"
              />

              <InputField
                label="Email Address"
                type="email"
                placeholder="john@example.com"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                inputClass="rounded-lg"
              />

              {/* <InputField
                label="Password"
                type="password"
                placeholder="********"
                value={newUser.password}
                onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                inputClass="rounded-lg"
              /> */}

              <Password
                label="Password"
                placeholder="********"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                inputClass="rounded-lg border-none bg-[#F3F3F5]"
              />

              <Dropdown
                label="Role"
                placeholder="Select a Role"
                options={["TESTER", "ADMIN"]}
                value={newUser.role}
                onSelect={(val) => setNewUser({ ...newUser, role: val })}
                labelClass="font-inter text-sm text-[#333333]"
                inputClass={`font-inter rounded-lg px-3 py-3 w-full bg-[#F3F3F5] ${!newUser.role ? 'text-[#717182]' : 'text-[#0A0A0A]'}`}
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 rounded-lg font-inter font-medium text-[#45556C] bg-[#F1F5F9] hover:bg-[#E2E8F0] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addingUser}
                  className="px-6 py-2.5 rounded-lg font-inter font-medium text-white bg-[#900616] disabled:opacity-60 transition-colors"
                >
                  {addingUser ? "Adding..." : "Add User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
