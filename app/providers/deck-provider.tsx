// app/providers/deck-provider.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getDecksByUserId } from "@/lib/api-calls/deck";
import { Deck } from "@/types/deck";

type DeckContextType = {
  decks: Deck[];
  setDecks: React.Dispatch<React.SetStateAction<Deck[]>>;
  loading: boolean;
  refreshDecks: () => Promise<void>;
} | null;

const DeckContext = createContext<DeckContextType>(null);

export function DeckProvider({ children }: { children: React.ReactNode }) {
  const {data: session} = useSession();
  const [decks, setDecks] = useState<Deck[] | []>([])
  const [loading, setLoading] = useState(true)

  const fetchDecks = async () => {
    if(!session?.user?.id) {
      setDecks([])
      setLoading(false)
      return;
    }

    try {
      setLoading(true)
      const response = await getDecksByUserId(session?.user?.id)
      if(response?.success){
        setDecks(response?.data)
      }
    } catch (error) {
      console.error("Failed to fetch decks:", error);
      setDecks([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDecks();
  }, [session?.user?.id]);
  return (
   <DeckContext.Provider value={{ decks, loading, refreshDecks: fetchDecks, setDecks }}>
      {children}
    </DeckContext.Provider>
  );
}

export function useDecks() {
  const context = useContext(DeckContext);
  if (!context) {
    throw new Error("useDecks must be used within DeckProvider");
  }
  return context;
}