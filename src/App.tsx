// src/App.tsx
import React, { useState } from "react";
import { useDeck } from "./contexts/DeckProvider";
import "./App.css"; // Optional for styling

const App: React.FC = () => {
  const { deck, shuffleDeck, resetDeck } = useDeck();
  const [message, setMessage] = useState<string>("");

  // Shuffle deck and display a message
  const handleShuffle = () => {
    shuffleDeck();
    setMessage("The deck has been shuffled!");
  };

  // Reset deck and display a message
  const handleReset = () => {
    resetDeck();
    setMessage("The deck has been reset to its original state!");
  };

  return (
    <div className="App">
      <h1>Blackjack Game</h1>
      <p>There are {deck.length} cards remaining in the deck.</p>
      <div>
        <button onClick={handleShuffle}>Shuffle Deck</button>
        <button onClick={handleReset}>Reset Deck</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default App;
