"use client";
import { Deck, GetDeckApiRes } from "@/types/deck";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import CreateNewDeckModal from "../UtilityComp/CreateNewDeckModal";
import FlashCardCancelButton from "./FlashCardCancelButton";
import FlashCardSaveButton from "./FlashCardSaveButton";
import FlashCardDeckSelectOption from "./FlashCardDeckSelectOption";
import { generatedFlashcard } from "@/types/flashcard";

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
  const [decks, setDecks] = React.useState<Deck[] | []>([]);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const { data, status } = useSession();
  const [selectedDeck, setSelectedDeck] = React.useState({
    deckName: "",
    deckId: "",
  });

  // used for fetch all decks for > select deck dropdown
  useEffect(() => {
    // Wait for authentication to complete
    if (status === "loading") {
      return; // Still loading user data
    }

    if (status === "unauthenticated") {
      console.log("User not authenticated");
      return;
    }

    if (!data?.user?.id) {
      return;
    }

    const fetchDecks = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/decks/${data.user.id}`
        );
        const result: GetDeckApiRes<Deck[]> = await response.json();
        setDecks(result.data);
      } catch (error) {
        console.error("Error fetching decks:", error);
      }
    };

    fetchDecks();
  }, [data?.user?.id, status]);

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
