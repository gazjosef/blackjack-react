// Card.tsx
import React from "react";
import styled from "styled-components";
import { suitImages, faceImages } from "../Card/Card.images";

// // Define suit images for pips
// const suitImages: Record<string, string> = {
//   heart: "/images/heart.svg",
//   diamond: "/images/diamond.svg",
//   club: "/images/club.svg",
//   spade: "/images/spade.svg",
// };

// // Define face images mapping for J, Q, K using colour
// const faceImages: Record<string, string> = {
//   "J-red": "/images/jack-red.svg",
//   "Q-red": "/images/queen-red.svg",
//   "K-red": "/images/king-red.svg",
//   "J-black": "/images/jack-black.svg",
//   "Q-black": "/images/queen-black.svg",
//   "K-black": "/images/king-black.svg",
// };

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
  // For face cards we won't use pips.
  J: [],
  Q: [],
  K: [],
};

// Styled Card Component
const CardWrapper = styled.div<{ suit: string }>`
  --width: 5em;
  --height: calc(var(--width) * 1.7);
  width: var(--width);
  height: var(--height);
  background-color: white;
  border: 1px solid #000;
  border-radius: 0.25em;
  padding: 1em;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(7, 1fr);
  position: relative;

  color: ${(props) =>
    props.suit === "heart" || props.suit === "diamond" ? "red" : "black"};
`;

// Styled Pip Component (for non-face cards)
const Pip = styled.div<{
  suit: string;
  row: number;
  col: number;
  rotate?: boolean;
}>`
  width: 100%;
  aspect-ratio: 1 / 1;
  background-image: url(${(props) => suitImages[props.suit]});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  grid-row-start: ${(props) => props.row};
  grid-column-start: ${(props) => props.col};
  transform: ${(props) => (props.rotate ? "rotate(180deg)" : "none")};
`;

// Styled Corner Numbers
const CornerNumber = styled.div<{ position: "top" | "bottom"; suit: string }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.8em;
  letter-spacing: -0.1em;
  ${(props) =>
    props.position === "top"
      ? "top: 0.25em; left: 0.25em;"
      : "bottom: 0.25em; right: 0.25em; transform: rotate(180deg);"}
  &::after {
    line-height: 0;
    display: block;
    width: 0.5em;
    content: url(${(props) => suitImages[props.suit]});
  }
`;

// Styled Face Image (for J, Q, K)
const FaceImage = styled.img`
  grid-row: 2 / span 5;
  grid-column: 1 / -1;
  width: 80%;
  margin: auto;
  object-fit: contain;
  pointer-events: none;
  user-select: none;
`;

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

// Card Component
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
      {/* Corner Numbers */}
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
