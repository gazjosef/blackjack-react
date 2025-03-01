import styled from "styled-components";
import { useGame } from "../../context/GameContext";

const BalanceInfo = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

// type BalanceProps = {
//   balance: number;
//   bet: number;
// };

const Balance = () => {
  const { state } = useGame();

  return <BalanceInfo>Balance: ${state.balance} | Bet: $50</BalanceInfo>;
};

export default Balance;
