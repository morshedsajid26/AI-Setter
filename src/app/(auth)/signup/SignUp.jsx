import Image from 'next/image'
import React from 'react'

import InputField from '@/src/components/InputField'
import Password from '@/src/components/Password'
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';


const SignUp = () => {
  return (
    <div className= 'bg-[#EAEAEA] h-screen grid justify-center items-center'>

     <main className="bg-white  overflow-y-auto hide-scrollbar py-20 px-11 rounded-3xl  ">
      <form className="gap-5 flex flex-col items-center w-[480px] ">

        

      <h3 className='font-inter font-medium text-[32px] text-[#333333] mb-6 mt-'>Signin to Account</h3>

      <p className='font-inter  text-[#333333]'>Please enter your email and password to continue</p>

      <InputField
      label='Name'
      labelClass={`text-[#333333] text-[16px]`}
      placeholder=''
      inputClass={`border-[#900616] border bg-transparent rounded  text-[#5C5C5C] py-3 placeholder:text-[#5C5C5C]`}
      
      />
         <InputField
      label='Email Address'
      labelClass={`text-[#333333] text-[16px]`}
      placeholder=''
      inputClass={`border-[#900616] border bg-transparent rounded  text-[#5C5C5C] py-3 placeholder:text-[#5C5C5C]`}
      
      />

      <Password
      label='Password'
      // placeholder="Enter your password"
      />

      {/* <div className="flex justify-between items-center  w-full ">
          <div className="flex items-center gap-2.5">
            <input type="checkbox" className="w-4 h-4 accent-[#005FA8]" />
            <p className="text-[#333333] font-inter ">Remember Password</p>
          </div>
        
        </div> */}



   <Link className='w-full' href='/signin'>
      <button className='bg-[#900616] text-white font-semibold text-xl w-full font-inter py-3 rounded-lg cursor-pointer mt-12'>
        Sign Up
      </button>
      
      </Link>

      <p className='font-inter '>
        Already have an account? 
        
        <a href="signin"
        className='font-bold'
        >
         Sign in
        </a>
      </p>

     
      
      </form>

    </main>
    </div>
  )
}

export default SignUp