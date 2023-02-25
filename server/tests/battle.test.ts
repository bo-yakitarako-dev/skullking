import { Card, Color } from '../cardDealing/card';
import { tableCards } from '../cardDealing/deck';
import { battle, defineMustColor } from '../mainGame/gameFunction';

type TestBattle = [Card[], number, string];

const tigresPirates = new Card('tigres', 0);
tigresPirates.setTigresType('pirates');
const tigresEscape = new Card('tigres', 0);
tigresEscape.setTigresType('escape');

const setTableCards = (cards: Card[]) => {
  tableCards.splice(0, tableCards.length);
  tableCards.push(...cards);
};

describe.each<TestBattle>([
  [[new Card('black', 1), new Card('green', 13)], 0, '黒がかつ'],
  [[new Card('black', 1), new Card('green', 14)], 0, '黒勝っちゃうよね'],
  [
    [new Card('black', 1), tigresPirates, new Card('green', 13)],
    1,
    'ティグレス勝てや',
  ],
  [
    [new Card('green', 1), new Card('black', 13), tigresPirates],
    2,
    'ティグレス勝てやオイ',
  ],
  [
    [
      new Card('green', 1),
      new Card('black', 13),
      tigresPirates,
      new Card('mermaid', 1),
    ],
    2,
    'ティグレス勝つんじゃねマーメイドなんかダメ',
  ],
  [
    [tigresPirates, new Card('black', 1), new Card('green', 13)],
    0,
    'ティグレス勝ち～',
  ],
  [
    [tigresEscape, new Card('black', 1), new Card('black', 13)],
    2,
    'ティグレス逃げるよ',
  ],
  [
    [new Card('green', 1), tigresEscape, new Card('green', 13)],
    2,
    'ティグレス逃げるよまたね',
  ],
])('すごいテスト', (cards: Card[], answerIndex: number, testName) => {
  test(testName, () => {
    setTableCards(cards);
    const result = battle();
    expect(result).toBe(answerIndex);
  });
});

type ColorTest = [Card[], Color | undefined, string];

describe.each<ColorTest>([
  [
    [new Card('escape', 1), new Card('pirates', 1), new Card('kraken', 1)],
    undefined,
    '色かーどないよ',
  ],
  [
    [new Card('escape', 1), new Card('green', 1), new Card('kraken', 1)],
    'green',
    '緑だけあるね',
  ],
  [
    [new Card('escape', 1), new Card('green', 1), new Card('purple', 2)],
    'green',
    '紫もあるけど緑だね',
  ],
  [
    [new Card('yellow', 3), new Card('green', 1), new Card('purple', 2)],
    'yellow',
    '黄色が最初だよ',
  ],
])('色のてすとだよ', (cards, expected, testName) => {
  test(testName, () => {
    setTableCards(cards);
    const result = defineMustColor();
    expect(result).toBe(expected);
  });
});
