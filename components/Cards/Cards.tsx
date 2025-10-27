"use client";
import CardsCarousel from "../CardsCarousel/CardsCarousel";
import { useDecks } from "@/app/providers/deck-provider";
import ChangeActiveDeck from "./ChangeActiveDeck/ChangeActiveDeck";
import ActiveDeckName from "./ActiveDeckName/ActiveDeckName";
import { useState } from "react";

export default function Cards() {
  const { decks } = useDecks();

  //decks : that's fetched
  //activeDeckLocal : that's stored in localstorage
  //activeDeck : that's in state to trigger re-rendering
  //setActiveDeck : to update activeDeck state
  //activeDeckIndicator : to check which deck is active
 
  const [activeDeck, setActiveDeck] = useState<string | null>(localStorage.getItem("activeDeck"));
     const activeDeckIndicator =
    decks.find((deck) => deck._id === localStorage.getItem("activeDeck"))
      ?._id || null;
//   console.log('activeDeck,Id - state ? ',activeDeck)
const activeDeckName = decks.find((deck) => deck._id === activeDeck)?.deckName || "No Active Deck";
  return (
    <>
      <CardsCarousel activeDeck={activeDeck} />
      <ChangeActiveDeck activeDeckIndicator={activeDeckIndicator} activeDeck={activeDeck} setActiveDeck={setActiveDeck} decks={decks} />
      <ActiveDeckName activeDeckName={activeDeckName}/>
    </>
  );
}
