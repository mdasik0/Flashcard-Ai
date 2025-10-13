import { roboto } from "@/lib/fonts";
import { Deck, PostDeckApiRes } from "@/types/deck";
import React from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

type CreateNewDeckModalProps = {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDecks: React.Dispatch<React.SetStateAction<Deck[]>>;
  decks: Deck[];
  data: { user: { id: string } } | null;
};

export default function CreateNewDeckModal({
  modalOpen,
  setModalOpen,
  setDecks,
  decks,
  data,
}: CreateNewDeckModalProps) {
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState({
    createDeck: false,
  });

  const handleCreateNewDeck = async () => {
    const deckData = {
      deckName: input,
      creatorId: data?.user?.id,
      privacy: false,
    };
    setLoading({ ...loading, createDeck: true });
    try {
      const response = await fetch("http://localhost:5000/api/deck", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deckData),
      });
      const result: PostDeckApiRes<Deck> = await response.json();
      if(result?.data?.active) {
        // if active store deckId
        localStorage.setItem('activeDeck', JSON.stringify(result?.data?._id))
      }
      // else do the thing
      if(result?.data) {
        toast.success('New Deck Created')
      }
      setLoading({ ...loading, createDeck: false });
      setInput("");
      setDecks([...decks, result?.data]);
      setModalOpen(false);
    } catch (error) {
      setLoading({ ...loading, createDeck: false });
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      console.error("Error:", errorMessage);
    }
  };
  return (
    <>
      {modalOpen && (
        <div className="w-screen h-screen absolute top-0 left-0 bg-black/30 backdrop-blur-lg flex items-center justify-center">
          <div className="w-[300px] h-[300px] rounded-xl p-4 bg-[#111111] border-4 border-[#181818] flex flex-col items-start justify-between gap-3 relative">
            <div className="w-full">
              <h2
                className={`text-xl ${roboto.className} font-semibold text-nowrap mb-3`}
              >
                Create New Deck
              </h2>
              <label
                htmlFor="deckName"
                className="text-xs mb-1 text-stone-500 text-start block w-full"
              >
                Deck Name
              </label>
              <input
                name="deckName"
                onChange={(e) => setInput(e.target.value)}
                required
                className="w-full px-3 py-1.5 rounded border border-[#181818] bg-[#0E0E0E]"
                maxLength={20}
                placeholder="Enter a Deck Name"
              />
              <span className="text-xs mt-1 text-stone-700 text-end block w-full">
                20 character limit
              </span>
            </div>
            <button
              onClick={handleCreateNewDeck}
              className="flex gap-1 items-center px-5 py-2 rounded shadow shadow-black/20 bg-[#181818] hover:bg-[#272727] duration-300 cursor-pointer active:scale-95"
            >
              {loading.createDeck ? (
                <>Creating...</>
              ) : (
                <>
                  Create Deck
                  <FaPlus />
                </>
              )}
            </button>
            <div
              onClick={() => setModalOpen(false)}
              className="absolute -top-3 -right-3 p-1 rounded-full bg-red-500 active:scale-95 hover:bg-red-400 duration-300 cursor-pointer"
            >
              <IoMdClose />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
