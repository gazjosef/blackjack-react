import { GameProvider } from "./context/GameContext";
import Blackjack from "./components/BlackJack/BlackJack";
// import Card from "./components/Card/Card";
// import GlobalStyles from "./styles/GlobalStyles";

const App = () => {
  return (
    <GameProvider>
      <Blackjack />
      {/* <BlackJackTable /> */}
    </GameProvider>
  );
};

export default App;
