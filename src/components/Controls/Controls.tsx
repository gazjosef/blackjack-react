import React from "react";
import { useGame } from "../../contexts/GameProvider";
import { ControlsContainer, Button } from "./Controls.styles";

const Controls: React.FC = () => {
  const { deal, hit, stand, double } = useGame();

  return (
    <ControlsContainer>
      <Button onClick={deal}>Deal</Button>
      <Button onClick={hit}>Hit</Button>
      <Button onClick={stand}>Stand</Button>
      <Button onClick={double}>Double</Button>
    </ControlsContainer>
  );
};

export default Controls;
