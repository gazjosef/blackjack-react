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
  color: white;
`;

const HandContainer = styled.div`
  display: flex;
  gap: 10px;
  perspective: 600px;
  justify-content: center;
  align-items: center;
`;

const DealerHandContainer = styled(HandContainer)`
  transform: scale(0.85);
`;

const CardImg = styled.img`
  width: 80px;
  height: 120px;
  transform: rotateX(35deg);
  transform-origin: center top;
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

  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;

const StatusText = styled.h2`
  color: white;
`;

const BalanceInfo = styled.div`
  font-size: 18px;
  font-weight: bold;
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
  const hideDealerCard = state.gameStatus === "playing";

  return (
    <Container>
      <h2>Dealer's Hand</h2>
      <DealerHandContainer>
        {state.dealerHand.map((card, index) => (
          <CardImg
            key={index}
            src={
              index === 1 && hideDealerCard
                ? "/images/cards/red_back.png"
                : getCardImage(card)
            }
            alt={
              index === 1 && hideDealerCard
                ? "Hidden Card"
                : `${card.value} of ${card.suit}`
            }
          />
        ))}
      </DealerHandContainer>
      {!hideDealerCard && <p>Dealer Total: {state.dealerScore}</p>}

      <h2>Your Hand</h2>
      <HandContainer>
        {state.playerHand.map((card, index) => (
          <CardImg
            key={index}
            src={getCardImage(card)}
            alt={`${card.value} of ${card.suit}`}
          />
        ))}
      </HandContainer>
      <p>Your Total: {state.playerScore}</p>

      <BalanceInfo>Balance: ${state.balance} | Bet: $50</BalanceInfo>

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

      <Button
        onClick={() => dispatch({ type: "INITIALIZE_GAME" })}
        disabled={state.balance < 50}
      >
        New Game
      </Button>
    </Container>
  );
};

export default BlackjackTable;
