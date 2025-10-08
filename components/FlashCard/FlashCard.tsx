"use client";
import { useState } from "react";
import "./flashcard.css";
import { roboto } from "@/lib/fonts";
import { Flashcard } from "@/types/flashcard";
import Image from "next/image";
import QueSvg from "@/public/Svg/Question_icon.svg";
import AnsSvg from "@/public/Svg/Answer_icon.svg";

export default function FlipCard({
  card,
  i,
  cardSelection,
}: {
  card: Flashcard;
  i: number;
  cardSelection?: boolean;
}) {
  const [flip, setFlip] = useState(false);
  const deckName = "Js question";
  const handleCardEdit = (index: number) => {
    // Handle card edit logic here
    console.log(`Edit card at index ${index}`);
  };
  const handleCardDelete = (index: number) => {
    // Handle card delete logic here
    console.log(`Delete card at index ${index}`);
  };
  return (
    <div
      className="flip-card-container w-full h-full"
      onClick={() => setFlip(!flip)}
    >
      <div
        className={`flip-card w-full h-full ${flip ? "flip-card-anim" : ""}`}
      >
        {/* Front face */}
        <div
          className={`flip-card-front border-[10px] border-[#181818] bg-[#0e0e0e] flex flex-col justify-between leading-10 ${roboto.variable}`}
        >
          <div className="p-4 pt-3 relative h-full flex flex-col">
            <Image
              className="w-full h-full object-contain absolute top-0 left-0 -z-[100] opacity-25"
              src={QueSvg}
              alt="Question_icon"
            />
            {/* question */}
            <div className="flex-1 flex items-start justify-center">
              <p
                className="text-lg sm:text-2xl text-start w-full"
                style={{
                  whiteSpace: "normal",
                }}
              >
                {card?.question}
              </p>
            </div>

            {/* index */}
            <div className="absolute bottom-2 right-2 text-xs bg-[#181818] hover:bg-[#1b1b1b] duration-300 w-6 h-6 rounded-full flex items-center justify-center">
              {i + 1}
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
              <button
                onClick={() => handleCardEdit(i)}
                disabled={cardSelection}
                className="text-xs disabled:cursor-not-allowed disabled:bg-[#1d1d1d] disabled:text-gray-400 bg-[#0e0e0e]  px-3 py-2 rounded-full ms-2 cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => handleCardDelete(i)}
                disabled={cardSelection}
                className="text-xs disabled:cursor-not-allowed disabled:bg-[#1d1d1d] disabled:text-gray-400 bg-[#c21313] px-3 py-2 rounded-full ms-2 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Back face */}
        <div className="flip-card-back bg-[#181818] p-3 flex flex-col">
  <h3 className={`font-medium bg-[#0e0e0e] w-fit px-4 py-1.5 rounded-full mb-3 ${roboto.variable}`}>
    Answer 
  </h3>
  <div className="relative rounded-xl p-3 flex-1 overflow-auto before:content-[''] before:absolute before:inset-0 before:bg-[#0e0e0e] before:rounded-xl before:-z-10">
    <Image
      className="w-full h-full object-contain absolute top-0 left-0 opacity-20 z-0 "
      src={AnsSvg}
      alt="Question_icon"
    />
    <span className="relative z-10" style={{ whiteSpace: "normal" }}>
      {card?.answer}
    </span>
  </div>
</div>
      </div>
    </div>
  );
}
