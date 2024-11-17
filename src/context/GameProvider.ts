// src/contexts/GameProvider.ts
import {
  createContext,
  useContext,
  // useState
} from "react";
import { Card } from "./CardProvider";
import // useDeckContext
"./DeckProvider";

// Define GameContext interface
interface GameContextType {
  playerHand: Card[];
  dealerHand: Card[];
  playerScore: number;
  dealerScore: number;
  gameStatus: string;
  dealInitialHands: () => void;
  hit: () => void;
  stand: () => void;
  resetGame: () => void;
}

// Create context
const GameContext = createContext<GameContextType | undefined>(undefined);

// Helper function to calculate score
const calculateScore = (hand: Card[]): number => {
  let score = hand.reduce((total, card) => total + card.value, 0);
  // Handle Ace adjustment
  const hasAce = hand.some((card) => card.rank === "A");
  if (hasAce && score > 21) score -= 10;
  return score;
};
console.log("calculateScore", calculateScore);

// Provider component
// export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const { drawCard, resetDeck, shuffleDeck } = useDeckContext();
//   const [playerHand, setPlayerHand] = useState<Card[]>([]);
//   const [dealerHand, setDealerHand] = useState<Card[]>([]);
//   const [gameStatus, setGameStatus] = useState<string>("ready");

//   const dealInitialHands = () => {
//     shuffleDeck();
//     setPlayerHand([drawCard()!, drawCard()!]);
//     setDealerHand([drawCard()!, drawCard()!]);
//     setGameStatus("playing");
//   };

//   const hit = () => {
//     setPlayerHand((prevHand) => [...prevHand, drawCard()!]);
//   };

//   const stand = () => {
//     // Dealer logic
//     let dealerNewHand = [...dealerHand];
//     while (calculateScore(dealerNewHand) < 17) {
//       dealerNewHand.push(drawCard()!);
//     }
//     setDealerHand(dealerNewHand);

//     // Determine outcome
//     const playerScore = calculateScore(playerHand);
//     const dealerScore = calculateScore(dealerNewHand);
//     if (playerScore > 21) setGameStatus("Player busts");
//     else if (dealerScore > 21 || playerScore > dealerScore)
//       setGameStatus("Player wins");
//     else if (playerScore < dealerScore) setGameStatus("Dealer wins");
//     else setGameStatus("Push");
//   };

//   const resetGame = () => {
//     resetDeck();
//     setPlayerHand([]);
//     setDealerHand([]);
//     setGameStatus("ready");
//   };

//   return (
//     <GameContext.Provider
//       value={{
//         playerHand,
//         dealerHand,
//         playerScore: calculateScore(playerHand),
//         dealerScore: calculateScore(dealerHand),
//         gameStatus,
//         dealInitialHands,
//         hit,
//         stand,
//         resetGame,
//       }}
//     >
//       {children}
//     </GameContext.Provider>
//   );
// };

// Custom hook for consuming game context
export const useGameContext = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
