import styled from "styled-components";
import { suitImages } from "../Card/Card.images";

// Styled Card Component
export const CardWrapper = styled.div<{ suit: string }>`
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
export const Pip = styled.div<{
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
export const CornerNumber = styled.div<{
  position: "top" | "bottom";
  suit: string;
}>`
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
export const FaceImage = styled.img`
  grid-row: 2 / span 5;
  grid-column: 1 / -1;
  width: 80%;
  margin: auto;
  object-fit: contain;
  pointer-events: none;
  user-select: none;
`;
