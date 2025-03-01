import styled from "styled-components";
import { useGame } from "../../context/GameContext";

const StatusText = styled.h2`
  font-size: 2.5rem;
  color: white;
  transition: visibility 0.3s ease-out, opacity 0.3s ease-out;
`;

// Utility function to convert kebab-case to Title Case
const toTitleCase = (str: string): string => {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
const Status = () => {
  const { state } = useGame();

  return (
    <StatusText>
      {state.gameStatus === "playing"
        ? "Your Turn!"
        : `${toTitleCase(state.gameStatus)}`}
    </StatusText>
  );
};

export default Status;
