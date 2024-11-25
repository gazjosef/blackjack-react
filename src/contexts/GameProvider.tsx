import React, { createContext, useContext, useState, ReactNode } from "react";
import { useDeck } from "./DeckProvider";

interface Card {
  suit: string;
  value: string;
}

interface GameContextValue {
  dealerHand: Card[];
  playerHand: Card[];
  deal: () => void;
  hit: () => void;
  stand: () => void;
  double: () => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextValue | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { drawCard, shuffleDeck } = useDeck();
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);

  const deal = () => {
    shuffleDeck();
    setDealerHand([drawCard()!, drawCard()!]);
    setPlayerHand([drawCard()!, drawCard()!]);
  };

  const hit = () => {
    setPlayerHand((prev) => [...prev, drawCard()!]);
  };

  const stand = () => {
    // Dealer's logic
    while (getHandValue(dealerHand) < 17) {
      setDealerHand((prev) => [...prev, drawCard()!]);
    }
    // Evaluate winner logic here (could be added later)
  };

  const double = () => {
    setPlayerHand((prev) => [...prev, drawCard()!]);
    stand(); // End player's turn after doubling
  };

  const resetGame = () => {
    setDealerHand([]);
    setPlayerHand([]);
  };

  const getHandValue = (hand: Card[]): number => {
    let total = 0;
    let aces = 0;

    hand.forEach((card) => {
      if (card.value === "A") {
        aces += 1;
        total += 11;
      } else if (["J", "Q", "K"].includes(card.value)) {
        total += 10;
      } else {
        total += parseInt(card.value, 10);
      }
    });

    // Adjust for aces if total exceeds 21
    while (total > 21 && aces > 0) {
      total -= 10;
      aces -= 1;
    }

    return total;
  };

  return (
    <GameContext.Provider
      value={{ dealerHand, playerHand, deal, hit, stand, double, resetGame }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextValue => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
