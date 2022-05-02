import { Card } from '../cardDealing/card';
export class Player {
  private playerId: number;
  private name: string;
  private prediction: number;
  private victory: number;
  private hand: Card[] = [];
  private scores: number[] = [];

  constructor(playerId: number, name: string) {
    this.playerId = playerId;
    this.name = name;
    this.prediction = -1; //プレイ前の値は-1とする
    this.victory = 0;
  }

  public isPlayerId(playerId: number) {
    return this.playerId === playerId;
  }

  public rename(name: string) {
    this.name = name;
  }

  public createTitleJson() {
    const { playerId, name } = this;
    return { playerId, name };
  }

  public predict(prediction: number) {
    this.prediction = prediction;
  }

  public win() {
    this.victory++;
  }

  public resetVictory() {
    this.victory = 0;
  }

  public writeScore(score: number) {
    this.scores.push(score);
  }

  public receiveCard(card: Card) {
    if (
      this.hand.length === 0 ||
      card.getId() > this.hand[this.hand.length - 1].getId()
    ) {
      this.hand.push(card);
    } else {
      const now: number = this.hand.length;
      for (let i = 0; now === this.hand.length; i++) {
        if (card.getId() < this.hand[i].getId()) {
          this.hand.splice(i, 0, card);
        }
      }
    }
  }

  public useCard(i: number) {
    return this.hand.splice(i, 1)[0];
  }

  public getHand() {
    return this.hand;
  }

  public getPrediction() {
    return this.prediction;
  }

  public getVictory() {
    return this.victory;
  }

  public getScore() {
    return this.scores;
  }
}
