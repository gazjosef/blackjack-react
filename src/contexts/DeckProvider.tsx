import React, { createContext, useContext, useState, ReactNode } from "react";

interface Card {
  suit: string;
  value: string;
}

interface DeckContextValue {
  deck: Card[];
  shuffleDeck: () => void;
  drawCard: () => Card | null;
}

const DeckContext = createContext<DeckContextValue | undefined>(undefined);

const suits = ["♠", "♥", "♦", "♣"];
const values = [
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

const generateDeck = (): Card[] => {
  return suits.flatMap((suit) => values.map((value) => ({ suit, value })));
};

export const DeckProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [deck, setDeck] = useState<Card[]>(generateDeck());

  const shuffleDeck = () => {
    const shuffledDeck = [...deck];
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
    setDeck(shuffledDeck);
  };

  const drawCard = (): Card | null => {
    if (deck.length === 0) return null;
    const [card, ...rest] = deck;
    setDeck(rest);
    return card;
  };

  return (
    <DeckContext.Provider value={{ deck, shuffleDeck, drawCard }}>
      {children}
    </DeckContext.Provider>
  );
};

export const useDeck = (): DeckContextValue => {
  const context = useContext(DeckContext);
  if (!context) {
    throw new Error("useDeck must be used within a DeckProvider");
  }
  return context;
};
