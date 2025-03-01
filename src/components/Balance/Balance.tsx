import styled from "styled-components";
import { useGame } from "../../context/GameContext";

const BalanceInfo = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const Balance = () => {
  const { state } = useGame();

  return <BalanceInfo>Balance: ${state.balance} | Bet: $50</BalanceInfo>;
};

export default Balance;
