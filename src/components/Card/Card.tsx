import styled from "styled-components";
import { Card as CardType } from "../../hooks/useDeck";

// Define the styled components
const CardWrapper = styled.div`
  width: 80px;
  height: 120px;
  background: white;
  border: 2px solid black;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
`;

const Suit = styled.div<{ suit: string }>`
  color: ${({ suit }) => (suit === "♥" || suit === "♦" ? "red" : "black")};
  font-size: 20px;
`;

const PipPattern = styled.div<{ count: number; suit: string }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, 20px);
  gap: 2px;
  font-size: 20px;
  color: ${({ suit }) => (suit === "♥" || suit === "♦" ? "red" : "black")};

  & > div {
    display: inline-block;
    color: ${({ suit }) => (suit === "♥" || suit === "♦" ? "red" : "black")};
  }
`;

const FaceCardImage = styled.img`
  width: 50px;
  height: 70px;
  object-fit: contain;
`;

// Card component
interface CardProps {
  card: CardType;
}

export function Card({ card }: CardProps) {
  // Function to render pip patterns for number cards
  const renderPips = () => {
    const count = parseInt(card.value);
    return Array.from({ length: count }, (_, index) => (
      <div key={index}>{card.suit}</div>
    ));
  };

  // Function to render image for face cards (Jack, Queen, King)
  const renderFaceCard = () => {
    let imageSrc = "";

    if (card.suit === "♥" || card.suit === "♦") {
      // Red suits: Heart and Diamond
      imageSrc = `/images/${card.value.toLowerCase()}-red.png`;
    } else {
      // Black suits: Club and Spade
      imageSrc = `/images/${card.value.toLowerCase()}-black.png`;
    }

    return <FaceCardImage src={imageSrc} alt={card.value} />;
  };

  return (
    <CardWrapper>
      {/* Render Pip Patterns for number cards */}
      {card.value !== "J" && card.value !== "Q" && card.value !== "K" ? (
        <>
          <Suit suit={card.suit}>{card.value}</Suit>
          <PipPattern count={parseInt(card.value)} suit={card.suit}>
            {renderPips()}
          </PipPattern>
        </>
      ) : (
        // Render Image for face cards
        renderFaceCard()
      )}
      <Suit suit={card.suit}>{card.suit}</Suit>
    </CardWrapper>
  );
}
