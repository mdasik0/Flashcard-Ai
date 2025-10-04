import { roboto } from "@/lib/fonts";
import React from "react";
import { IoIosSave } from "react-icons/io";

type FlashCardSaveButtonProps = {
  selectedDeck: {deckName: string, deckId:string},
  handleSaveFlashCard : (deckName : string, deckId : string) => void,
  saveCardLoading: boolean
}

export default function FlashCardSaveButton({handleSaveFlashCard, saveCardLoading, selectedDeck}: FlashCardSaveButtonProps) {
  return (
    <button
      onClick={() =>
        handleSaveFlashCard(selectedDeck.deckName, selectedDeck.deckId)
      }
      disabled={!selectedDeck.deckId}
      title={selectedDeck.deckId ? "Save Flashcard" : "Select a deck to save"}
      className={`flex items-center disabled:text-[#505050] disabled:cursor-not-allowed ${roboto.className} text-green-500 font-[500] tracking-wider gap-1 font- px-5 py-2 bg-[#181818] hover:bg-[#272727] duration-300 cursor-pointer active:scale-95 rounded`}
    >
      {saveCardLoading ? (
        <span>Saving...</span>
      ) : (
        <>
          <IoIosSave className="text-lg" />
          Save
        </>
      )}
    </button>
  );
}
