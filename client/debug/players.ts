import { Player } from '../modules/state';

export const testPlayers: Player[] = [
  {
    playerId: 1,
    name: 'かめりあ',
    prediction: 1,
    victory: 0,
    hand: [
      { cardId: 13, color: 'escape', strength: 0 },
      { cardId: 21, color: 'black', strength: 11 },
      { cardId: 29, color: 'black', strength: 3 },
      { cardId: 46, color: 'purple', strength: 14 },
      { cardId: 59, color: 'purple', strength: 1 },
      { cardId: 70, color: 'yellow', strength: 4 },
    ],
    scores: [-10, 20, 20, -40, -10],
  },
  {
    playerId: 2,
    name: 'ばかだね',
    prediction: 2,
    victory: 0,
    hand: [
      { cardId: 16, color: 'treasure', strength: 0 },
      { cardId: 20, color: 'black', strength: 12 },
      { cardId: 49, color: 'purple', strength: 11 },
      { cardId: 58, color: 'purple', strength: 2 },
      { cardId: 68, color: 'yellow', strength: 6 },
      { cardId: 71, color: 'yellow', strength: 3 },
    ],
    scores: [20, -10, 20, 40, -10],
  },
  {
    playerId: 3,
    name: 'こんぐらちゅ',
    prediction: 2,
    victory: 0,
    hand: [
      { cardId: 7, color: 'mermaid', strength: 15 },
      { cardId: 17, color: 'treasure', strength: 0 },
      { cardId: 26, color: 'black', strength: 6 },
      { cardId: 28, color: 'black', strength: 4 },
      { cardId: 39, color: 'green', strength: 7 },
      { cardId: 51, color: 'purple', strength: 9 },
    ],
    scores: [10, 20, 20, -40, -50],
  },
];
