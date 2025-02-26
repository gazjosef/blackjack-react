import styled from "styled-components";

// Styled Card Component with custom CSS variables
export const CardWrapper = styled.div`
  --width: 100px; /* Card width */
  --height-multiplier: 1.5; /* Height multiplier for aspect ratio */

  width: var(--width);
  height: calc(
    var(--width) * var(--height-multiplier)
  ); /* Dynamic height based on width */
  background-color: white;
  padding: 0;
  border: 1px solid #000;
  border-radius: 0.25em;

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

// Styled Image for Card
export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
  user-select: none;
`;
