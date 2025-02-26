import React from "react";
import { CardWrapper, CardImage } from "../Card/Card.styles";
import { cardImages } from "./Card.images";

type Suit = "heart" | "diamond" | "club" | "spade";
type Value =
  | "A"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K";

const Card: React.FC<{
  suit: Suit;
  value: Value;
}> = ({ suit, value }) => {
  const cardKey = `${value}${suit.charAt(0).toUpperCase()}`;
  const imagePath = cardImages[cardKey];

  return (
    <CardWrapper>
      <CardImage src={imagePath} alt={`${value} of ${suit}`} />
    </CardWrapper>
  );
};

export default Card;
