// import React from "react";

// import BlackjackTable from "./components/BlackJackTable/BlackJackTable";
// import { DeckProvider } from "./contexts/DeckProvider";
// import { GameProvider } from "./contexts/GameProvider";

import { useDeck } from "./hooks/useDeck";
// import { Card } from "./components/Card";
import { Card } from "./components/Card/Card";
import styled from "styled-components";

const DeckContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(13, 1fr);
  gap: 8px;
  margin-top: 20px;
`;

const App = () => {
  const { deck, drawnCard, shuffleDeck, drawCard } = useDeck();

  return (
    <div>
      <h1>Blackjack Deck</h1>
      <button onClick={shuffleDeck}>Shuffle</button>
      <button onClick={drawCard}>Draw Card</button>

      {drawnCard && (
        <p>
          Drawn Card: {drawnCard.value} {drawnCard.suit}
        </p>
      )}
      <p>Cards Left: {deck.length}</p>

      <DeckContainer>
        {deck.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </DeckContainer>
    </div>
  );
};

export default App;
