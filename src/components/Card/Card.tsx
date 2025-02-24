import React from "react";
import styled from "styled-components";

// Define suit images
const suitImages: Record<string, string> = {
  heart: "/images/heart.svg",
  diamond: "/images/diamond.svg",
  club: "/images/club.svg",
  spade: "/images/spade.svg",
};

// Define the pip placements for different values
const pipPositions: Record<
  string,
  { row: number; col: number; rotate?: boolean }[]
> = {
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
  // Add other numbers accordingly...
};

// Styled Card Component
const CardWrapper = styled.div<{ suit: string }>`
  --width: 5em;
  --height: calc(var(--width) * 1.4);
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

// Styled Pip Component
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

// Card Component
const Card: React.FC<{
  suit: "heart" | "diamond" | "club" | "spade";
  value: string;
}> = ({ suit, value }) => {
  return (
    <CardWrapper suit={suit} data-suit={suit} data-value={value}>
      {/* Corner Numbers */}
      <CornerNumber suit={suit} position="top">
        {value}
      </CornerNumber>
      <CornerNumber suit={suit} position="bottom">
        {value}
      </CornerNumber>

      {/* Pips dynamically positioned */}
      {pipPositions[value]?.map((pos, index) => (
        <Pip
          key={index}
          suit={suit}
          row={pos.row}
          col={pos.col}
          rotate={pos.rotate}
        />
      ))}
    </CardWrapper>
  );
};

export default Card;
