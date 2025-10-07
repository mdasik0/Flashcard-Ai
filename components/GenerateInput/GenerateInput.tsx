"use client";
import { fetchedFlashcard, Flashcard, GenerateInputProps } from "@/types/flashcard";
import { useSession } from "next-auth/react";
import React from "react";
import toast from "react-hot-toast";

export default function GenerateInput({
  setFlashcards,
  setError,
}: GenerateInputProps) {
  //handle input states
  const [prompt, setPrompt] = React.useState("");
  const [inputH, setInputH] = React.useState(110);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  // input focus and loading states
  const [isFocused, setIsFocused] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  //check user session
  const {status} = useSession();

const generateCards = async () => {
  // checks for empty prompt
  if (!prompt.trim()) {
    setError("Please enter a prompt");
    return;
  }
  // check for unauthenticated user / user not logged in
  if (status === "unauthenticated") {
    setError("Please Login First");
    return;
  }
  // reset states
  setIsLoading(true);
  setError(null);
  setFlashcards(null);

  try {
    // Create the fetch promise (don't await yet)
    const fetchPromise = fetch("http://localhost:5000/api/ai/generate-flashcard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: prompt,
      }),
    }).then(async (response) => {
      // Parse JSON first
      const data = await response.json();
      
      // Check if response is not ok
      console.log(data)
      if (data?.response?.answer === ' ') {
        return toast.error(`Ai has failed to answer your Question.
          Please try again.`)
      }
      
      return data;
    });

    // Pass the promise to toast.promise and await the result
    const data = await toast.promise(fetchPromise, {
      loading: 'Generating flashcards...',
      success: 'Flashcards generated successfully!',
      error: (err) => err.message || 'Error generating flashcards',
    });

    // set flashcards state with the generated flashcards
    console.log(data);
    setFlashcards(data?.response);
    localStorage.setItem('lastGeneratedFlashcard', JSON.stringify(data?.response));
  } catch (err) {
    setError(err instanceof Error ? err.message : "An error occurred");
  } finally {
    setIsLoading(false);
  }
};

  // handle enter to submit instead of generate button
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault();
      generateCards();
    }
  };

  // auto resize textarea
  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
      setInputH(textareaRef.current.scrollHeight + 54);
    }
  }, [prompt]);
  return (
    <div className="block input-container relative">
      <textarea
        ref={textareaRef}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        className="bg-[#0e0e0e] w-[312px] sm:w-[500px] min-h-[24px] max-h-[200px] resize-none overflow-hidden rounded-xl p-4 absolute left-[6px] top-[6px] focus:outline-0 text-white z-10"
        placeholder="Enter a topic to generate flashcards..."
        rows={1}
        style={{ lineHeight: "1.5" }}
        disabled={isLoading}
      />
      <div
        className="animated-container bg-[#302f2f] w-[324px] sm:w-[512px] max-h-[254px] rounded-2xl px-2 flex flex-col items-start justify-end transition-all duration-300"
        style={{
          height: isFocused || prompt ? `${inputH}px` : "68px",
          opacity: isFocused || prompt ? 1 : 0.4,
        }}
      >
        <button
          onClick={generateCards}
          disabled={isLoading || !prompt.trim()}
          className="bg-stone-950 mb-2 px-4 py-1 rounded-xl text-white hover:bg-stone-900 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer transition-colors"
        >
          {isLoading ? "Generating..." : "Generate"}
        </button>
      </div>
    </div>
  );
}
