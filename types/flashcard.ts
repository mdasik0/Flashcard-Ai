export type Flashcard = {
  question: string;
  answer: string;
}
  
  export type fetchedFlashcard = {
  _id: string;
  question: string;
  answer: string;
  deckId: string;
  deckName: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export type PostFleshCardApiRes = {
  success: string;
  message: string;
}

export interface GenerateInputProps {
  setFlashcards: React.Dispatch<React.SetStateAction<Flashcard | null>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}