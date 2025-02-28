import React from "react";
import { useGame } from "../../context/GameContext";
import styled from "styled-components";

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background: green;
  padding: 20px;
  border-radius: 10px;
  min-height: 400px;
`;

const HandContainer = styled.div`
  display: flex;
  gap: 10px;

  perspective: 600px; /* Controls depth, adjust as needed */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DealerHandContainer = styled(HandContainer)`
  transform: scale(0.85); /* Shrinks the dealer's hand slightly */
`;

const CardImg = styled.img`
  width: 80px;
  height: 120px;
  transform: rotateX(35deg); /* Tilt the card downwards */
  transform-origin: center top; /* Ensures rotation starts from the top */
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #fff;
  transition: 0.3s;

  &:hover {
    background-color: #ddd;
  }
`;

const StatusText = styled.h2`
  color: white;
`;

const getCardImage = (card: any) => {
  const suitMap: Record<string, string> = {
    spade: "S",
    heart: "H",
    diamond: "D",
    club: "C",
  };

  return `/images/cards/${card.value}${suitMap[card.suit]}.png`;
};

const BlackjackTable: React.FC = () => {
  const { state, dispatch } = useGame();

  return (
    <Container>
      <h2>Dealer's Hand</h2>
      <DealerHandContainer>
        <HandContainer>
          {state.dealerHand.map((card, index) => (
            <CardImg
              key={index}
              // src={`/images/cards/${card.suit}-${card.value}.png`}
              src={getCardImage(card)}
              alt={`${card.value} of ${card.suit}`}
            />
          ))}
        </HandContainer>
      </DealerHandContainer>

      <h2>Your Hand</h2>
      <HandContainer>
        {state.playerHand.map((card, index) => (
          <CardImg
            key={index}
            // src={`/cards/${card.suit}-${card.value}.png`}
            src={getCardImage(card)}
            alt={`${card.value} of ${card.suit}`}
          />
        ))}
      </HandContainer>

      <StatusText>
        {state.gameStatus === "playing"
          ? "Your Turn!"
          : `Result: ${state.gameStatus}`}
      </StatusText>

      {state.gameStatus === "playing" && (
        <>
          <Button onClick={() => dispatch({ type: "HIT" })}>Hit</Button>
          <Button onClick={() => dispatch({ type: "STAND" })}>Stand</Button>
        </>
      )}

      <Button onClick={() => dispatch({ type: "INITIALIZE_GAME" })}>
        New Game
      </Button>
    </Container>
  );
};

export default BlackjackTable;
