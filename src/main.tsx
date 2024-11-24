// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { DeckProvider } from "./contexts/DeckProvider";
import { GameProvider } from "./contexts/GameProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DeckProvider>
      <GameProvider>
        <App />
      </GameProvider>
    </DeckProvider>
  </StrictMode>
);
