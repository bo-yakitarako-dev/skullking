import { CardType } from '../components/common/Card';

type CardBase = { color: CardType['color']; strength: number };

const baseCards: CardBase[] = [
  { color: 'green', strength: 1 },
  { color: 'yellow', strength: 4 },
  { color: 'green', strength: 11 },
  { color: 'skullking', strength: 80 },
  { color: 'escape', strength: 0 },
  { color: 'kraken', strength: 0 },
  { color: 'black', strength: 20 },
  { color: 'purple', strength: 9 },
  { color: 'green', strength: 9 },
  { color: 'pirates', strength: 60 },
];

export const testCards: CardType[] = baseCards.map((card, index) => ({
  cardId: index + 1,
  ...card,
}));
