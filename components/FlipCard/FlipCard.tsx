"use client";
import { useState } from "react";
import "./flipCard.css";
import { roboto } from "@/lib/fonts";


export default function FlipCard() {
  const [flip, setFlip] = useState(false);
  const deckName = 'Js question';
  return (
    <div className="flip-card-container" onClick={() => setFlip(!flip)}>
      <div className={`flip-card ${flip ? "flip-card-anim" : ""}`}>
        {/* Front face */}
        <div className={`flip-card-front border-[10px] border-[#181818] bg-[#0e0e0e] flex flex-col justify-between leading-10 ${roboto.variable}`}>
          <div className="p-4 pt-3 relative h-full">
            <span className="text-3xl font-semibold">How event loop handles sync and async questions?</span>
            <div className="absolute bottom-2 right-2 text-sm bg-gray-500 w-8 h-8 rounded-full flex items-center justify-center">01</div>
          </div>
          <div onClick={e => e.stopPropagation()} className="bg-[#181818] cursor-auto ps-1 pt-2 flex justify-between items-center">
            {/* deck name */}
            <span className="text-xs bg-[#0e0e0e] px-3 py-2 rounded-full bg">{deckName}</span>
            {/* edit and delete*/}
            <div>
            <span className="text-xs bg-[#0e0e0e] px-3 py-2 rounded-full ms-2 cursor-pointer">Edit</span>
            <span className="text-xs bg-[#c2131393] px-3 py-2 rounded-full ms-2 cursor-pointer">Delete</span>
            </div>
          </div>
        </div>
        
        {/* Back face */}
        <div className="flip-card-back bg-red-800">
          <span>Back Answer</span>
        </div>
      </div>
    </div>
  ); 
}