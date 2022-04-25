import { Card } from '../cardDealing/card';
export class Player {
  private playerId: number;
  private name: string;
  private prediction: number;
  private hand: Card[] = [];
  private score: number[] = [];

  constructor(playerId: number, name: string) {
    this.playerId = playerId;
    this.name = name;
    this.prediction = -1; //プレイ前の値は-1とする
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

  public writeScore(score: number) {
    this.score.push(score);
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
    const card: Card[] = this.hand.splice(i, 1);
    return card[0];
  }

  public getHand() {
    return this.hand;
  }

  public getPrediction() {
    return this.prediction;
  }

  public getScore() {
    return this.score;
  }

  public sample(i: number) {
    return this.hand[i].getId();
  }
}
