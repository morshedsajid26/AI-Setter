"use client";
import InputField from "@/src/components/InputField";
import React, { useRef, useState } from "react";

const Edit = () => {
     const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(URL.createObjectURL(file)); // preview আনতে চাইলে
  };

  const openFilePicker = () => {
    fileInputRef.current.click();
  };
  return (
    <div>
      <div className="bg-white rounded-2xl p-6">
        <div>
          <p className="font-inter text-[#0A0A0A]">Profile Information</p>

          <p className="text-[#717182] font-inter mt-1.5">
            Update your personal details
          </p>
        </div>

        <div>
          <div className="flex items-center gap-6">
              <div
              className="w-20 h-20 bg-[#BF0C21] text-white rounded-full
                flex items-center justify-center font-inter text-3xl my-6 overflow-hidden"
            >
              {image ? (
                <img src={image} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                "JM"
              )}
            </div>

            <div>
              <button 
               onClick={openFilePicker}
              className="bg-[#900616] py-2 px-3 rounded-lg font-inter text-white cursor-pointer  ">
                Upload Photo
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              <p className="font-inter text-[#555555] text-sm mt-1">
                JPG, PNG or GIF. Max 5MB.
              </p>
            </div>
          </div>

          <form action="" className="grid grid-cols-12 gap-x-10 gap-y-6">
            <InputField
              className={`col-span-6`}
              inputClass={`rounded-lg`}
              placeholder={`Jamie`}
              label={`First Name`}
            />
            <InputField
              className={`col-span-6`}
              inputClass={`rounded-lg`}
              placeholder={`Martinez`}
              label={`Last Name`}
            />
            <InputField
              className={`col-span-12`}
              inputClass={`rounded-lg`}
              placeholder={`jamie@coach.com`}
              label={`Email`}
            />
            <InputField
              className={`col-span-12`}
              inputClass={`rounded-lg`}
              placeholder={`Jamie's Wellness Coaching`}
              label={`Business Name`}
            />
            <InputField
              className={`col-span-12`}
              inputClass={`rounded-lg`}
              placeholder={`https://jamie.coach`}
              label={`Website`}
            />
          </form>
          <div className="w-full flex justify-center">
            <button className="bg-[#900616] py-2 px-12 rounded-lg font-inter text-white mt-6 cursor-pointer  ">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
