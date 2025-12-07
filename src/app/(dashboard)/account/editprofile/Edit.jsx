import InputField from '@/src/components/InputField'
import React from 'react'

const Edit = () => {
  return (
    <div>
       <div className='bg-white rounded-2xl p-6'>
        <div>
            <p className='font-inter text-[#0A0A0A]'>
            Profile Information
        </p>

        <p className='text-[#717182] font-inter mt-1.5'>
            Update your personal details
        </p>
        </div>

        <div>

            <div className='flex items-center gap-6'>
                <h3 className='w-20 h-20 bg-[#BF0C21] text-white rounded-full
                flex items-center justify-center font-inter text-3xl my-6'>JM</h3>

                <div>
                    <button className='bg-[#900616] py-2 px-3 rounded-lg font-inter text-white cursor-pointer  '>
                Upload Photo
            </button>
            <p className='font-inter text-[#555555] text-sm mt-1'>JPG, PNG or GIF. Max 5MB.</p>
                </div>

               
            </div>

            <form action="" className='grid grid-cols-12 gap-x-10 gap-y-6'>
                <InputField
                className={`col-span-6`}
                
                placeholder={`Jamie`}
                label={`First Name`}
                />
                <InputField
                className={`col-span-6`}
                
                placeholder={`Martinez`}
                label={`Last Name`}
                />
                <InputField
                className={`col-span-12`}
                
                placeholder={`jamie@coach.com`}
                label={`Email`}
                />
                <InputField
                className={`col-span-12`}
                
                placeholder={`Jamie's Wellness Coaching`}
                label={`Business Name`}
                />
                <InputField
                className={`col-span-12`}
                
                placeholder={`https://jamie.coach`}
                label={`Website`}
                />

            </form>
            <div className='w-full flex justify-center'>

            <button className='bg-[#900616] py-2 px-12 rounded-lg font-inter text-white mt-6 cursor-pointer  '>
                Save Changes
            </button>
            </div>
            
         


        </div>
      </div>
    </div>
  )
}

export default Edit
