// Components
import Balance from "../Balance/Balance";
import Hand from "../Hand/Hand";
import GameControls from "../Buttons/Buttons";
import Status from "../Status/Status";
import { BlackJackTable } from "./Table.styles";

const Table = () => {
  return (
    <>
      <Balance />
      <BlackJackTable>
        <Hand type="dealer" />
        <Hand type="player" />

        <Status />

        <GameControls />
      </BlackJackTable>
    </>
  );
};

export default Table;
