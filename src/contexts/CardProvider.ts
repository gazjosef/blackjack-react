// CardProvider.tsx
import { createContext, ReactNode, useContext } from "react";

type Card = {
  suit: "hearts" | "diamonds" | "clubs" | "spades";
  rank: string;
};

const suits = ["hearts", "diamonds", "clubs", "spades"] as const;
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

const CardContext = createContext<Card[] | null>(null);

// export const CardProvider = ({ children }: { children: ReactNode }) => {
//   const cards: Card[] = suits.flatMap((suit) =>
//     ranks.map((rank) => ({ suit, rank }))
//   );

//   return <CardContext.Provider value={cards}>{children}</CardContext.Provider>;
// };

export const useCards = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("useCards must be used within a CardProvider");
  }
  return context;
};
