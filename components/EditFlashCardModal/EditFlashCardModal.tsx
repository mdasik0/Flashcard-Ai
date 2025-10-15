import { editModalObj, fetchedFlashcard, ReactSetState } from '@/types/flashcard';
import React from 'react'
import toast from 'react-hot-toast';

type EditFlashCardModalProps = {
    setEditModal: ReactSetState<editModalObj>,
    editModal: editModalObj,
    setFlashcards: ReactSetState<fetchedFlashcard[]>
}

export default function EditFlashCardModal({setEditModal, editModal, setFlashcards}: EditFlashCardModalProps) {
    const handleCardEdit = async (_id: string) => {
    console.log(`Edit card at index ${_id}`);
    if (!_id) {
      return console.log(
        "Flashcard is not available for change. missing field: _id"
      );
    }
    const updatedContent = {
      question: editModal.question || "",
      answer: editModal.answer || "",
    };
    try {
      const response = await fetch(
        `http://localhost:5000/api/flashcard/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedContent),
        }
      );
      const result = await response.json();
      console.log(result);
      if (result.success) {
        toast.success(result.message);
        setEditModal({ _id: "", question: "", answer: "", showModal: false });

        // FIX: Update the existing card instead of adding a new one
        setFlashcards((prevCards) =>
          prevCards.map((card: fetchedFlashcard) =>
            card._id === _id
              ? { ...card, ...updatedContent } // Spread updatedContent correctly
              : card
          )
        );
      }
    } catch (error) {
      // FIX: Proper error handling
      console.log(
        "There was an error updating the flashcard",
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  };
  return (
    <div className="absolute top-0 left-0 z-50 w-screen h-screen bg-black/10 backdrop-blur-md flex items-center justify-center">
          <div className="w-[350px] h-[380px] bg-[#0E0E0E] border-4 border-[#181818] rounded-xl p-4 flex flex-col justify-between items-start relative">
            <div className="w-full">
              <h1 className="text-2xl mb-3">Edit Card</h1>
              <div className="w-full flex flex-col h-full gap-4">
                <label
                  htmlFor="question"
                  className="flex flex-col items-start text-[#808080] gap-1 text-sm w-full"
                >
                  Question
                  <textarea
                    onChange={(e) =>
                      setEditModal({
                        ...editModal,
                        question: e.target.value,
                      })
                    }
                    defaultValue={editModal?.question}
                    className="bg-[#0A0A0A] w-full h-[64px] px-3 py-2 rounded-lg text-white resize-none overflow-hidden"
                    name="question"
                    placeholder="Enter your Question"
                    rows={3}
                  />
                </label>
                <label
                  htmlFor="answer"
                  className="flex flex-col items-start text-[#808080] gap-1 text-sm w-full flex-1"
                >
                  Answer
                  <textarea
                    onChange={(e) =>
                      setEditModal({ ...editModal, answer: e.target.value })
                    }
                    defaultValue={editModal?.answer}
                    className="bg-[#0A0A0A] w-full h-full px-3 py-2 rounded-lg text-white resize-none overflow-hidden"
                    name="answer"
                    placeholder="Enter your Answer"
                  />
                </label>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <button
                onClick={() => editModal._id && handleCardEdit(editModal._id)}
                className="px-4 py-1.5 bg-green-600 hover:bg-green-700 duration-500 cursor-pointer rounded-lg"
              >
                Submit
              </button>
              <button
                onClick={() =>
                  setEditModal({
                    _id: "",
                    question: "",
                    answer: "",
                    showModal: false,
                  })
                }
                className="px-4 py-1.5 bg-red-600 hover:bg-red-700 duration-500 cursor-pointer rounded-lg flex justify-center items-center gap-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
  )
}
