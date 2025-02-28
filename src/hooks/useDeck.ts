import { useState } from "react";

// Define a type for a playing card
export interface Card {
  suit: "spade" | "heart" | "diamond" | "club";
  value: string;
}

// Define suits and values
const suits: Card["suit"][] = ["spade", "heart", "diamond", "club"];
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

// Function to generate and shuffle a deck
export const generateDeck = (): Card[] => {
  const deck = suits.flatMap((suit) =>
    values.map((value) => ({ suit, value }))
  );
  return shuffleDeck(deck);
};

// Shuffle function using Fisher-Yates algorithm
const shuffleDeck = (deck: Card[]): Card[] => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

// Function to draw a card from a deck
export const drawCard = (
  deck: Card[]
): { card: Card | null; remainingDeck: Card[] } => {
  if (deck.length === 0) return { card: null, remainingDeck: [] };
  return { card: deck[0], remainingDeck: deck.slice(1) };
};

// Custom hook to manage deck state
export function useDeck() {
  const [deck, setDeck] = useState<Card[]>(generateDeck());

  // Draw a card and update the deck state
  const draw = () => {
    const { card, remainingDeck } = drawCard(deck);
    setDeck(remainingDeck);
    return card;
  };

  // Reset and shuffle deck
  const resetDeck = () => setDeck(generateDeck());

  return { deck, draw, resetDeck };
}
