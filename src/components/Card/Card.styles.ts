import styled from "styled-components";

export const CardImg = styled.img`
  width: 80px;
  height: 120px;
  transform: rotateX(35deg);
  transform-origin: center top;

  /* Media query to turn off styles on smaller screens */
  @media (max-width: 800px) {
    transform: rotateX(0deg);
  }
`;
