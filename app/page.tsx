// UI Component (page.tsx)
"use client";
import FlipCard from "@/components/FlipCard/FlipCard";
import CardSelectionButton from "@/components/G_Card_Selection/CardSelectionButton";
import GenerateInput from "@/components/GenerateInput/GenerateInput";
import { Flashcard } from "@/types/flashcard";
import { useSession } from "next-auth/react";
import React from "react";

export default function Home() {
  const LastGen_FCString = localStorage.getItem("lastGeneratedFlashcard");
  const lastGeneratedFlashcard = LastGen_FCString
    ? (JSON.parse(LastGen_FCString) as Flashcard)
    : null;
  const [flashcard, setFlashcards] = React.useState<Flashcard | null>(
    lastGeneratedFlashcard || null
  );
  const [error, setError] = React.useState<string | null>(null);
  // user email for user id
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const handleSaveFlashCard = (deckName: string, deckId: string) => {
    const newObj = { ...flashcard, userId, deckName, deckId };
    console.log("full flashcard", newObj);
    // TODO: call api to save flashcard
    // TODO: now remove the last Flashcard from localstorage.
    // TODO: clear flashcard state
  };

  return (
    <div>
      <div className="flex items-center justify-center w-[calc(100vw-90px)] px-8">
        {flashcard || error ? (
          <>
            <div className="mt-8 max-w-4xl mx-auto px-4">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              {flashcard && (
                <div className="rounded-lg shadow p-6">
                  <h2 className="text-3xl font-[500] text-center mb-6">
                    Save Your Flashcard
                  </h2>
                  <div className="flex flex-col">
                    {/* {flashcards} */}
                    <FlipCard cardSelection={true} card={flashcard} i={0} />
                    <CardSelectionButton
                      handleSaveFlashCard={handleSaveFlashCard}
                      setFlashcards={setFlashcards}
                    />
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <GenerateInput setFlashcards={setFlashcards} setError={setError} />
        )}
      </div>
    </div>
  );
}
