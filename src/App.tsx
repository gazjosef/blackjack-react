import { GameProvider } from "./context/GameContext";
import Table from "./components/Table/Table";
// import Card from "./components/Card/Card";
import GlobalStyles from "./styles/GlobalStyles";

const App = () => {
  return (
    <GameProvider>
      <GlobalStyles />
      <Table />
    </GameProvider>
  );
};

export default App;
