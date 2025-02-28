import { useDeck } from "./hooks/useDeck";
// import Card from "./components/Card/Card";
import BlackJackTable from "./components/BlackJackTable/BlackJackTable2";
// import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";

// const DeckContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(13, 1fr);
//   gap: 8px;
//   margin-top: 20px;
// `;

const App = () => {
  const { deck, drawnCard, shuffleDeck, drawCard } = useDeck();

  return (
    <div>
      <GlobalStyles />
      <h1>Blackjack Deck</h1>
      <button onClick={shuffleDeck}>Shuffle</button>
      <button onClick={drawCard} disabled={deck.length === 0}>
        Draw Card
      </button>

      {drawnCard && (
        <p>
          Drawn Card: {drawnCard.value} {drawnCard.suit}
        </p>
      )}
      <p>Cards Left: {deck.length}</p>

      {/* <DeckContainer>
        {deck.map((card, index) => (
          <Card key={index} suit={card.suit} value={card.value} />
        ))}
      </DeckContainer> */}

      <BlackJackTable />
    </div>
  );
};

export default App;
