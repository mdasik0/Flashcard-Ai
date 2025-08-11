"use client";
import { roboto } from "@/lib/fonts";
import React from "react";
import { FiCheck } from "react-icons/fi";
import { TiCancel } from "react-icons/ti";

export default function CardSelectionButton({ id, cardSelectFunction }: { id: number }) {
  const [confirmation, setConfirmation] = React.useState(false);

  const handleCancel = () => {
    setConfirmation(false);
  }
  return (
    <>
      {confirmation && (
        <div className="flex items-center justify-center mt-3 gap-3">
          Are you sure?{" "}
          <button onClick={() => {cardSelectFunction(id)}} className="px-2 py-2 bg-green-600 text-white font-bold rounded-lg cursor-pointer hover:bg-green-700 duration-300">
            <FiCheck />
          </button>{" "}
          <button onClick={handleCancel} className="px-2 py-2 bg-red-600 text-white font-bold rounded-lg cursor-pointer hover:bg-red-700 duration-300">
            <TiCancel />
          </button>
        </div>
      )}
      {!confirmation && (
        <div className="flex items-center justify-center">
          <button
            onClick={() => setConfirmation(true)}
            title="select"
            className={`px-4 py-2 text-sm flex items-center justify-center gap-2 mt-4 bg-[#181818] hover:bg-[#111111] cursor-pointer duration-500 text-green-600 font-semibold rounded-lg ${roboto.variable}`}
          >
            Select <FiCheck />
          </button>
        </div>
      )}
    </>
  );
}
