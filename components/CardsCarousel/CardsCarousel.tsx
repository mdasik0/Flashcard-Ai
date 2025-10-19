"use client";
import React, { useEffect, useRef, useState } from "react";
import "./cardCarousel.css";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import Link from "next/link";
import { RiRobot2Line } from "react-icons/ri";
import { fetchedFlashcard } from "@/types/flashcard";
import FlashCard from "../FlashCard/FlashCard";
import EditFlashCardModal from "../EditFlashCardModal/EditFlashCardModal";
import { IoMdArrowDropdown } from "react-icons/io";
import toast from "react-hot-toast";
import { useDecks } from "@/app/providers/deck-provider";
export default function CardsCarousel() {
  // const fakes = [
  //   {
  //     _id: "68e0f1bad8676a85b3665cfd",
  //     question: "what is bind in js?",
  //     answer:
  //       'In JavaScript, "bind" is a method that creates a new function with a specified "this" value.',
  //     deckId: "68e0bb36d8676a85b3665ceb",
  //     deckName: "asik gadha",
  //     userId: "101343459899203208475",
  //     createdAt: "2025-10-04T10:06:50.463Z",
  //     updatedAt: "2025-10-04T10:06:50.463Z",
  //   },
  //   {
  //     _id: "68e138d3d8676a85b3665d08",
  //     question: "what is an event loop?",
  //     answer:
  //       "An event loop is a programming construct that waits for and dispatches events or messages in a program.",
  //     deckId: "68e0bb36d8676a85b3665ceb",
  //     deckName: "asik gadha",
  //     userId: "101343459899203208475",
  //     createdAt: "2025-10-04T15:10:11.462Z",
  //     updatedAt: "2025-10-04T15:10:11.462Z",
  //   },
  //   {
  //     _id: "68e14517d8676a85b3665d0e",
  //     question: "what is a State in React?",
  //     answer:
  //       "A state in React is a data structure that holds information about a component's current state.",
  //     deckId: "68e0bb36d8676a85b3665ceb",
  //     deckName: "asik gadha",
  //     userId: "101343459899203208475",
  //     createdAt: "2025-10-04T16:02:31.571Z",
  //     updatedAt: "2025-10-04T16:02:31.571Z",
  //   },
  //   {
  //     _id: "68e25924ae6e7c6973ae7016",
  //     question: "what is ES6?",
  //     answer:
  //       "ES6 is the sixth major version of JavaScript, introducing features like classes, arrow functions, and modules.",
  //     deckId: "68e0bb36d8676a85b3665ceb",
  //     deckName: "asik gadha",
  //     userId: "101343459899203208475",
  //     createdAt: "2025-10-05T11:40:20.063Z",
  //     updatedAt: "2025-10-05T11:40:20.063Z",
  //   },
  // ];
  const [flashcards, setFlashcards] = useState<fetchedFlashcard[]>([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const {activeDeckName} = useDecks()
  const [activeDeck, setActiveDeck] = useState(
    localStorage.getItem("activeDeck")
  );
  const [editModal, setEditModal] = useState<{
    _id: string | undefined;
    question: string | undefined;
    answer: string | undefined;
    showModal: boolean;
  }>({
    _id: "",
    question: "",
    answer: "",
    showModal: false,
  });

  const goNext = () => {
    const nextDemoElement =
      document.querySelector(".nextDemoElement")?.classList;
    if (nextDemoElement && nextDemoElement.contains("flying-card-next")) {
      return nextDemoElement?.remove("flying-card-next");
    } else {
      nextDemoElement?.add("flying-card-next");
    }
    setTimeout(() => {
      setCarouselIndex((prev) =>
        prev >= flashcards?.length - 1 ? 0 : prev + 1
      );
    }, 500);
    setTimeout(() => {
      nextDemoElement?.add("transition-opacity");
    }, 600);
    setTimeout(() => {
      nextDemoElement?.remove("flying-card-next");
      nextDemoElement?.remove("transition-opacity");
    }, 800);
  };
  const goPrevious = () => {
    const prevDemoElement =
      document.querySelector(".prevDemoElement")?.classList;
    if (prevDemoElement && prevDemoElement.contains("flying-card-previous")) {
      return prevDemoElement?.remove("flying-card-previous");
    } else {
      prevDemoElement?.add("flying-card-previous");
    }
    setTimeout(() => {
      setCarouselIndex((prev) =>
        prev <= 0 ? flashcards?.length - 1 : prev - 1
      );
    }, 500);
    setTimeout(() => {
      prevDemoElement?.add("transition-opacity");
    }, 600);
    setTimeout(() => {
      prevDemoElement?.remove("flying-card-previous");
      prevDemoElement?.remove("transition-opacity");
    }, 800);
  };

  useEffect(() => {
    const fetchFlashcardData = async () => {
      try {
        if (!activeDeck) {
          return console.log("there is no deck id to fetch the data with");
        }
        const response = await fetch(
          `http://localhost:5000/api/flashcards/${activeDeck}`
        );
        const result = await response.json();

        setFlashcards(result?.data ? result?.data : []);
      } catch (error) {
        console.log("there was an error fetching cards data", error);
      }
    };

    fetchFlashcardData();
  }, [activeDeck]);

  return (
    <div className="h-screen w-full sm:w-[calc(100vw-90px)] flex items-center justify-center relative">
      {flashcards?.length <= 0 ? (
        <div>
          <h1 className="text-4xl mb-2">No Flashcard available</h1>
          <p className="text-gray-600 text-center duration-300 flex items-center gap-2">
            <span className="flex items-center gap-2 group">
              <Link
                className="hover:underline hover:text-blue-500 duration-300 cursor-pointer"
                href={"/"}
              >
                Generate Flashcard
              </Link>{" "}
              with <RiRobot2Line className="group-hover:text-blue-500" />
            </span>{" "}
            or{" "}
            <span className="hover:text-green-500 border-dashed hover:border-b hover:border-green-500 duration-300 cursor-pointer">
              Add Manually
            </span>
          </p>
        </div>
      ) : (
        <div className="carousel-container h-screen w-[500px] relative">
          <div className="carousel-cards-ui relative flex items-center justify-center h-full sm:mt-0 -mt-10">
            <div className="absolute z-0 w-[300px] sm:w-[330px] h-[420px] sm:h-[480px] bg-[#1f1f1f] rounded-xl rotate-6"></div>
            <div className="absolute z-10 w-[300px] sm:w-[330px] h-[420px] sm:h-[480px] bg-[#1f1f1f]  rounded-xl -rotate-3 -translate-x-1.5 translate-y-2"></div>
            <div className="absolute w-[300px] sm:w-[330px] h-[420px] sm:h-[480px] rotate-3 bg-[#181818] rounded-xl prevDemoElement"></div>
            <div className="w-[300px] sm:w-[330px] h-[420px] sm:h-[480px] rounded-xl absolute z-30">
              <FlashCard
                i={carouselIndex}
                cardSelection={false}
                setEditModal={setEditModal}
                fetchedFlashcard={flashcards?.[carouselIndex] ?? null}
              />
            </div>
            <div className="nextDemoElement"></div>
          </div>
          {flashcards?.length <= 1 ? (
            ""
          ) : (
            <div className="flex items-center justify-end sm:justify-between w-full absolute sm:bottom-1/2 sm:translate-y-1/2 bottom-20 gap-10 sm:gap-0 pb-4 sm:pb-0 px-4 sm:px-0">
              <button
                title="previous"
                className="bg-[#0E0E0E] text-xl p-3 rounded-full hover:bg-[#181818] duration-300 cursor-pointer"
                onClick={goPrevious}
              >
                <GrFormPrevious />
              </button>
              <button
                title="next"
                className="bg-[#0E0E0E] text-xl p-3 rounded-full hover:bg-[#181818] duration-300 cursor-pointer"
                onClick={goNext}
              >
                <MdNavigateNext />
              </button>
            </div>
          )}
        </div>
      )}
      {editModal?.showModal && (
        <EditFlashCardModal
          setEditModal={setEditModal}
          editModal={editModal}
          setFlashcards={setFlashcards}
        />
      )}
        <div className="absolute sm:right-[16%] text-lg sm:top-[38px] top-4 text-green-500">
          {activeDeckName}
        </div>
        <ChangeActiveDeckDropdown
          setActiveDeck={setActiveDeck}
          activeDeck={activeDeck}
        />
      </div>
  );
}

type ChangeActiveDeckDropdownProps = {
  setActiveDeck: React.Dispatch<React.SetStateAction<string | null>>;
  activeDeck: string | null;
};

const ChangeActiveDeckDropdown: React.FC<ChangeActiveDeckDropdownProps> = ({
  setActiveDeck,
  activeDeck,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const deckDropRef = useRef<HTMLDivElement>(null);
  const {decks} = useDecks()
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
