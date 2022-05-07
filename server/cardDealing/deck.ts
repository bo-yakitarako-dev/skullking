import { Card } from './card';

export let deck: Card[] = [];
export let discard: Card[] = [];
export let tableCards: Card[] = [];

deck.push(new Card('skullking', 30));
for (let i = 0; i < 5; i++) {
  deck.push(new Card('pirates', 29));
}
for (let i = 0; i < 2; i++) {
  deck.push(new Card('mermaid', 31));
}
deck.push(new Card('tigres', 0));
deck.push(new Card('kraken', 0));
for (let i = 0; i < 5; i++) {
  deck.push(new Card('escape', 0));
}
for (let i = 0; i < 2; i++) {
  deck.push(new Card('treasure', 0));
}
for (let i = 14; i > 0; i--) {
  deck.push(new Card('black', i));
}
for (let i = 14; i > 0; i--) {
  deck.push(new Card('green', i));
}
for (let i = 14; i > 0; i--) {
  deck.push(new Card('purple', i));
}
for (let i = 14; i > 0; i--) {
  deck.push(new Card('yellow', i));
}

export function shuffle<T>(arr: T[]) {
  for (let i = arr.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

export const addAndShuffle = () => {
  deck = [...deck, ...discard];
  discard = [];
  shuffle(deck);
};

export const discardTheCards = () => {
  discard = [...discard, ...tableCards];
  tableCards = [];
};
