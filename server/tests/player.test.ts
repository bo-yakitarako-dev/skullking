import { Card } from '../cardDealing/card';
import { tableCards } from '../cardDealing/deck';
import { battle } from '../mainGame/gameFunction';

const card1 = new Card('green', 3);
const card2 = new Card('pirates', 29);
const card3 = new Card('mermaid', 31);
const card4 = new Card('kraken', 0);

tableCards.push(card1);
tableCards.push(card2);
tableCards.push(card3);
tableCards.push(card4);

test('test_new', () => {
  expect(battle()).toBe(-3);
});
