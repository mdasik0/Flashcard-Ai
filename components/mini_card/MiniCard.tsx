import React from "react";
import './mini_card.css'

export default function MiniCard() {
  return (
    <div className="h-44 w-32 rounded-lg bg-gray-900 border-2 border-gray-800 mini-card relative overflow-hidden duration-300 hover:scale-105 cursor-pointer">
      <div className="bg-gray-800 h-36 w-28 ml-1.5 mt-1.5"></div>
    </div>
  );
}
