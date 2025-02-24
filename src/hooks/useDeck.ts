import { useState } from "react";

// Define a type for a playing card
// export interface Card {
//   suit: string;
//   value: string;
// }
export interface Card {
  suit: "spade" | "heart" | "diamond" | "club";
  value: string;
}

// Define suits and values
// const suits = ["♠", "♥", "♦", "♣"];
const suits: ("spade" | "heart" | "diamond" | "club")[] = [
  "spade",
  "heart",
  "diamond",
  "club",
];
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

// Function to generate a full deck
const generateDeck = (): Card[] => {
  return suits.flatMap((suit) => values.map((value) => ({ suit, value })));
};

// Custom hook to manage the deck
export function useDeck() {
  const [deck, setDeck] = useState<Card[]>(generateDeck());
  const [drawnCard, setDrawnCard] = useState<Card | null>(null);

  // Shuffle function using Fisher-Yates algorithm
  const shuffleDeck = () => {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setDeck(shuffled);
    setDrawnCard(null);
  };

  // Draw a card from the deck
  const drawCard = () => {
    if (deck.length === 0) return null;
    const [card, ...remainingDeck] = deck;
    setDeck(remainingDeck);
    setDrawnCard(card);
    return card;
  };

  return { deck, drawnCard, shuffleDeck, drawCard };
}
