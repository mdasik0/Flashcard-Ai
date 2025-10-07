import { roboto } from '@/lib/fonts'
import { Flashcard } from '@/types/flashcard';
import React from 'react'
import toast from 'react-hot-toast';
import { MdOutlineCancel } from 'react-icons/md'

export default function FlashCardCancelButton({setFlashcards}: {setFlashcards:React.Dispatch<React.SetStateAction<Flashcard | null>>}) {
   const handleCancelSave = () => {
    setFlashcards(null);
    localStorage.removeItem("lastGeneratedFlashcard");
    toast.error('Save FlashCard Canceled!',{
      className:'bg-red-800'
    })
  };

  return (
    <button
          onClick={handleCancelSave}
          className={`flex items-center ${roboto.className} text-red-500 font-[500] tracking-wider gap-1 font- px-5 py-2 bg-[#181818] hover:bg-[#272727] duration-300 cursor-pointer active:scale-95 rounded`}
        >
          <MdOutlineCancel />
          cancel
        </button>
  )
}
