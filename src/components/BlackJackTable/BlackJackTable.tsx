import React from "react";
import { TableContainer, Section, Heading } from "./BlackJackTable.styles";
import Hand from "../Hand/Hand";
import Controls from "../Controls/Controls";

const BlackjackTable: React.FC = () => {
  return (
    <TableContainer>
      <Section>
        <Heading>Dealer</Heading>
        <Hand isDealer />
      </Section>
      <Section>
        <Heading>Player</Heading>
        <Hand />
      </Section>
      <Controls />
    </TableContainer>
  );
};

export default BlackjackTable;
