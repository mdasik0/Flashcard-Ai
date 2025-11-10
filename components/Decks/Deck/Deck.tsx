import React from "react";
import "./deck.css";
import { slab } from "@/lib/fonts";
export default function Deck() {
  return (
    <div className="">
      <div className="deck-container">

        <div className="dCard left-left-card border-2 bg-[#0E0E0E]">
          
        </div>
        <div className="dCard left-card border-2 bg-[#0E0E0E]">
          
        </div>
        <div className={`dCard center-card border-2 bg-[#0E0E0E] text-4xl flex items-center justify-center ${slab.variable}`}>
          1
        </div>
        <div className="dCard right-card border-2 bg-[#0E0E0E]">
          
        </div>
        <div className="dCard right-right-card border-2 bg-[#0E0E0E]">
          
        </div>
      </div>

    </div>
  );
}
