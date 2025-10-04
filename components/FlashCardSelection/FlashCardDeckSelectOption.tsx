import { roboto } from '@/lib/fonts';
import { Deck } from '@/types/deck';
import React, { useEffect, useRef } from 'react'
import { FaCaretDown, FaPlus, FaRegCheckCircle, FaRegCircle } from 'react-icons/fa';

type FlashCardDeckSelectOptionProps = {
  decks: Deck[],
  selectedDeck: {deckName:string, deckId: string},
  setSelectedDeck: React.Dispatch<React.SetStateAction<{deckName:string, deckId:string}>>,
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function FlashCardDeckSelectOption({decks,selectedDeck, setSelectedDeck, setModalOpen}:FlashCardDeckSelectOptionProps) {
  const [open, setOpen] = React.useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setOpen(false);
        }
      };
      if (open) {
        document.addEventListener("mousedown", handleClickOutside);
      }
  
      // Cleanup
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [open]);

  return (
    <div ref={dropdownRef} className={`relative ${roboto.className}`}>
          {/* select deck button */}
          <button
            onClick={() => setOpen(!open)}
            className={`flex items-center relative text-green-500 font-[500] tracking-wider gap-1 font- ps-3 pe-7 py-2 bg-[#181818] hover:bg-[#272727] duration-300 cursor-pointer active:scale-95 rounded`}
          >
            {selectedDeck.deckId ? (
              <FaRegCheckCircle className="text-lg" />
            ) : (
              <FaRegCircle className="text-lg" />
            )}
            Deck
            <FaCaretDown
              className={`absolute top-1/2 right-2 -translate-y-1/2 text-sm duration-300 ${
                open ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
          {/* deck dropdown */}
          {open && (
            <div className="absolute text-center bottom-12 left-0 w-[160px] h-fit rounded-lg p-1.5  bg-[#0E0E0E] border border-[#181818] text-white flex flex-col gap-1.5 items-center">
              {decks?.map((deck) => {
                return (
                  <button
                    key={deck._id}
                    onClick={() =>
                      setSelectedDeck({
                        ...selectedDeck,
                        deckName: deck.deckName,
                        deckId: deck._id,
                      })
                    }
                    className={`bg-[#181818] hover:bg-[#1d1d1d] ${
                      selectedDeck.deckId === deck._id
                        ? "text-green-400"
                        : "text-white"
                    } duration-300 active:scale-95 cursor-pointer text-sm font-medium w-full py-1.5 px-3 rounded flex items-center justify-center gap-2 text-nowrap`}
                  >
                    {deck.deckName.length > 15
                      ? deck.deckName.slice(0, 15) + "..."
                      : deck.deckName}
                  </button>
                );
              })}
              {/* create new deck button which opens new modal */}
              <button
                onClick={() => setModalOpen(true)}
                className=" bg-[#181818] hover:bg-[#1d1d1d] duration-300 active:scale-95 cursor-pointer text-sm font-medium w-full py-1.5 px-3 rounded flex items-center justify-center gap-2 text-nowrap"
              >
                Create New Deck <FaPlus />
              </button>
            </div>
          )}
        </div>
  )
}
