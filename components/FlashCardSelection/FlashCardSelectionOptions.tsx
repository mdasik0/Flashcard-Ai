"use client";
import { useSession } from "next-auth/react";
import React from "react";
import CreateNewDeckModal from "../UtilityComp/CreateNewDeckModal";
import FlashCardCancelButton from "./FlashCardCancelButton";
import FlashCardSaveButton from "./FlashCardSaveButton";
import FlashCardDeckSelectOption from "./FlashCardDeckSelectOption";
import { generatedFlashcard } from "@/types/flashcard";
import { useDecks } from "@/app/providers/deck-provider";

type CardSelectionButtonProps = {
  setFlashcards: React.Dispatch<React.SetStateAction<generatedFlashcard | null>>;
  handleSaveFlashCard: (deckName: string, deckId: string) => void;
  saveCardLoading: boolean;
};
export default function CardSelectionButton({
  handleSaveFlashCard,
  setFlashcards,
  saveCardLoading,
}: CardSelectionButtonProps) {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const { data } = useSession();
  const [selectedDeck, setSelectedDeck] = React.useState({
    deckName: "",
    deckId: "",
  });

  const { decks, setDecks } = useDecks();

  return (
    <>
      <div className="flex gap-4 items-center justify-center mt-4">
        {/* select deck put in ref div for better control over dropdown*/}
        <FlashCardDeckSelectOption decks={decks} selectedDeck={selectedDeck} setSelectedDeck={setSelectedDeck} setModalOpen={setModalOpen} />

        {/* save button */}
        <FlashCardSaveButton
          handleSaveFlashCard={handleSaveFlashCard}
          saveCardLoading={saveCardLoading}
          selectedDeck={selectedDeck}
        />
        {/* cancel button */}
        <FlashCardCancelButton setFlashcards={setFlashcards} />
        {/* create new deck modal */}
        <CreateNewDeckModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          setDecks={setDecks}
          decks={decks}
          data={data}
        />
      </div>
    </>
  );
}
