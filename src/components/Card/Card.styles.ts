import styled from "styled-components";

export const CardImg = styled.img`
  width: 100px;
  height: 150px;
  transform: rotateX(35deg);
  transform-origin: center top;

  /* Media query to turn off styles on smaller screens */
  @media (max-width: 800px) {
    transform: rotateX(0deg);
  }
`;
