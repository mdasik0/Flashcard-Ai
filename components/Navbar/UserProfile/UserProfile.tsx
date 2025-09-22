import SignOutButton from "@/components/UtilityComp/SignOutButton";
import React from "react";
import { LuUserRound } from "react-icons/lu";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function UserProfile() {
  const [signoutPopup, setSignoutPopup] = React.useState(false);
  const { data } = useSession();

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (signoutPopup && !target.closest(".signout-popup")) {
        setSignoutPopup(false);
      }
    };

    if (signoutPopup) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [signoutPopup]);

  const signOutButtonPopup = (user: boolean) => {
    if (!user) {
      return console.log("User not logged in");
    }
    setSignoutPopup(!signoutPopup);
  };
  return (
    <div
      onClick={() => signOutButtonPopup(data?.user ? true : false)}
      title="User Profile"
      className="border cursor-pointer w-10 h-10 flex items-center justify-center rounded-full bg-[#1a1a1a] text-gray-400 hover:text-white duration-500 relative"
    >
        
      {data?.user?.image ? (
        <Image
          className="w-full h-full rounded-full border object-cover"
          width={40}
          height={40}
          src={data?.user?.image}
          alt="user profile picture"
        />
      ) : (
        <LuUserRound />
      )}

      <SignOutButton signoutPopup={signoutPopup} />
    </div>
  );
}
