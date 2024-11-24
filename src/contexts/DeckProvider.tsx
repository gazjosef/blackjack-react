// src/contexts/DeckProvider.tsx
import React, { createContext, useContext, useState } from "react";

// Define a simple card type
type Card = {
  rank: string;
  suit: string;
};

// Define the context type
interface DeckContextType {
  deck: Card[];
  resetDeck: () => void;
  shuffleDeck: () => void;
}

// Create the context with a default empty value
const DeckContext = createContext<DeckContextType | undefined>(undefined);

// Card suits and ranks
const suits = ["hearts", "diamonds", "clubs", "spades"];
const ranks = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

// Create a helper function to generate a deck of cards
const generateDeck = (): Card[] => {
  const deck: Card[] = [];
  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push({ rank, suit });
    }
  }
  return deck;
};

// Define DeckProvider props
interface DeckProviderProps {
  children: React.ReactNode;
}

// Create the DeckProvider component
export const DeckProvider: React.FC<DeckProviderProps> = ({ children }) => {
  const [deck, setDeck] = useState<Card[]>(generateDeck());

  // Shuffle deck function
  const shuffleDeck = () => {
    const shuffledDeck = [...deck];
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
    setDeck(shuffledDeck);
  };

  // Reset deck function
  const resetDeck = () => {
    setDeck(generateDeck());
  };

  return (
    <DeckContext.Provider value={{ deck, shuffleDeck, resetDeck }}>
      {children}
    </DeckContext.Provider>
  );
};

// Custom hook to use the DeckContext
export const useDeck = (): DeckContextType => {
  const context = useContext(DeckContext);
  if (!context) {
    throw new Error("useDeck must be used within a DeckProvider");
  }
  return context;
};
