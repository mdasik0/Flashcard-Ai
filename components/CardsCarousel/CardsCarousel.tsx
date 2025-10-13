"use client";
import React, { useEffect, useState } from "react";
import FlashCard from "@/components/FlashCard/FlashCard";
import "./cardCarousel.css";
export default function CardsCarousel() {
  const fakes = [
    {
      _id: "68e0f1bad8676a85b3665cfd",
      question: "what is bind in js?",
      answer:
        'In JavaScript, "bind" is a method that creates a new function with a specified "this" value.',
      deckId: "68e0bb36d8676a85b3665ceb",
      deckName: "asik gadha",
      userId: "101343459899203208475",
      createdAt: "2025-10-04T10:06:50.463Z",
      updatedAt: "2025-10-04T10:06:50.463Z",
    },
    {
      _id: "68e138d3d8676a85b3665d08",
      question: "what is an event loop?",
      answer:
        "An event loop is a programming construct that waits for and dispatches events or messages in a program.",
      deckId: "68e0bb36d8676a85b3665ceb",
      deckName: "asik gadha",
      userId: "101343459899203208475",
      createdAt: "2025-10-04T15:10:11.462Z",
      updatedAt: "2025-10-04T15:10:11.462Z",
    },
    {
      _id: "68e14517d8676a85b3665d0e",
      question: "what is a State in React?",
      answer:
        "A state in React is a data structure that holds information about a component's current state.",
      deckId: "68e0bb36d8676a85b3665ceb",
      deckName: "asik gadha",
      userId: "101343459899203208475",
      createdAt: "2025-10-04T16:02:31.571Z",
      updatedAt: "2025-10-04T16:02:31.571Z",
    },
    {
      _id: "68e25924ae6e7c6973ae7016",
      question: "what is ES6?",
      answer:
        "ES6 is the sixth major version of JavaScript, introducing features like classes, arrow functions, and modules.",
      deckId: "68e0bb36d8676a85b3665ceb",
      deckName: "asik gadha",
      userId: "101343459899203208475",
      createdAt: "2025-10-05T11:40:20.063Z",
      updatedAt: "2025-10-05T11:40:20.063Z",
    },
  ];
  const [flashcards, setFlashcards] = useState(fakes);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const goNext = () => {
    const nextDemoElement =
      document.querySelector(".nextDemoElement")?.classList;
    if (nextDemoElement && nextDemoElement.contains("flying-card-next")) {
      return nextDemoElement?.remove("flying-card-next");
    } else {
      nextDemoElement?.add("flying-card-next");
    }
    setTimeout(() => {
      setCarouselIndex((prev) => (prev >= fakes.length - 1 ? 0 : prev + 1));
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
      setCarouselIndex((prev) => (prev <= 0 ? fakes.length - 1 : prev - 1));
    }, 500);
    setTimeout(() => {
      prevDemoElement?.add("transition-opacity");
    }, 600);
    setTimeout(() => {
      prevDemoElement?.remove("flying-card-previous");
      prevDemoElement?.remove("transition-opacity");
    }, 800);
  };

  const activeDeckId = JSON.parse(localStorage.getItem('activeDeck') as string)

  useEffect(()=>{
    const fetchFlashcardData = async() =>{
      try {
        if(!activeDeckId) {
          return console.log('there is no deck id to fetch the data with')
        }
        const response = await fetch(`http://localhost:5000/api/flashcards/${activeDeckId}`)
        const result = await response.json()
        
        setFlashcards(result?.data)
      } catch (error) {
        console.log('there was an error fetching cards data',error)
      }
    }

    fetchFlashcardData()
  },[activeDeckId])

  //TODO: FIX Carousel SPELLING  
  return (
    <div className="h-screen w-full sm:w-[calc(100vw-90px)] flex items-center justify-center">
      <div className="carousel-container h-screen w-[500px] relative">
        <div className="carousel-cards-ui relative flex items-center justify-center h-full">
          <div className="absolute z-0 w-[330px] h-[480px] bg-[#1f1f1f] rounded-xl rotate-6"></div>
          <div className="absolute z-10 w-[330px] h-[480px] bg-[#1f1f1f]  rounded-xl -rotate-3 -translate-x-1.5 translate-y-2"></div>
          <div className="absolute w-[330px] h-[480px] rotate-3 bg-[#181818] rounded-xl prevDemoElement"></div>
          <div className="w-[330px] h-[480px] rounded-xl absolute z-30">
            <FlashCard
              card={null}
              i={carouselIndex}
              cardSelection={false}
              fetchedCard={flashcards[carouselIndex]}
            />
          </div>
          <div className="nextDemoElement"></div>
        </div>
        <div className="flex items-center justify-between w-full absolute top-1/2 ">
          <button onClick={goPrevious}>prev</button>
          <button onClick={goNext}>next</button>
        </div>
      </div>
    </div>
  );
}
