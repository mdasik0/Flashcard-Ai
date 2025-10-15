"use client";
import { useState } from "react";
import "./flashcard.css";
import { roboto } from "@/lib/fonts";
import { editModalObj, fetchedFlashcard, generatedFlashcard, ReactSetState } from "@/types/flashcard";
import Image from "next/image";
import QueSvg from "@/public/Svg/Question_icon.svg";
import AnsSvg from "@/public/Svg/Answer_icon.svg";
import toast from "react-hot-toast";

type FlashCardProps = {
  generatedFlashcard?: generatedFlashcard;
  fetchedFlashcard?: fetchedFlashcard;
  deckName?: string;
  i: number;
  cardSelection: boolean;
  setEditModal?: ReactSetState<editModalObj>;
};

export default function FlashCard({
  generatedFlashcard,
  fetchedFlashcard,
  deckName,
  i,
  setEditModal,
}: FlashCardProps) {
  const [flip, setFlip] = useState(false);

  const handleCardDelete = async (_id: string) => {
    // Handle card delete logic here
    console.log(`Delete card at index ${_id}`);
    try {
      const response = await fetch(
        `http://localhost:5000/api/flashcard/${_id}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      console.log(result);
      if (result?.success) {
        toast.success(result.message);
      }
    } catch (error) {
      console.log("There was an error deleting the flashcard", error);
    }
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
                {fetchedFlashcard
                  ? fetchedFlashcard?.question
                  : generatedFlashcard?.question}
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
              {fetchedFlashcard
                ? fetchedFlashcard?.deckName
                : deckName
                ? deckName
                : "Not selected"}
            </span>
            {/* edit and delete*/}
            <div>
              <button
                onClick={() =>
                  setEditModal?.({
                    _id: fetchedFlashcard!._id,
                    question: fetchedFlashcard!.question,
                    answer: fetchedFlashcard!.answer,
                    showModal: true,
                  })
                }
                disabled={!fetchedFlashcard}
                className="text-xs disabled:cursor-not-allowed disabled:bg-[#1d1d1d] disabled:text-gray-400 bg-[#0e0e0e]  px-3 py-2 rounded-full ms-2 cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() =>
                  handleCardDelete(fetchedFlashcard?._id as string)
                }
                disabled={!fetchedFlashcard}
                className="text-xs disabled:cursor-not-allowed disabled:bg-[#1d1d1d] disabled:text-gray-400 bg-[#c21313] px-3 py-2 rounded-full ms-2 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Back face */}
        <div className="flip-card-back bg-[#181818] p-3 flex flex-col">
          <h3
            className={`font-medium bg-[#0e0e0e] w-fit px-4 py-1.5 rounded-full mb-3 ${roboto.variable}`}
          >
            Answer
          </h3>
          <div className="relative rounded-xl p-3 flex-1 overflow-auto before:content-[''] before:absolute before:inset-0 before:bg-[#0e0e0e] before:rounded-xl before:-z-10">
            <Image
              className="w-full h-full object-contain absolute top-0 left-0 opacity-20 z-0 "
              src={AnsSvg}
              alt="Question_icon"
            />
            <span className="relative z-10" style={{ whiteSpace: "normal" }}>
              {fetchedFlashcard
                ? fetchedFlashcard?.answer
                : generatedFlashcard?.answer}
            </span>
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
}
