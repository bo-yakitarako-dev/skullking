import { Card } from '../cardDealing/card';
import { Player } from '../userRegistry/Player';

const taro = new Player(0, 'Taro');

const card1 = new Card('skullking', 100);
const card2 = new Card('pirates', 50);
const card3 = new Card('green', 10);

taro.receiveCard(card2);
taro.receiveCard(card3);
taro.receiveCard(card1);

test('test', () => {
  expect(taro.getHand()[0].getId()).toBe(1);
});

test('test2', () => {
  expect(taro.getHand()[1].getId()).toBe(2);
});
