import { CardImg } from "./Card.styles";

interface CardProps {
  card: any;
  isHidden?: boolean;
}

const getCardImage = (card: any) => {
  const suitMap: Record<string, string> = {
    spade: "S",
    heart: "H",
    diamond: "D",
    club: "C",
  };

  return `/images/cards/${card.value}${suitMap[card.suit]}.png`;
};

const Card = ({ card, isHidden = false }: CardProps) => {
  return (
    <CardImg
      src={isHidden ? "/images/cards/red_back.png" : getCardImage(card)}
      alt={isHidden ? "Hidden Card" : `${card.value} of ${card.suit}`}
    />
  );
};

export default Card;
