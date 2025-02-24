import React from "react";
import { faceImages } from "../Card/Card.images";
import { CardWrapper, Pip, CornerNumber, FaceImage } from "../Card/Card.styles";

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

// Define the pip placements for non-face cards
const pipPositions: Record<
  string,
  { row: number; col: number; rotate?: boolean }[]
> = {
  A: [{ row: 4, col: 2 }],
  "2": [
    { row: 1, col: 2 },
    { row: 7, col: 2, rotate: true },
  ],
  "3": [
    { row: 1, col: 2 },
    { row: 4, col: 2 },
    { row: 7, col: 2, rotate: true },
  ],
  "4": [
    { row: 1, col: 1 },
    { row: 1, col: 3 },
    { row: 7, col: 1, rotate: true },
    { row: 7, col: 3, rotate: true },
  ],
  "5": [
    { row: 1, col: 1 },
    { row: 1, col: 3 },
    { row: 4, col: 2 },
    { row: 7, col: 1, rotate: true },
    { row: 7, col: 3, rotate: true },
  ],
  "6": [
    { row: 1, col: 1 },
    { row: 1, col: 3 },
    { row: 4, col: 1 },
    { row: 4, col: 3 },
    { row: 7, col: 1, rotate: true },
    { row: 7, col: 3, rotate: true },
  ],
  "7": [
    { row: 1, col: 1 },
    { row: 1, col: 3 },
    { row: 4, col: 1 },
    { row: 5, col: 2 },
    { row: 4, col: 3 },
    { row: 7, col: 1, rotate: true },
    { row: 7, col: 3, rotate: true },
  ],
  "8": [
    { row: 1, col: 1 },
    { row: 1, col: 3 },
    { row: 3, col: 1 },
    { row: 3, col: 3 },
    { row: 5, col: 1, rotate: true },
    { row: 5, col: 3, rotate: true },
    { row: 7, col: 1, rotate: true },
    { row: 7, col: 3, rotate: true },
  ],
  "9": [
    { row: 1, col: 1 },
    { row: 1, col: 3 },
    { row: 3, col: 1 },
    { row: 3, col: 3 },
    { row: 4, col: 2 },
    { row: 5, col: 1, rotate: true },
    { row: 5, col: 3, rotate: true },
    { row: 7, col: 1, rotate: true },
    { row: 7, col: 3, rotate: true },
  ],
  "10": [
    { row: 1, col: 1 },
    { row: 1, col: 3 },
    { row: 2, col: 1 },
    { row: 2, col: 3 },
    { row: 5, col: 1 },
    { row: 5, col: 3, rotate: true },
    { row: 6, col: 1, rotate: true },
    { row: 6, col: 3, rotate: true },
    { row: 7, col: 1, rotate: true },
    { row: 7, col: 3, rotate: true },
  ],
  J: [],
  Q: [],
  K: [],
};

const Card: React.FC<{
  suit: Suit;
  value: Value;
}> = ({ suit, value }) => {
  // Determine card colour based on suit
  const colour = suit === "heart" || suit === "diamond" ? "red" : "black";

  // Check if card is a face card
  const isFaceCard = ["J", "Q", "K"].includes(value);

  // Determine face image path if needed
  const faceImagePath = isFaceCard ? faceImages[`${value}-${colour}`] : "";

  return (
    <CardWrapper suit={suit} data-suit={suit} data-value={value}>
      <CornerNumber suit={suit} position="top">
        {value}
      </CornerNumber>
      <CornerNumber suit={suit} position="bottom">
        {value}
      </CornerNumber>

      {isFaceCard ? (
        // Render face image for Jack, Queen, King
        <FaceImage src={faceImagePath} alt={`${value} of ${suit}`} />
      ) : (
        // Render pips for non-face cards
        pipPositions[value]?.map((pos, index) => (
          <Pip
            key={index}
            suit={suit}
            row={pos.row}
            col={pos.col}
            rotate={pos.rotate}
          />
        ))
      )}
    </CardWrapper>
  );
};

export default Card;
