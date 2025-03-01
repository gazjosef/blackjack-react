import { useGame } from "../../context/GameContext";
import Card from "../Card/Card";
import { HandBox, HandContainer, HandScore, HandTitle } from "./Hand.styles";

export interface HandProps {
  type: "player" | "dealer";
}

const Hand = ({ type }: HandProps) => {
  const { state } = useGame();
  const isDealer = type === "dealer";
  const hand = isDealer ? state.dealerHand : state.playerHand;
  const score = isDealer ? state.dealerScore : state.playerScore;
  const hideSecondCard = isDealer && state.gameStatus === "playing";

  return (
    <HandContainer>
      <HandTitle>{isDealer ? "Dealer's Hand" : "Your Hand"}</HandTitle>
      <HandBox type={type}>
        {hand.map((card, index) => (
          <Card
            key={`${card.value} of ${card.suit}`}
            card={card}
            isHidden={index === 1 && hideSecondCard}
          />
        ))}
      </HandBox>
      <HandScore
        style={{
          visibility: hideSecondCard ? "hidden" : "visible",
          opacity: hideSecondCard ? 0 : 1, // Optionally make it fade out
          transition: "visibility 0.3s ease-out, opacity 0.3s ease-out", // Smooth transition for fade
        }}
      >
        {isDealer ? "Dealer" : "Your"} Total: {score}
      </HandScore>
    </HandContainer>
  );
};

export default Hand;
