import { Card } from './card';

export const deck: Card[] = [];
export const discard: Card[] = [];

deck.push(new Card('skullking', 15));
for (let i = 0; i < 5; i++) {
  deck.push(new Card('pirates', 15));
}
for (let i = 0; i < 2; i++) {
  deck.push(new Card('mermaid', 15));
}
deck.push(new Card('tigres', 15));
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
