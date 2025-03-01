import styled from "styled-components";
import { useGame } from "../../context/GameContext";
import { Flex } from "../../styles/Layout";

const Button = styled.button`
  padding: 10px 20px;
  width: 7rem;
  font-size: 18px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #fff;
  transition: 0.3s;

  &:hover {
    background-color: #ddd;
  }

  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;

const Buttons = () => {
  const { state, dispatch } = useGame();

  const canDoubleDown =
    state.playerHand.length === 2 &&
    [9, 10, 11].includes(state.playerScore) &&
    state.balance >= 50;

  return (
    <Flex gap={"10px"}>
      {state.gameStatus === "playing" && (
        <>
          <Button onClick={() => dispatch({ type: "HIT" })}>Hit</Button>
          <Button onClick={() => dispatch({ type: "STAND" })}>Stand</Button>
          {canDoubleDown && (
            <Button onClick={() => dispatch({ type: "DOUBLE_DOWN" })}>
              Double
            </Button>
          )}
        </>
      )}
      {state.gameStatus !== "playing" && (
        <Button onClick={() => dispatch({ type: "INITIALIZE_GAME" })}>
          Deal
        </Button>
      )}
    </Flex>
  );
};

export default Buttons;
