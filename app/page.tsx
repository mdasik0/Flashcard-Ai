// UI Component (page.tsx)
"use client";
import GenerateInput from "@/components/GenerateInput/GenerateInput";
import { Flashcard } from "@/types/flashcard";
import React from "react";

export default function Home() {
  const [flashcards, setFlashcards] = React.useState<Flashcard[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  console.log(flashcards)

  return (
    <div className="">
      <div className="flex items-center justify-center w-[calc(100vw-90px)] px-8">
        {flashcards || error ? (
          <>
              <div className="mt-8 max-w-4xl mx-auto px-4">
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                  </div>
                )}

                {flashcards && (
                  <div className="rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold mb-4">
                      Generated Flashcards
                    </h2>
                    <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded overflow-x-auto">
                      {/* {flashcards} */}
                    </pre>
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
