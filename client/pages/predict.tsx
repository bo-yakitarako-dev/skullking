import { Box } from '@chakra-ui/layout';
import { Card, CardType } from '../components/common/Card';

const cards: CardType[] = [
  { cardId: 1, color: 'green', strength: 1 },
  { cardId: 2, color: 'purple', strength: 7 },
  { cardId: 3, color: 'yellow', strength: 10 },
  { cardId: 4, color: 'black', strength: 28 },
  { cardId: 5, color: 'skullking', strength: 80 },
  { cardId: 6, color: 'pirates', strength: 60 },
  { cardId: 7, color: 'mermaid', strength: 60 },
  { cardId: 8, color: 'tigres', strength: 60 },
  { cardId: 9, color: 'kraken', strength: 0 },
  { cardId: 10, color: 'escape', strength: 0 },
  { cardId: 11, color: 'treasure', strength: 0 },
];

const Predict: React.FC = () => {
  return (
    <Box
      padding={8}
      height="100vh"
      display="flex"
      justifyContent="space-between"
    >
      {cards.map((card) => (
        <Card key={card.cardId} card={card} />
      ))}
    </Box>
  );
};

export default Predict;
