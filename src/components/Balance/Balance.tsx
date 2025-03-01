import styled from "styled-components";
import { useGame } from "../../context/GameContext";

const BalanceInfo = styled.div`
  margin-inline: auto;
  padding: 1rem;
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  color: white;
`;

const Balance = () => {
  const { state } = useGame();

  return <BalanceInfo>Balance: ${state.balance} | Bet: $50</BalanceInfo>;
};

export default Balance;
