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
  private static sum = 0;
  private cardId: number;
  private color: Color;
  private strength: number;

  constructor(color: Color, strength: number) {
    Card.sum++;
    this.cardId = Card.sum;
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

  public convertJson() {
    const { cardId, color, strength } = this;
    return { cardId, color, strength };
  }
}
