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
  const [deckModal, setDeckModal] = React.useState(false);
  // user email for user id
  const { data: session } = useSession();
  const userId = session?.user?.email;
  //TODO: select or create deck to save to

  // function to handle flashcard selection
  const handleSaveFlashcardToDeck = async (id: number) => {
    // Logic to handle flashcard selection
    if (!flashcard?.question || !flashcard?.answer)
      return alert("No flashcard to save");
    // during save add an option to select or create a deck to save to
    if (!userId) return alert("User not logged in");

    // try {
    //   // api call
    //   const response = await fetch("http://localhost:5000/api/flashcard", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       question: flashcard.question,
    //       answer: flashcard.answer,
    //     }),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Failed to save flashcard");
    //   }

    //   const data = await response.json();
    //   console.log("Flashcard saved successfully:", data);

    //   // Optionally, you can provide user feedback here
    // } catch (error) {
    //   console.log("there was an error trying to save the flashcard", error);
    // }
    console.log("Flashcard selected" + id);
    // const response = await setFlashCard
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
                      cardSelectFunction={() => setDeckModal(true)}
                      id={0}
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
      {deckModal && 
      <div className="absolute top-0 left-0 w-screen h-screen bg-black/30 backdrop:blur-md flex items-center justify-center">
        </div>}
    </div>
  );
}
