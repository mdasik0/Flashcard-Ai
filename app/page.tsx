// UI Component (page.tsx)
"use client";
import FlipCard from "@/components/FlipCard/FlipCard";
import GenerateInput from "@/components/GenerateInput/GenerateInput";
import { Flashcard } from "@/types/flashcard";
import React from "react";

export default function Home() {
  const [flashcards, setFlashcards] = React.useState<Flashcard[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  console.log(flashcards)
  const flashcardDemo = [{
    "question": "What is JavaScript?",
    "answer": "JavaScript is a high-level, interpreted programming language that primarily focuses on building web-based applications."
  },
  {
    "question": "What is the purpose of a function in JavaScript?",
    "answer": "Functions in JavaScript are used to encapsulate a set of statements to perform a specific task, making code reusable and modular."
  }
]

  return (
    <div className="">
      <div className="flex items-center justify-center w-[calc(100vw-90px)] px-8">
        {flashcardDemo || error ? (
          <>
              <div className="mt-8 max-w-4xl mx-auto px-4">
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                  </div>
                )}

                {flashcardDemo && (
                  <div className="rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold mb-4">
                      Choose your 1 flashcard
                    </h2>
                    <pre className="flex gap-20">
                      {/* {flashcardDemo} */}
                      {
                        flashcardDemo.map((card, index) => {
                          return (
                            <FlipCard card={card} i={index} key={index} />
                          )
                        })
                      }
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
