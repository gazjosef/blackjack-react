// import { useDeck } from "./hooks/useDeck";
import { GameProvider } from "./context/GameContext";
import Blackjack from "./components/BlackJack/BlackJack";
// import Card from "./components/Card/Card";
// import BlackJackTable from "./components/BlackJackTable/BlackJackTable2";
// import styled from "styled-components";
// import GlobalStyles from "./styles/GlobalStyles";

// const DeckContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(13, 1fr);
//   gap: 8px;
//   margin-top: 20px;
// `;

const App = () => {
  // const { deck, drawnCard, shuffleDeck, drawCard } = useDeck();

  return (
    <GameProvider>
      <Blackjack />
    </GameProvider>
  );
};

export default App;
