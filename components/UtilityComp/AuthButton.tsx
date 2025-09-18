"use client"
import { signIn, useSession } from 'next-auth/react';
import React from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc';
import { IoMdClose } from 'react-icons/io';

export default function AuthButton() {
  const [isOpen, setIsOpen] = React.useState(false);
  const {status} = useSession();
  console.log(status)
  return (
    <>
    {/* auth button */}
    {status === "unauthenticated" && <div onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-3 text-[#c5c5c5] hover:bg-[#1a1a1a] duration-300 px-4 py-2 rounded-lg cursor-pointer absolute top-10 right-10">
      <FaRegUserCircle className="text-2xl" />
      Sign in
    </div>}
    {/* auth modal */}
    {
      isOpen && <div  className='bg-black/60 backdrop-blur-lg w-screen h-screen absolute top-0 left-0 z-50 flex items-center justify-center'>
        <IoMdClose onClick={() => setIsOpen(!isOpen)} className='text-4xl absolute top-10 right-10 cursor-pointer' />
        <div className='w-[350px] h-[400px] bg-[#1a1a1a] p-10 rounded-2xl'>
          <h1 className='text-4xl'>Sign in</h1>
          <hr className='mt-3 text-gray-600' />
          {/* login methods */}
          {/* login with google */}
          <div onClick={() => signIn('google')} className='text-xl flex justify-center items-center gap-4 bg-[#0A0A0A] hover:bg-[#0f0f0f] duration-300 cursor-pointer rounded-xl py-3 mt-4'>
            <FcGoogle className='text-4xl' />
            Login with google
          </div>
        </div>
      </div>
    }
    </>
  )
}
