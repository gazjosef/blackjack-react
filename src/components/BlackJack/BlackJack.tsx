import styled from "styled-components";
// Components
import Balance from "../Balance/Balance";
import Hand from "../Hand/Hand";
import GameControls from "../Buttons/Buttons";
import Status from "../Status/Status";

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

const BlackjackTable = () => {
  return (
    <Container>
      <Balance />
      <Hand type="dealer" />
      <Hand type="player" />

      <Status />

      <GameControls />
    </Container>
  );
};

export default BlackjackTable;
