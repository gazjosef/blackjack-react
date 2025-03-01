import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { generateDeck, Card } from "../hooks/useDeck";

// const cardSound = new Audio("/assets/sounds/mixkit-poker-card-flick-2002.wav");

// Define game state
interface GameState {
  deck: Card[];
  playerHand: Card[];
  dealerHand: Card[];
  playerScore: number;
  dealerScore: number;
  balance: number;
  gameStatus: "playing" | "player-won" | "dealer-won" | "tie";
}

// Define action types
type GameAction =
  | { type: "INITIALIZE_GAME" }
  | { type: "HIT" }
  | { type: "STAND" }
  | { type: "DOUBLE_DOWN" }
  | { type: "DEALER_PLAY" };

// Initial state
const initialState: GameState = {
  deck: [],
  playerHand: [],
  dealerHand: [],
  playerScore: 0,
  dealerScore: 0,
  balance: 1000,
  gameStatus: "playing",
};

// const playCardSound = () => {
//   const audio = new Audio(cardSound);
//   audio.play();
// };

// Function to draw a card safely
const drawCard = (deck: Card[]): { card: Card | null; newDeck: Card[] } => {
  if (deck.length === 0) return { card: null, newDeck: [] };
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
      score += 11;
    } else if (["K", "Q", "J"].includes(value)) {
      score += 10;
    } else {
      score += parseInt(value);
    }
  });

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
      if (state.balance < 50) return state;

      let deck = generateDeck();
      deck = [...deck].sort(() => Math.random() - 0.5); // Shuffle

      const { card: playerCard1, newDeck: deck1 } = drawCard(deck);
      const { card: playerCard2, newDeck: deck2 } = drawCard(deck1);
      const { card: dealerCard1, newDeck: deck3 } = drawCard(deck2);
      const { card: dealerCard2, newDeck: deck4 } = drawCard(deck3);

      const playerHand = [playerCard1!, playerCard2!];
      const dealerHand = [dealerCard1!, dealerCard2!];

      const playerScore = calculateScore(playerHand);
      const dealerScore = calculateScore(dealerHand);

      let gameStatus: GameState["gameStatus"] = "playing";
      let balance = state.balance - 50;

      // ✅ Check for blackjack outcomes
      const playerHasBlackjack = playerScore === 21;
      const dealerHasBlackjack = dealerScore === 21;

      if (playerHasBlackjack && dealerHasBlackjack) {
        gameStatus = "tie"; // Tie - player gets bet back
        balance += 50;
      } else if (playerHasBlackjack) {
        gameStatus = "player-won"; // Player wins with blackjack (1.5x payout)
        balance += 125; // 50 bet + 75 winnings
      } else if (dealerHasBlackjack) {
        gameStatus = "dealer-won"; // Dealer wins with blackjack
      }

      return {
        ...state,
        deck: deck4,
        playerHand,
        dealerHand,
        playerScore,
        dealerScore,
        balance,
        gameStatus,
      };
    }

    case "HIT": {
      if (state.gameStatus !== "playing") return state;

      const { card: newCard, newDeck } = drawCard(state.deck);
      if (!newCard) return state;

      const newPlayerHand = [...state.playerHand, newCard];
      const newPlayerScore = calculateScore(newPlayerHand);

      return {
        ...state,
        deck: newDeck,
        playerHand: newPlayerHand,
        playerScore: newPlayerScore,
        gameStatus: newPlayerScore > 21 ? "dealer-won" : "playing",
      };
    }

    case "STAND": {
      return gameReducer(state, { type: "DEALER_PLAY" });
    }

    case "DOUBLE_DOWN": {
      if (state.gameStatus !== "playing" || state.balance < 50) return state;

      const { card: newCard, newDeck } = drawCard(state.deck);
      if (!newCard) return state;

      const newPlayerHand = [...state.playerHand, newCard];
      const newPlayerScore = calculateScore(newPlayerHand);
      const newBalance = state.balance - 50; // Deduct another 50

      // If player busts, dealer wins immediately
      if (newPlayerScore > 21) {
        return {
          ...state,
          deck: newDeck,
          playerHand: newPlayerHand,
          playerScore: newPlayerScore,
          balance: newBalance,
          gameStatus: "dealer-won",
        };
      }

      // Otherwise, force dealer to play
      return gameReducer(
        {
          ...state,
          deck: newDeck,
          playerHand: newPlayerHand,
          playerScore: newPlayerScore,
          balance: newBalance,
        },
        { type: "DEALER_PLAY" }
      );
    }

    case "DEALER_PLAY": {
      let { deck, dealerHand, balance } = state;
      let dealerScore = calculateScore(dealerHand);

      while (dealerScore < 17) {
        const { card: newCard, newDeck } = drawCard(deck);
        if (!newCard) break;

        dealerHand = [...dealerHand, newCard];
        deck = newDeck;
        dealerScore = calculateScore(dealerHand);
      }

      let gameStatus: GameState["gameStatus"] = "playing";

      if (dealerScore > 21 || dealerScore < state.playerScore) {
        gameStatus = "player-won";
        balance += 100;
      } else if (dealerScore > state.playerScore) {
        gameStatus = "dealer-won";
      } else {
        gameStatus = "tie";
        balance += 50;
      }

      return { ...state, deck, dealerHand, dealerScore, balance, gameStatus };
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
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (
      !hasInitialized.current &&
      state.deck.length === 0 &&
      state.playerHand.length === 0
    ) {
      dispatch({ type: "INITIALIZE_GAME" });
      hasInitialized.current = true;
    }
  }, [state.deck, state.playerHand]);

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
