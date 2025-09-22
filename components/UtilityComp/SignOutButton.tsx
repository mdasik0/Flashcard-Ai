import { signOut } from 'next-auth/react';
import React from 'react'
import { PiSignOutBold } from "react-icons/pi";

type SignOutButtonProps = {
  signoutPopup: boolean;
}

export default function SignOutButton({signoutPopup} : SignOutButtonProps) {
  return (
    <div onClick={() => signOut()} className={`signout-popup px-3 py-1.5 rounded-lg bg-red-500 text-white absolute ${signoutPopup ? 'left-15 opacity-100' : '-left-0 opacity-0 pointer-events-none'} duration-200 whitespace-nowrap flex items-center gap-2`}>Sign out <PiSignOutBold /></div>
  )
}
