import { createContext, useContext } from "react";

export interface Card {
  rank: string;
  suit: string;
  value: number;
}

const generateDeck = (): Card[] => {
  const suits = ["hearts", "diamonds", "clubs", "spades"];
  const ranks = [
    { rank: "A", value: 11 },
    { rank: "2", value: 2 },
    { rank: "3", value: 3 },
    { rank: "4", value: 4 },
    { rank: "5", value: 5 },
    { rank: "6", value: 6 },
    { rank: "7", value: 7 },
    { rank: "8", value: 8 },
    { rank: "9", value: 9 },
    { rank: "10", value: 10 },
    { rank: "J", value: 10 },
    { rank: "Q", value: 10 },
    { rank: "K", value: 10 },
  ];

  return suits.flatMap((suit) =>
    ranks.map((rank) => ({
      rank: rank.rank,
      suit,
      value: rank.value,
    }))
  );
};

const cardData = generateDeck();

const CardContext = createContext<Card[]>(cardData);

// Provider component
// export const CardProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   return (
//     <CardContext.Provider value={cardData}>{children}</CardContext.Provider>
//   );
// };

// Custom hook for consuming card data
export const useCardContext = (): Card[] => {
  return useContext(CardContext);
};

// Utility function to display all cards
export const displayDeck = (deck: Card[]): void => {
  deck.forEach((card) =>
    console.log(`${card.rank} of ${card.suit} (Value: ${card.value})`)
  );
};
