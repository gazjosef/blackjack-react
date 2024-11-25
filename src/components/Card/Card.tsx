import React from "react";
import { CardContainer } from "./Card.styles";

interface CardProps {
  suit: string;
  value: string;
}

const Card: React.FC<CardProps> = ({ suit, value }) => {
  return (
    <CardContainer>
      <div>{value}</div>
      <div>{suit}</div>
    </CardContainer>
  );
};

export default Card;
