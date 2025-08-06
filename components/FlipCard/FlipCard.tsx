"use client";
import { useState } from "react";
import "./flipCard.css";
import { roboto } from "@/lib/fonts";

export default function FlipCard() {
  const [flip, setFlip] = useState(false);
  const deckName = "Js question";
  return (
    <div className="flip-card-container" onClick={() => setFlip(!flip)}>
      <div className={`flip-card ${flip ? "flip-card-anim" : ""}`}>
        {/* Front face */}
        <div
          className={`flip-card-front border-[10px] border-[#181818] bg-[#0e0e0e] flex flex-col justify-between leading-10 ${roboto.variable}`}
        >
          <div className="p-4 pt-3 relative h-full">
            {/* question */}
            <span className="text-3xl font-semibold">
              How event loop handles sync and async questions?
            </span>
            {/* index */}
            <div className="absolute bottom-2 right-2 text-xs bg-[#181818] hover:bg-[#1b1b1b] duration-300 w-6 h-6 rounded-full flex items-center justify-center">
              01
            </div>
          </div>
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#181818] cursor-auto ps-1 pt-2 flex justify-between items-center"
          >
            {/* deck name */}
            <span className="text-xs bg-[#0e0e0e] px-3 py-2 rounded-full bg">
              {deckName}
            </span>
            {/* edit and delete*/}
            <div>
              <span className="text-xs bg-[#0e0e0e] px-3 py-2 rounded-full ms-2 cursor-pointer">
                Edit
              </span>
              <span className="text-xs bg-[#c2131393] px-3 py-2 rounded-full ms-2 cursor-pointer">
                Delete
              </span>
            </div>
          </div>
        </div>

        {/* Back face */}
        <div className="flip-card-back bg-[#181818] p-6">
          <h3 className={`text-2xl ${roboto.variable}`}>Answer :</h3><br />
          <span>
            Synchronous code runs line-by-line, blocking further execution until
            each task finishes. Asynchronous code (like setTimeout, fetch, or
            Promise) is sent to the Web APIs or task queue. The event loop waits
            for the call stack to be empty, then pushes async callbacks from the
            queue into the stack to execute them.
          </span>
        </div>
      </div>
    </div>
  );
}
