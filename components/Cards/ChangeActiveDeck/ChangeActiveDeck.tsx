import { Deck } from "@/types/deck";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoMdArrowDropdown } from "react-icons/io";


type ChangeActiveDeckDropdownProps = {
  setActiveDeck: React.Dispatch<React.SetStateAction<string | null>>;
  activeDeck: string | null;
  decks: Deck[]
};
const ChangeActiveDeck: React.FC<ChangeActiveDeckDropdownProps> = ({
  setActiveDeck,
  activeDeck,
  decks,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const deckDropRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleMouseClickEvent = (e: MouseEvent) => {
      if (
        deckDropRef.current &&
        !deckDropRef.current.contains(e?.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleMouseClickEvent);
    }

    return () => {
      document.removeEventListener("mousedown", handleMouseClickEvent);
    };
  }, [isOpen, setIsOpen]);
  const handleChangeDeck = async (deckId: string) => {
    // Early return if deck is already active
    if (activeDeck === deckId) {
      return toast.success("This deck is already active.");
    }

    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/set-active-deck/${deckId}`,
        {
          method: "PATCH",
        }
      );

      // Check if response is OK before parsing
      if (!result.ok) {
        const errorData = await result.json();
        return toast.error(
          errorData.message || "Failed to update the deck as active."
        );
      }

      const response = await result.json();

      if (response.success) {
        // Store as string (no need for JSON.stringify)
        localStorage.setItem("activeDeck", deckId);

        // Update state (assuming you have setActiveDeck)
        setActiveDeck(deckId);
        setIsOpen(false);
        return toast.success(response.message);
      } else {
        return toast.error(
          response.message || "Failed to update the deck as active. Try again!"
        );
      }
    } catch (error) {
      console.log("There was an error setting another deck active", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };
  return (
    <div className="absolute  bottom-25 sm:bottom-auto sm:top-8 left-8 sm:left-auto sm:right-10">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between relative px-4 py-2 bg-[#0E0E0E] rounded-lg duration-300 w-[170px] border-2 border-[#181818]"
      >
        Change Deck
        <IoMdArrowDropdown
          className={`-mr-1 duration-500 ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </div>
      {isOpen && (
        <div
          ref={deckDropRef}
          className="flex items-start absolute z-50 top-auto bottom-14 sm:top-14 sm:left-0 gap-2 bg-[#0E0E0E] rounded-lg duration-300 w-[170px] border-2 border-[#292929] h-fit flex-col p-2"
        >
          {decks?.map((deck) => (
            <button
              onClick={() => handleChangeDeck(deck?._id)}
              key={deck?._id}
              className={`bg-[#181818] hover:bg-[#1F1F1F] ${
                activeDeck === deck._id ? "text-green-500" : "text-white"
              } duration-500 w-full px-4 py-2 rounded cursor-pointer`}
            >
              {deck?.deckName}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChangeActiveDeck;