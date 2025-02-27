import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { generateDeck, drawCard } from "../hooks/useDeck";

// Define card type
export interface Card {
  suit: "spade" | "heart" | "diamond" | "club";
  value: string;
}

// Define game state
interface GameState {
  deck: Card[];
  playerHand: Card[];
  dealerHand: Card[];
  playerScore: number;
  dealerScore: number;
  playerBalance: number;
  betAmount: number;
  gameStatus: "playing" | "player-won" | "dealer-won" | "tie";
}

// Define action types
type GameAction =
  | { type: "INITIALIZE_GAME" }
  | { type: "HIT" }
  | { type: "STAND" }
  | { type: "DEALER_PLAY" }
  | { type: "CHECK_WINNER" }
  | { type: "RESET_GAME" }
  | { type: "PLACE_BET"; amount: number };

// Initial state
const initialState: GameState = {
  deck: generateDeck(),
  playerHand: [],
  dealerHand: [],
  playerScore: 0,
  dealerScore: 0,
  playerBalance: 1000, // Starting money
  betAmount: 0,
  gameStatus: "playing",
};

// Reducer function
const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case "INITIALIZE_GAME": {
      const deck = generateDeck();
      const playerHand = [drawCard(deck), drawCard(deck)];
      const dealerHand = [drawCard(deck), drawCard(deck)];

      return {
        ...state,
        deck,
        playerHand,
        dealerHand,
        gameStatus: "playing",
      };
    }

    case "HIT": {
      const { deck, playerHand } = state;
      const newCard = drawCard(deck);
      const newHand = [...playerHand, newCard];

      return {
        ...state,
        deck,
        playerHand: newHand,
      };
    }

    case "STAND": {
      return { ...state, gameStatus: "dealer-won" }; // Placeholder logic
    }

    case "RESET_GAME":
      return initialState;

    default:
      return state;
  }
};

// Context creation
const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | null>(null);

// Provider component
export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

// Hook to use game context
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
