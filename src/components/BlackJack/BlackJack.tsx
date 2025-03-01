import styled from "styled-components";
import { useGame } from "../../context/GameContext";
import Balance from "../Balance/Balance";
import Hand from "../Hand/Hand";
import Buttons from "../Buttons/Buttons";

// Styled components
const Container = styled.div`
  background: #327932;
  min-height: 400px;
  width: 100vw;
  padding: 20px;
  border-radius: 10px;

  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;

  color: white;
`;

const StatusText = styled.h2`
  color: white;
`;

const BlackjackTable = () => {
  const { state } = useGame();

  return (
    <Container>
      <Balance />
      <Hand type="dealer" />
      <Hand type="player" />

      <StatusText>
        {state.gameStatus === "playing"
          ? "Your Turn!"
          : `Result: ${state.gameStatus}`}
      </StatusText>

      <Buttons />
    </Container>
  );
};

export default BlackjackTable;
