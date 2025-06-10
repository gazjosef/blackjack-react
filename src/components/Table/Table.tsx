import styled from "styled-components";
// Components
import Balance from "../Balance/Balance";
import Hand from "../Hand/Hand";
import GameControls from "../Buttons/Buttons";
import Status from "../Status/Status";
import { BlackJackTable } from "./Table.styles";

const TableWrapper = styled.div`
  width: 80vw;
  max-width: 120rem;
  margin-inline: auto;
  padding-inline: 2rem; /* Optional, to prevent edge crowding on small screens */
  /* background-color: darkblue; */
`;
const Table = () => {
  return (
    <TableWrapper>
      <Balance />
      <BlackJackTable>
        <Hand type="dealer" />
        <Hand type="player" />

        <Status />

        <GameControls />
      </BlackJackTable>
    </TableWrapper>
  );
};

export default Table;
