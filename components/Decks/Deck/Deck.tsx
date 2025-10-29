import React from 'react'
import './deck.css'
export default function Deck() {
  return (
    <div className='bg-yellow-400/12 w-30 h-24 rounded-lg relative'>
        <div className='w-1/2 h-2/12 bg-[#facc15] absolute top-0 left-0 rounded-t-lg file-top z-[50]'>

        </div>
        <div className='w-full h-10/12 bg-[#facc15] absolute bottom-0 left-0 rounded-b-lg rounded-tr-lg z-[50]'>

        </div>
        <div>
          <div className='bg-gray-600/90 w-8 h-8 absolute top-1 right-3 z-[1]'></div>
          <div className='bg-gray-800/90 w-8 h-8 absolute top-1 right-5 z-[2]'></div>
          <div className='bg-gray-300/90 w-8 h-8 absolute top-1 right-7 z-[3]'></div>
          <div className='bg-gray-400/90 w-8 h-8 absolute top-1 right-9 z-[4]'></div>
        </div>
      </div>
  )
}
