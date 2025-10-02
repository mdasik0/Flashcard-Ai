"use client";
import { roboto } from "@/lib/fonts";
import { Flashcard } from "@/types/flashcard";
import React, { useEffect, useRef } from "react";
import {
  FaCaretDown,
  FaPlus,
  FaRegCheckCircle,
  FaRegCircle,
} from "react-icons/fa";
import { IoIosSave, IoMdClose } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";

type CardSelectionButtonProps = {
  id: number;
  cardSelectFunction: (id: number) => void;
  setFlashcards: React.Dispatch<React.SetStateAction<Flashcard | null>>;
};
export default function CardSelectionButton({
  id,
  cardSelectFunction,
  setFlashcards,
}: CardSelectionButtonProps) {
  // deck dropdown state
  const [open, setOpen] = React.useState<boolean>(false);
  const [selectedDeck, setSelectedDeck] = React.useState<string | null>(null);
  // new deck modal state
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [input, setInput] = React.useState("");
  const deckname = "Sample Deck 123";
  const handleCancelSave = () => {
    setFlashcards(null);
    localStorage.removeItem("lastGeneratedFlashcard");
  };

  const setDeck = (name: string) => {
    setSelectedDeck(name);
    //TODO: send it to save flashcard function to form an object
    setOpen(false);
  };

  const handleCreateNewDeck = () => {
    console.log("deck", input);
  };

  // drop down behavior control
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);
  return (
    <>
      {/* buttons */}
      <div className="flex gap-4 items-center justify-center mt-4">
        {/* save button */}
        <div ref={dropdownRef} className={`relative ${roboto.className}`}>
          <button
            onClick={() => setOpen(!open)}
            className={`flex items-center relative text-green-500 font-[500] tracking-wider gap-1 font- ps-3 pe-7 py-2 bg-[#181818] hover:bg-[#272727] duration-300 cursor-pointer active:scale-95 rounded`}
          >
            {selectedDeck ? (
              <FaRegCheckCircle className="text-lg" />
            ) : (
              <FaRegCircle className="text-lg" />
            )}
            Deck
            <FaCaretDown
              className={`absolute top-1/2 right-2 -translate-y-1/2 text-sm duration-300 ${
                open ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
          {open && (
            <div className="absolute text-center bottom-12 left-0 w-[160px] h-fit rounded-lg p-1.5  bg-[#0E0E0E] border border-[#181818] text-white flex flex-col gap-1.5 items-center">
              {/* show dynamic deck */}
              {}

              <button
                onClick={() => setDeck(deckname)}
                className={`bg-[#181818] hover:bg-[#1d1d1d] ${
                  selectedDeck ? "text-green-400" : "text-white"
                } duration-300 active:scale-95 cursor-pointer text-sm font-medium w-full py-1.5 px-3 rounded flex items-center justify-center gap-2 text-nowrap`}
              >
                {deckname.length > 15
                  ? deckname.slice(0, 15) + "..."
                  : deckname}
              </button>

              <button
                onClick={() => setModalOpen(true)}
                className=" bg-[#181818] hover:bg-[#1d1d1d] duration-300 active:scale-95 cursor-pointer text-sm font-medium w-full py-1.5 px-3 rounded flex items-center justify-center gap-2 text-nowrap"
              >
                Create New Deck <FaPlus />
              </button>
            </div>
          )}
        </div>

        <button
          disabled={!selectedDeck}
          title={selectedDeck ? "Save Flashcard" : "Select a deck to save"}
          className={`flex items-center disabled:text-[#505050] disabled:cursor-not-allowed ${roboto.className} text-green-500 font-[500] tracking-wider gap-1 font- px-5 py-2 bg-[#181818] hover:bg-[#272727] duration-300 cursor-pointer active:scale-95 rounded`}
        >
          <IoIosSave className="text-lg" />
          Save
        </button>
        {/* cancel button */}
        <button
          onClick={handleCancelSave}
          className={`flex items-center ${roboto.className} text-red-500 font-[500] tracking-wider gap-1 font- px-5 py-2 bg-[#181818] hover:bg-[#272727] duration-300 cursor-pointer active:scale-95 rounded`}
        >
          <MdOutlineCancel />
          cancel
        </button>
        {modalOpen && (
          <div className="w-screen h-screen absolute top-0 left-0 bg-black/30 backdrop-blur-lg flex items-center justify-center">
            <div className="w-[300px] h-[300px] rounded-xl p-4 bg-[#111111] border-4 border-[#181818] flex flex-col items-start justify-between gap-3 relative">
              <div className="w-full">
                <h2
                  className={`text-xl ${roboto.className} font-semibold text-nowrap mb-3`}
                >
                  Create New Deck
                </h2>
                <label
                  htmlFor="deckName"
                  className="text-xs mb-1 text-stone-500 text-start block w-full"
                >
                  Deck Name
                </label>
                <input
                  name="deckName"
                  onChange={(e) => setInput(e.target.value)}
                  required
                  className="w-full px-3 py-1.5 rounded border border-[#181818] bg-[#0E0E0E]"
                  maxLength={20}
                  placeholder="Enter a Deck Name"
                />
                <span className="text-xs mt-1 text-stone-700 text-end block w-full">
                  20 character limit
                </span>
              </div>
              <button
                onClick={handleCreateNewDeck}
                className="flex gap-1 items-center px-5 py-2 rounded shadow shadow-black/20 bg-[#181818] hover:bg-[#272727] duration-300 cursor-pointer active:scale-95"
              >
                Create Deck
                <FaPlus />
              </button>
              <div
                onClick={() => setModalOpen(false)}
                className="absolute -top-3 -right-3 p-1 rounded-full bg-red-500 active:scale-95 hover:bg-red-400 duration-300 cursor-pointer"
              >
                <IoMdClose />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
