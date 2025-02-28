import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { generateDeck } from "../hooks/useDeck";

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
  gameStatus: "playing" | "player-won" | "dealer-won" | "tie";
}

// Define action types
type GameAction =
  | { type: "INITIALIZE_GAME" }
  | { type: "HIT" }
  | { type: "STAND" }
  | { type: "DEALER_PLAY" };

// Initial state
const initialState: GameState = {
  deck: [],
  playerHand: [],
  dealerHand: [],
  playerScore: 0,
  dealerScore: 0,
  gameStatus: "playing",
};

// Function to draw a card and update the deck
const drawCard = (deck: Card[]): { card: Card; newDeck: Card[] } => {
  const [card, ...newDeck] = deck;
  return { card, newDeck };
};

// Function to calculate hand score
const calculateScore = (hand: Card[]): number => {
  let score = 0;
  let aceCount = 0;

  hand.forEach(({ value }) => {
    if (value === "A") {
      aceCount++;
      score += 11; // Ace starts as 11
    } else if (["K", "Q", "J"].includes(value)) {
      score += 10;
    } else {
      score += parseInt(value);
    }
  });

  // Convert Aces from 11 to 1 if needed
  while (score > 21 && aceCount > 0) {
    score -= 10;
    aceCount--;
  }

  return score;
};

// Reducer function
const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case "INITIALIZE_GAME": {
      let deck = generateDeck();
      deck = [...deck].sort(() => Math.random() - 0.5); // Shuffle

      const { card: playerCard1, newDeck: deck1 } = drawCard(deck);
      const { card: playerCard2, newDeck: deck2 } = drawCard(deck1);
      const { card: dealerCard1, newDeck: deck3 } = drawCard(deck2);
      const { card: dealerCard2, newDeck: deck4 } = drawCard(deck3);

      const playerHand = [playerCard1, playerCard2];
      const dealerHand = [dealerCard1, dealerCard2];

      return {
        ...state,
        deck: deck4,
        playerHand,
        dealerHand,
        playerScore: calculateScore(playerHand),
        dealerScore: calculateScore(dealerHand),
        gameStatus: "playing",
      };
    }

    case "HIT": {
      if (state.gameStatus !== "playing") return state;

      const { deck, playerHand } = state;
      const { card: newCard, newDeck } = drawCard(deck);
      const newPlayerHand = [...playerHand, newCard];
      const newPlayerScore = calculateScore(newPlayerHand);

      const gameStatus = newPlayerScore > 21 ? "dealer-won" : "playing";

      return {
        ...state,
        deck: newDeck,
        playerHand: newPlayerHand,
        playerScore: newPlayerScore,
        gameStatus,
      };
    }

    case "STAND": {
      return { ...state, gameStatus: "dealer-won" }; // Placeholder logic
    }

    case "DEALER_PLAY": {
      let { deck, dealerHand } = state;
      let dealerScore = calculateScore(dealerHand);

      while (dealerScore < 17) {
        const { card: newCard, newDeck } = drawCard(deck);
        dealerHand = [...dealerHand, newCard];
        deck = newDeck;
        dealerScore = calculateScore(dealerHand);
      }

      let gameStatus: GameState["gameStatus"] = "playing";
      if (dealerScore > 21) {
        gameStatus = "player-won";
      } else if (dealerScore > state.playerScore) {
        gameStatus = "dealer-won";
      } else if (dealerScore < state.playerScore) {
        gameStatus = "player-won";
      } else {
        gameStatus = "tie";
      }

      return { ...state, deck, dealerHand, dealerScore, gameStatus };
    }

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
