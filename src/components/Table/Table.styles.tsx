import styled from "styled-components";

export const BlackJackTable = styled.div`
  background-color: #327932;
  background-image: radial-gradient(
    circle,
    rgba(50, 50, 50, 0.2),
    rgba(0, 0, 0, 0.5)
  );
  width: 100%;
  max-width: 120rem;
  margin-inline: auto;
  padding: 3rem;

  border: 10px solid darkgoldenrod;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.5),
    0px -10px 15px rgba(0, 0, 0, 0.3), inset 0px 0px 50px rgba(0, 0, 0, 0.6);

  border-bottom-left-radius: 100%;
  border-bottom-right-radius: 100%;

  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 4rem;

  color: white;

  /* Media query to turn off styles on smaller screens */
  @media (max-width: 800px) {
    border: none; /* Remove border */
    box-shadow: none; /* Remove box-shadow */
    border-radius: 0; /* Remove border-radius */
  }
`;
