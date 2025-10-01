// UI Component (page.tsx)
"use client";
import FlipCard from "@/components/FlipCard/FlipCard";
import CardSelectionButton from "@/components/G_Card_Selection/CardSelectionButton";
import GenerateInput from "@/components/GenerateInput/GenerateInput";
import { Flashcard } from "@/types/flashcard";
import React from "react";

export default function Home() {
  const [flashcard, setFlashcards] = React.useState<Flashcard | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleSaveFlashcardToDeck = async (id: number) => {
    // Logic to handle flashcard selection
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
                      Choose your 1 flashcard
                    </h2>
                    <div className="flex gap-20">
                      {/* {flashcards} */}
                      <FlipCard cardSelection={true} card={flashcard} i={0} />
                      <CardSelectionButton cardSelectFunction={handleSaveFlashcardToDeck} id={0} />
                      {/* {
                        flashcard?.map((card, index) => {
                          return (
                            <div key={index}>

                            {flashcard?.length > 0 && <CardSelectionButton cardSelectFunction={handleSaveFlashcardToDeck} id={index} />}
                            </div>
                          )
                        })
                      } */}
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
