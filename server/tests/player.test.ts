import { Card } from '../cardDealing/card';
import { Player } from '../userRegistry/Player';

const taro: Player = new Player(0, 'Taro');

const card1: Card = new Card(1, 'skullking', 100);
const card2: Card = new Card(2, 'pirates', 50);
const card3: Card = new Card(3, 'green', 10);

taro.receiveCard(card2);
taro.receiveCard(card3);
taro.receiveCard(card1);

test('test', () => {
  expect(taro.getHand()[0].getId()).toBe(1);
});

test('test2', () => {
  expect(taro.getHand()[1].getId()).toBe(2);
});
