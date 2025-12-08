import InputField from "@/src/components/InputField";
import Link from "next/link";
import React from "react";

const Profile = () => {
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
          <div>
            <h3
              className="w-20 h-20 bg-[#BF0C21] text-white rounded-full
                flex items-center justify-center font-inter text-3xl my-6"
            >
              JM
            </h3>
          </div>

          <form action="" className="grid grid-cols-12 gap-x-10 gap-y-6">
            <InputField
              className={`col-span-6`}
              inputClass={`rounded-lg`}
              readOnly={true}
              placeholder={`Jamie`}
              label={`First Name`}
            />
            <InputField
              className={`col-span-6`}
              inputClass={`rounded-lg`}
              readOnly={true}
              placeholder={`Martinez`}
              label={`Last Name`}
            />
            <InputField
              className={`col-span-12`}
              inputClass={`rounded-lg`}
              readOnly={true}
              placeholder={`jamie@coach.com`}
              label={`Email`}
            />
            <InputField
              className={`col-span-12`}
              inputClass={`rounded-lg`}
              readOnly={true}
              placeholder={`Jamie's Wellness Coaching`}
              label={`Business Name`}
            />
            <InputField
              className={`col-span-12`}
              inputClass={`rounded-lg`}
              readOnly={true}
              placeholder={`https://jamie.coach`}
              label={`Website`}
            />
          </form>

          <Link href={"/account/editprofile"}>
            <button className="bg-[#900616] py-2 px-12 rounded-lg font-inter text-white mt-6 cursor-pointer">
              Edit
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 mt-10">
        <div>
          <p className="font-inter text-[#0A0A0A]">Team Members</p>

          <p className="text-[#717182] font-inter mb-6 mt-1.5">
            Invite team members to collaborate
          </p>
        </div>

        <div className="flex items-center gap-x-5">
          <InputField
            placeholder={`email@example.com`}
            inputClass={`rounded-lg`}
          />

          <button className="bg-[#900616] mt-2 py-3 px-8 rounded-lg font-inter text-white  cursor-pointer">
            Invite
          </button>
        </div>

        <div>
          <div className="border border-[#E2E8F0] p-4 rounded-lg flex items-center justify-between mt-6">
            <div className="flex items-center gap-5">
              <h3
                className="w-10 h-10 bg-[#BF0C21] text-white rounded-full
                flex items-center justify-center font-inter  "
              >
                JM
              </h3>

              <div>
                <h3 className="font-inter text-[#0A0A0A]">Jamie Martinez</h3>
                <p className="text-[#717182] font-inter ">jamie@coach.com</p>
              </div>
            </div>

            <span className="py-1 px-2 bg-[#900616] rounded-lg font-inter text-white cursor-pointer`">
              Owner
            </span>
          </div>

          <div className="border border-[#E2E8F0] p-4 rounded-lg flex items-center justify-between mt-6">
            <div className="flex items-center gap-5">
              <h3
                className="w-10 h-10 bg-[#E2E8F0] text-[#45556C] rounded-full
                flex items-center justify-center font-inter  "
              >
                SK
              </h3>

              <div>
                <h3 className="font-inter text-[#0A0A0A]">Sarah Kim</h3>
                <p className="text-[#717182] font-inter ">sarah@coach.com</p>
              </div>
            </div>

            <button className="py-1 px-2  rounded-lg font-inter hover:bg-[#900616] hover:text-white  cursor-pointer transition-all duration-300">
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
