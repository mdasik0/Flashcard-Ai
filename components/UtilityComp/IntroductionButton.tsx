import React from "react";
import { TiInfoLarge } from "react-icons/ti";

export default function IntroductionButton() {
  return (
    <>
    {/* button */}
      <div
        data-tooltip="introduction"
        className="w-5 h-5 border-2 text-gray-500 hover:text-gray-200 duration-300 cursor-help rounded-full flex items-center justify-center user-profile"
      >
        <TiInfoLarge className="" />
      </div>
      {/* modal */}
      <div className="absolute"></div>
    </>
  );
}
