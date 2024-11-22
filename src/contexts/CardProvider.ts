// src/contexts/CardProvider.tsx
import { createContext, ReactNode, useContext } from "react";

// Define the card type
export type Card = {
  suit: string; // e.g., "Hearts", "Diamonds", etc.
  rank: string; // e.g., "A", "2", ..., "K"
};

// Card context type
type CardContextType = {
  cardTypes: Card[];
};

// Create the Card context
const CardContext = createContext<CardContextType | undefined>(undefined);

// CardProvider component
export const CardProvider = ({ children }: { children: ReactNode }) => {
  // Define the 52 standard playing cards
  const cardTypes: Card[] = [];
  const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
  const ranks = [
    "A",
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
  ];

  // Generate the deck
  suits.forEach((suit) => {
    ranks.forEach((rank) => {
      cardTypes.push({ suit, rank });
    });
  });

  return (
    <CardContext.Provider value={{ cardTypes }}>
      {children}
    </CardContext.Provider>
  );
};

// Custom hook to consume the context
export const useCard = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("useCard must be used within a CardProvider");
  }
  return context;
};
