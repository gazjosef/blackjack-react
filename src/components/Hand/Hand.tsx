import { useGame } from "../../context/GameContext";
import styled from "styled-components";

const HandContainer = styled.div`
  display: flex;
  gap: 10px;
  perspective: 600px;
  justify-content: center;
  align-items: center;
`;

const HandTitle = styled.h2`
  text-align: center;
`;

const HandScore = styled.p`
  text-align: center;
`;

const CardImg = styled.img`
  width: 80px;
  height: 120px;
  transform: rotateX(35deg);
  transform-origin: center top;
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

interface HandProps {
  type: "player" | "dealer";
}

const Hand = ({ type }: HandProps) => {
  const { state } = useGame();
  const isDealer = type === "dealer";
  const hand = isDealer ? state.dealerHand : state.playerHand;
  const score = isDealer ? state.dealerScore : state.playerScore;
  const hideSecondCard = isDealer && state.gameStatus === "playing";

  return (
    <div>
      <HandTitle>{isDealer ? "Dealer's Hand" : "Your Hand"}</HandTitle>
      <HandContainer>
        {hand.map((card, index) => (
          <CardImg
            key={index}
            src={
              index === 1 && hideSecondCard
                ? "/images/cards/red_back.png"
                : getCardImage(card)
            }
            alt={
              index === 1 && hideSecondCard
                ? "Hidden Card"
                : `${card.value} of ${card.suit}`
            }
          />
        ))}
      </HandContainer>
      {!hideSecondCard && (
        <HandScore>
          {isDealer ? "Dealer" : "Your"} Total: {score}
        </HandScore>
      )}
    </div>
  );
};

export default Hand;
