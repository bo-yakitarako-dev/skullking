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
  private tigresType?: 'pirates' | 'escape';

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

  public getSum() {
    return Card.sum;
  }

  public setTigresType(type: 'pirates' | 'escape') {
    this.tigresType = type;
  }

  public getTigresType() {
    return this.tigresType;
  }

  public convertJson() {
    const { cardId, color, strength, tigresType } = this;
    return { cardId, color, strength, tigresType };
  }
}
