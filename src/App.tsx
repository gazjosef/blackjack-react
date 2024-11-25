import React from "react";
import BlackjackTable from "./components/BlackJackTable/BlackJackTable";
import { DeckProvider } from "./contexts/DeckProvider";
import { GameProvider } from "./contexts/GameProvider";

const App: React.FC = () => {
  return (
    <DeckProvider>
      <GameProvider>
        <BlackjackTable />
      </GameProvider>
    </DeckProvider>
  );
};

export default App;
