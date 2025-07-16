export type Flashcard = {
    question: string;
    answer: string;
}

export interface GenerateInputProps {
  setFlashcards: React.Dispatch<React.SetStateAction<Flashcard[] | null>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}