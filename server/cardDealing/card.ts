export class Card {
  private cardId: number;
  private color: string;
  private strength: number;

  constructor(cardId: number, color: string, strength: number) {
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
