// src/contexts/DeckProvider.ts
import {
  createContext,
  useContext,
  // useState
} from "react";
import {
  Card,
  // useCardContext
} from "./CardProvider";

// Define DeckContext interface
interface DeckContextType {
  deck: Card[];
  shuffleDeck: () => void;
  drawCard: () => Card | null;
  resetDeck: () => void;
}

// Create context
const DeckContext = createContext<DeckContextType | undefined>(undefined);

// Provider component
// export const DeckProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const cardData = useCardContext(); // Get card data from CardProvider
//   const [deck, setDeck] = useState<Card[]>([...cardData]);

//   // Shuffle the deck
//   const shuffleDeck = () => {
//     setDeck((prevDeck) =>
//       [...prevDeck].sort(() => Math.random() - 0.5)
//     );
//   };

//   // Draw a card from the top of the deck
//   const drawCard = (): Card | null => {
//     if (deck.length === 0) return null;
//     const [topCard, ...remainingDeck] = deck;
//     setDeck(remainingDeck);
//     return topCard;
//   };

//   // Reset the deck to the original card data
//   const resetDeck = () => {
//     setDeck([...cardData]);
//   };

//   return (
//     <DeckContext.Provider value={{ deck, shuffleDeck, drawCard, resetDeck }}>
//       {children}
//     </DeckContext.Provider>
//   );
// };

// Custom hook for consuming deck context
export const useDeckContext = (): DeckContextType => {
  const context = useContext(DeckContext);
  if (!context) {
    throw new Error("useDeckContext must be used within a DeckProvider");
  }
  return context;
};
