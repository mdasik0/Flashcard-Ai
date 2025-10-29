import Deck from '@/components/Decks/Deck/Deck'
import React from 'react'

export default function decksPage() {
  return (
    <div className='w-screen h-screen grid grid-cols-10 gap-10 p-20'>
      <Deck />
    </div>
  )
}
