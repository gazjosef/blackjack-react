import styled from "styled-components";
import { HandProps } from "./Hand";

export const HandContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;

export const HandTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* Light shadow to make the text pop */
`;

export const HandBox = styled.div<HandProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  transform: ${({ type }) => (type === "dealer" ? "scale(0.9)" : "none")};
`;

export const HandScore = styled.p`
  font-size: 1.8rem;
  text-align: center;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3); /* Subtle shadow effect */
`;
