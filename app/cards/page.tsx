"use client";
import FlashCard from "@/components/FlashCard/FlashCard";
import ProtectedRoute from "@/components/UtilityComp/ProtectedRoute";

export default function cardsPage() {
  return (
    <ProtectedRoute>
      <div className="h-screen w-full sm:w-[calc(100vw-90px)] flex items-center justify-center">
        <div className="carousel-container h-screen w-[500px] bg-amber-50/15">
          <div className="carousel-cards-ui relative flex items-center justify-center h-full">
            <div className="absolute w-[330px] h-[480px] bg-gray-600 rounded-xl rotate-6"> </div>
            <div className="absolute w-[330px] h-[480px] bg-gray-500  rounded-xl -rotate-3 -translate-x-1.5 translate-y-2"> </div>
            <div className="absolute w-[330px] h-[480px] bg-gray-400 rounded-xl rotate-3"> </div>
            <div className="w-[330px] h-[480px] rounded-xl absolute bg-white"><FlashCard card={{question: 'what is this?', answer: 'this is kachamorcih'}} i={1} cardSelection={false}  /></div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
