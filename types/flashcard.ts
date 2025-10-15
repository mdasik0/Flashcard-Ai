export type generatedFlashcard = {
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

export type editModalObj = {
  _id: string | undefined;
  question: string | undefined;
  answer: string | undefined;
  showModal: boolean;
};

export type ReactSetState<STATE> = React.Dispatch<React.SetStateAction<STATE>>;


export interface GenerateInputProps {
  setFlashcards: React.Dispatch<React.SetStateAction<generatedFlashcard | null>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}