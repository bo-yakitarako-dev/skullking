import { Player } from '../userRegistry/Player';
import { players, sort } from '../userRegistry/registry';

const taro = new Player(0, 'Taro');
const jiro = new Player(1, 'Jiro');
const shiro = new Player(2, 'Shiro');
const kiyoshi = new Player(3, 'Kiyoshi');

players.push(taro);
players.push(jiro);
players.push(shiro);
players.push(kiyoshi);

sort(2);

test('test', () => {
  expect(players[0].getId()).toBe(2);
});

test('test2', () => {
  expect(players[1].getId()).toBe(3);
});

test('test3', () => {
  expect(players[2].getId()).toBe(0);
});

test('test4', () => {
  expect(players[3].getId()).toBe(1);
});
