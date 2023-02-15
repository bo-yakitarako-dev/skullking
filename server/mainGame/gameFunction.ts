import { PostReq, SocketIO } from '../index';
import { Response } from 'express';
import { players, resetRegistry, sort } from '../userRegistry/registry';
import {
  addAndShuffle,
  deck,
  discardTheCards,
  shuffle,
  tableCards,
} from '../cardDealing/deck';
import { Player } from '../userRegistry/Player';
import { Card } from '../cardDealing/card';

type State =
  | 'ready'
  | 'start'
  | 'predicting'
  | 'predicted'
  | 'playing'
  | 'result';
export let state: State = 'ready';
export let round = 0;
let treasureBonusMemory: number[][] = [];

export const gameFunction = (io: SocketIO) => {
  const sendInfo = () => {
    io.emit('playerInfo', [...players.map((p) => p.infoJson())]);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const startGame = (req: any, res: Response) => {
    round = 0;
    state = 'start';
    players.forEach((p) => p.resetAll());
    shuffle(deck);
    startRound();
    sendInfo();
    io.emit('startRound', round);
    io.emit('gameStatus', state);
    res.json({ ok: true });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const finishGame = (req: any, res: Response) => {
    state = 'ready';
    round = 0;
    resetRegistry();
    addAndShuffle();
    discardTheCards();
    io.emit('finishGame');
    io.emit('gameStatus', state);
    io.emit('tableCards', []);
    sendInfo();
    res.json({ ok: true });
  };

  const predict = (
    req: PostReq<{ playerId: number; prediction: number }>,
    res: Response,
  ) => {
    const player = players.find((player) =>
      player.isPlayerId(req.body.playerId),
    );
    if (player === undefined) {
      res
        .status(400)
        .json({ ok: false, message: 'そのIDのプレイヤーはおらんのじゃ' });
      return;
    }
    player.predict(req.body.prediction);
    sendInfo();
    if (players.every((p) => p.isPredicted())) {
      state = 'predicted';
      io.emit('gameStatus', state);
    }
    res.json({ ok: true });
  };

  // eslint-disable-next-line complexity
  const useCard = (
    req: PostReq<{
      playerId: number;
      cardId: number;
      tigresType: 'pirates' | 'escape';
    }>,
    res: Response,
  ) => {
    state = 'playing';
    const player = players.find((player) =>
      player.isPlayerId(req.body.playerId),
    );
    if (player === undefined) {
      res
        .status(400)
        .json({ ok: false, message: 'そのIDのプレイヤーはおらんのじゃ' });
      return;
    }
    const card: Card = player.useCard(req.body.cardId);
    const { tigresType } = req.body;
    if (tigresType !== undefined) {
      card.setTigresType(tigresType);
    }
    tableCards.push(card);

    let sendedPlayers = false;
    if (tableCards.length === players.length) {
      setTimeout(() => {
        const winnerIndex = battle();
        io.emit('winner', players[winnerIndex]?.infoJson() ?? null);
        players[winnerIndex]?.plusBonus(check14Bonus());
        players[winnerIndex]?.plusBonus(checckDefeatBonus());
        checkTreasureBonus(winnerIndex);
        winAndSort(winnerIndex);
        discardTheCards();
        if (players[players.length - 1].getHand().length === 0) {
          determineTreasureBonus();
          const roundOverPlayers = calcScore();
          if (round === 10) {
            state = 'result';
          } else {
            sendedPlayers = true;
            state = 'predicting';
            startRound();
            io.emit('startRound', round);
            io.emit('roundOverPlayers', roundOverPlayers);
            setTimeout(() => {
              sendInfo();
            }, 3000);
          }
        }
        if (!sendedPlayers) {
          sendInfo();
        }
        io.emit('gameStatus', state);
        io.emit('tableCards', []);
      }, 3000);
    }
    sendInfo();
    io.emit('gameStatus', state);
    io.emit('tableCards', [...tableCards.map((p) => p.convertJson())]);
    res.json({ ok: true });
  };

  return { sendInfo, startGame, finishGame, predict, useCard };
};

const startRound = () => {
  round++;
  treasureBonusMemory = [];
  if (deck.length < players.length * round) {
    addAndShuffle();
  }
  for (let i = 0; i < players.length; i++) {
    for (let j = 0; j < round; j++) {
      players[i].receiveCard(deck.splice(0, 1)[0]);
    }
  }
};

const winAndSort = (winnerIndex: number) => {
  if (winnerIndex < 0) {
    sort(winnerIndex + players.length);
  } else {
    players[winnerIndex].win();
    sort(winnerIndex);
  }
};

const toZeroOr = (i: number, strength: number, mustColor: string) => {
  if (tableCards[i].getColor() !== mustColor) {
    if (
      tableCards[i].getColor() === 'green' ||
      tableCards[i].getColor() === 'yellow' ||
      tableCards[i].getColor() === 'purple'
    ) {
      strength = 0;
    }
  }
  if (tableCards.some((card) => card.getColor() === 'tigres')) {
    if (
      tableCards[
        tableCards.findIndex((card) => card.getColor() === 'tigres')
      ].getTigresType() === 'pirates'
    ) {
      strength = 29;
    }
  }
  return strength;
};

const defineMustColor = (mustColor: string) => {
  for (let i = 0; i < tableCards.length; i++) {
    if (mustColor === 'undefined') {
      if (
        tableCards[i].getColor() === 'black' ||
        tableCards[i].getColor() === 'green' ||
        tableCards[i].getColor() === 'yellow' ||
        tableCards[i].getColor() === 'purple'
      ) {
        mustColor = tableCards[i].getColor();
      }
    }
  }
  return mustColor;
};

const batleOnTigresEscape = (winnerIndex: number, mustColor: string) => {
  if (
    tableCards.some((card) => card.getColor() === 'pirates') &&
    tableCards.some((card) => card.getColor() === 'mermaid') &&
    !tableCards.some((card) => card.getColor() === 'skullking')
  ) {
    winnerIndex = tableCards.findIndex((card) => card.getColor() === 'pirates');
  } else {
    for (let i = 1; i < tableCards.length; i++) {
      let a = tableCards[winnerIndex].getStrength();
      let b = tableCards[i].getStrength();
      a = toZeroOr(winnerIndex, a, mustColor);
      b = toZeroOr(i, b, mustColor);

      if (a < b) {
        winnerIndex = i;
      }
    }
  }
  return winnerIndex;
};

export const battle = () => {
  let winnerIndex = 0;
  let mustColor = 'undefined';
  mustColor = defineMustColor(mustColor);
  if (tableCards.some((card) => card.getColor() === 'tigres')) {
    if (
      tableCards[
        tableCards.findIndex((card) => card.getColor() === 'tigres')
      ].getTigresType() === 'pirates'
    ) {
      if (
        tableCards.some((card) => card.getColor() === 'mermaid') &&
        !tableCards.some((card) => card.getColor() === 'skullking')
      ) {
        winnerIndex = tableCards.findIndex(
          (card) => card.getColor() === 'tigres',
        );
      } else {
        for (let i = 1; i < tableCards.length; i++) {
          let a = tableCards[winnerIndex].getStrength();
          let b = tableCards[i].getStrength();
          a = toZeroOr(winnerIndex, a, mustColor);
          b = toZeroOr(i, b, mustColor);

          if (a < b) {
            winnerIndex = i;
          }
        }
      }
    } else {
      winnerIndex = batleOnTigresEscape(winnerIndex, mustColor);
    }
  } else {
    winnerIndex = batleOnTigresEscape(winnerIndex, mustColor);
  }
  if (tableCards.some((card) => card.getColor() === 'kraken')) {
    return winnerIndex - tableCards.length;
  } else {
    return winnerIndex;
  }
};

const check14Bonus = () => {
  let bonus = 0;
  if (
    tableCards.some(
      (card) => card.getColor() === 'black' && card.getStrength() === 14,
    )
  ) {
    bonus += 20;
  }
  if (
    tableCards.some(
      (card) => card.getColor() === 'green' && card.getStrength() === 14,
    )
  ) {
    bonus += 10;
  }
  if (
    tableCards.some(
      (card) => card.getColor() === 'yellow' && card.getStrength() === 14,
    )
  ) {
    bonus += 10;
  }
  if (
    tableCards.some(
      (card) => card.getColor() === 'purple' && card.getStrength() === 14,
    )
  ) {
    bonus += 10;
  }
  return bonus;
};

const checckDefeatBonus = () => {
  if (
    tableCards.some((card) => card.getColor() === 'skullking') &&
    tableCards.some((card) => card.getColor() === 'mermaid')
  ) {
    return 50;
  } else if (
    tableCards.some((card) => card.getColor() === 'pirates') &&
    tableCards.some((card) => card.getColor() === 'skullking') &&
    !tableCards.some((card) => card.getColor() === 'mermaid')
  ) {
    return 30;
  } else {
    return 0;
  }
};

const checkTreasureBonus = (winnerIndex: number) => {
  if (winnerIndex < 0) {
    return;
  }
  for (let i = 0; i < tableCards.length; i++) {
    if (tableCards[i].getColor() === 'treasure') {
      treasureBonusMemory.push([
        players[i].getId(),
        players[winnerIndex].getId(),
      ]);
    }
  }
};

const determineTreasureBonus = () => {
  for (let i = 0; i < treasureBonusMemory.length; i++) {
    const fIndex = players.findIndex(
      (player) => player.getId() === treasureBonusMemory[i][0],
    );
    const tIndex = players.findIndex(
      (player) => player.getId() === treasureBonusMemory[i][1],
    );
    if (
      players[fIndex].getVictory() === players[fIndex].getPrediction() &&
      players[tIndex].getVictory() === players[tIndex].getPrediction()
    ) {
      players[fIndex].plusBonus(20);
      players[tIndex].plusBonus(20);
    }
  }
};

const calcScore = () => {
  const resultPlayers: Player[] = [];
  for (let i = 0; i < players.length; i++) {
    if (players[i].getPrediction() === 0) {
      if (players[i].getPrediction() !== players[i].getVictory()) {
        players[i].writeScore(-10 * round);
      } else {
        players[i].writeScore(10 * round + players[i].getBonus());
      }
    } else {
      if (players[i].getPrediction() !== players[i].getVictory()) {
        players[i].writeScore(
          -10 * Math.abs(players[i].getPrediction() - players[i].getVictory()),
        );
      } else {
        players[i].writeScore(
          20 * players[i].getPrediction() + players[i].getBonus(),
        );
      }
    }
    resultPlayers.push(players[i].clone());
    players[i].resetPlaying();
  }
  return resultPlayers.map((p) => p.infoJson());
};
