// UI Component (page.tsx)
"use client";
import FlipCard from "@/components/FlashCard/FlashCard";
import CardSelectionButton from "@/components/FlashCardSelection/FlashCardSelectionOptions";
import GenerateInput from "@/components/GenerateInput/GenerateInput";
import { Flashcard, PostFleshCardApiRes } from "@/types/flashcard";
import { useSession } from "next-auth/react";
import React from "react";

export default function Home() {
  const [flashcard, setFlashcards] = React.useState<Flashcard | null>(null);

  React.useEffect(() => {
    const LastGen_FCString = localStorage.getItem("lastGeneratedFlashcard");
    if (LastGen_FCString) {
      try {
        const lastGeneratedFlashcard = JSON.parse(
          LastGen_FCString
        ) as Flashcard;
        setFlashcards(lastGeneratedFlashcard);
      } catch (error) {
        console.error("Error parsing flashcard from localStorage:", error);
      }
    }
  }, []);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  // user email for user id
  const { data: session } = useSession();
  const userId = session?.user?.id;

  console.log(flashcard);

  const handleSaveFlashCard = async (deckName: string, deckId: string) => {
    if (!userId) {
      return console.log("user is not loaded yet or user not logged in.");
    }
    if (!deckName || !deckId) {
      return console.log("you had not selected any deck yet.");
    }
    setLoading(true);
    const newFlashCard = { ...flashcard, userId, deckName, deckId };
    try {
      const response = await fetch("http://localhost:5000/api/flashcard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFlashCard),
      });
      const confirmation: PostFleshCardApiRes = await response.json();
      setLoading(false);
      if (confirmation.success) {
        alert(confirmation.message);
        localStorage.removeItem("lastGeneratedFlashcard");
        setFlashcards(null);
      }
    } catch (error) {
      setLoading(false);
      console.log("There was an error saving the flashcard", error);
    }
  };

  return (
    <div>
      <div className="flex sm:flex-row flex-col items-center justify-center sm:w-[calc(100vw-90px)] px-8">
        {flashcard || error ? (
          <>
            <div className="sm:mt-8 max-w-4xl mx-auto sm:px-4">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              {flashcard && (
                <div className="rounded-lg shadow sm:p-6">
                  <h2 className="text-xl sm:text-3xl font-[500] text-center sm:mb-6 sm:mt-0 -mt-16 mb-3">
                    Save Your Flashcard
                  </h2>
                  <div className="flex flex-col">
                    {/* {flashcards} */}
                    <div className="w-[350px] sm:h-[500px] h-[420px]">

                    <FlipCard cardSelection={true} card={flashcard} i={0} />
                    </div>
                    <CardSelectionButton
                      saveCardLoading={loading}
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
