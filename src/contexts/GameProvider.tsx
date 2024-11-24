// src/contexts/GameProvider.tsx
import React, { createContext, useContext, useState } from "react";
import { useDeck } from "./DeckProvider";

type Card = { suit: string; value: string };

interface GameContextProps {
  playerHand: Card[];
  dealerHand: Card[];
  deal: () => void;
  hit: () => void;
  stand: () => void;
  double: () => void;
  gameStatus: string;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    deck,
    shuffleDeck,
    // resetDeck
  } = useDeck();
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [gameStatus, setGameStatus] = useState<string>("Waiting to start");

  // Helper to draw a card from the deck
  const drawCard = (): Card | null => {
    if (deck.length === 0) {
      shuffleDeck();
    }
    return deck.pop() || null;
  };

  const deal = () => {
    if (deck.length < 4) shuffleDeck();

    const newPlayerHand = [drawCard()!, drawCard()!];
    const newDealerHand = [drawCard()!, drawCard()!];

    setPlayerHand(newPlayerHand);
    setDealerHand(newDealerHand);
    setGameStatus("In Progress");
  };

  const hit = () => {
    if (gameStatus !== "In Progress") return;
    const newCard = drawCard();
    if (newCard) {
      setPlayerHand((prev) => [...prev, newCard]);
    }
  };

  const stand = () => {
    if (gameStatus !== "In Progress") return;
    setGameStatus("Stand");
    // Dealer logic can go here
  };

  const double = () => {
    if (gameStatus !== "In Progress") return;
    const newCard = drawCard();
    if (newCard) {
      setPlayerHand((prev) => [...prev, newCard]);
    }
    setGameStatus("Double");
  };

  return (
    <GameContext.Provider
      value={{
        playerHand,
        dealerHand,
        deal,
        hit,
        stand,
        double,
        gameStatus,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
