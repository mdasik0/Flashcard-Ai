'use client'
import CardsCarousel from '../CardsCarousel/CardsCarousel'
import { useDecks } from '@/app/providers/deck-provider';
import ChangeActiveDeck from './ChangeActiveDeck/ChangeActiveDeck';

export default function Cards() {
  const {decks} = useDecks();

  return (
    <>
    <CardsCarousel />
    <ChangeActiveDeck decks={decks} />
    </>
  )
}
