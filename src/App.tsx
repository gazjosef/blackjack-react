import { GameProvider } from "./context/GameContext";
import GlobalStyles from "./styles/GlobalStyles";
import Table from "./components/Table/Table";

const App = () => {
  return (
    <GameProvider>
      <GlobalStyles />
      <div
        style={{
          width: "100vw",
        }}
      >
        <Table />
      </div>
    </GameProvider>
  );
};

export default App;
