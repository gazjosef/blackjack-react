// src/App.tsx
import React from "react";
import { useGame } from "./contexts/GameProvider";
import "./App.css";

const App: React.FC = () => {
  const { playerHand, dealerHand, deal, hit, stand, double, gameStatus } =
    useGame();

  const renderHand = (hand: { suit: string; value: string }[]) =>
    hand.map((card, index) => (
      <span key={index}>
        {card.value} of {card.suit}
        {index < hand.length - 1 && ", "}
      </span>
    ));

  return (
    <div className="App">
      <h1>Blackjack</h1>
      <p>Game Status: {gameStatus}</p>

      <div>
        <h2>Dealer's Hand</h2>
        <p>{dealerHand.length ? renderHand(dealerHand) : "Not dealt yet"}</p>
      </div>

      <div>
        <h2>Player's Hand</h2>
        <p>{playerHand.length ? renderHand(playerHand) : "Not dealt yet"}</p>
      </div>

      <div className="controls">
        <button onClick={deal}>Deal</button>
        <button onClick={hit}>Hit</button>
        <button onClick={stand}>Stand</button>
        <button onClick={double}>Double</button>
      </div>
    </div>
  );
};

export default App;
