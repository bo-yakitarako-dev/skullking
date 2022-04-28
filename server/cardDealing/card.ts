type Color =
  | 'green'
  | 'purple'
  | 'yellow'
  | 'black'
  | 'skullking'
  | 'pirates'
  | 'mermaid'
  | 'tigres'
  | 'escape'
  | 'treasure'
  | 'kraken';
export class Card {
  private cardId: number;
  private color: Color;
  private strength: number;

  constructor(cardId: number, color: Color, strength: number) {
    this.cardId = cardId;
    this.color = color;
    this.strength = strength;
  }

  public getId() {
    return this.cardId;
  }

  public getColor() {
    return this.color;
  }

  public getStrength() {
    return this.strength;
  }
}
