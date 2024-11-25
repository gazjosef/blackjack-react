import React from "react";
import { HandContainer } from "./Hand.styles";
import Card from "../Card/Card";
import { useGame } from "../../contexts/GameProvider";

interface HandProps {
  isDealer?: boolean;
}

const Hand: React.FC<HandProps> = ({ isDealer = false }) => {
  const { dealerHand, playerHand } = useGame();
  const cards = isDealer ? dealerHand : playerHand;

  return (
    <HandContainer>
      {cards.map((card, index) => (
        <Card key={index} suit={card.suit} value={card.value} />
      ))}
    </HandContainer>
  );
};

export default Hand;
