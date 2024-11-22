import "./App.css";
import { useCard } from "./contexts/CardProvider";

function App() {
  const { cardTypes } = useCard();

  console.log("Available card types:", cardTypes);

  return (
    <>
      <h1>Hello World</h1>
    </>
  );
}

export default App;
