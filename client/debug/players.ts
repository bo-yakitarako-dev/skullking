import { Player } from '../modules/state';
import { testCards } from './cards';

export const testPlayers: Player[] = [
  {
    playerId: 1,
    name: 'さいきょうさん',
    hand: testCards.slice(0, 10),
    prediction: 2,
    scores: [10, -10, 40, 20, -50, 60, -20, 20],
    victory: 0,
  },
  {
    playerId: 2,
    name: 'こぼちゃん',
    hand: testCards.slice(0, 10),
    prediction: 0,
    scores: [10, -20, 30, 60, 20, 60, -20, 20],
    victory: 0,
  },
  {
    playerId: 3,
    name: 'たまごっちだよ',
    hand: testCards.slice(0, 10),
    prediction: 4,
    scores: [20, 30, 20, 40, -50, 20, 40, -10],
    victory: 0,
  },
];
