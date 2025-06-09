import styled from "styled-components";
import { useGame } from "../../context/GameContext";

const BalanceInfo = styled.div`
  margin-inline: auto;
  padding: 1rem;
  width: 100%;

  color: white;
  font-size: 2.4rem;
  font-weight: bold;
  text-align: right;
`;

const Balance = () => {
  const { state } = useGame();

  return <BalanceInfo>Bet: $50 | Balance: ${state.balance}</BalanceInfo>;
};

export default Balance;
