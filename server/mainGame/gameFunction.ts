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

let mustColor = 'undefined';

type State =
  | 'ready'
  | 'start'
  | 'predicting'
  | 'predicted'
  | 'playing'
  | 'result';
export let state: State = 'ready';
export let round = 0;

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
    io.emit('finishGame');
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

  const useCard = (
    req: PostReq<{ playerId: number; cardId: number }>,
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
    tableCards.push(card);
    if (
      mustColor === 'undefined' &&
      card.getColor() === ('black' || 'green' || 'yellow' || 'purple')
    ) {
      mustColor = card.getColor();
    }

    let sendedPlayers = false;
    if (tableCards.length === players.length) {
      const winnerIndex = battle();
      io.emit('winner', players[winnerIndex].infoJson());
      winAndSort(winnerIndex);
      discardTheCards();
      mustColor = 'undefined';
      if (players[players.length - 1].getHand().length === 0) {
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
    }
    if (!sendedPlayers) {
      sendInfo();
    }
    io.emit('gameStatus', state);
    io.emit('tableCards', [...tableCards.map((p) => p.convertJson())]);
    io.emit('mustColor', mustColor);
    res.json({ ok: true });
  };

  return { sendInfo, startGame, finishGame, predict, useCard };
};

const startRound = () => {
  round++;
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

const battle = () => {
  let winnerIndex = 0;
  if (
    tableCards.some((card) => card.getColor() === 'pirates') &&
    tableCards.some((card) => card.getColor() === 'mermaid') &&
    !tableCards.some((card) => card.getColor() === 'skullking')
  ) {
    winnerIndex = tableCards.findIndex((card) => card.getColor() === 'pirates');
  } else {
    for (let i = 1; i < players.length; i++) {
      let a = tableCards[winnerIndex].getStrength();
      let b = tableCards[i].getStrength();
      if (tableCards[winnerIndex].getColor() !== mustColor) {
        a = 0;
      }
      if (tableCards[i].getColor() !== mustColor) {
        b = 0;
      }
      if (a < b) {
        winnerIndex = i;
      }
    }
  }

  if (tableCards.some((card) => card.getColor() === 'kraken')) {
    return winnerIndex - players.length;
  } else {
    return winnerIndex;
  }
};

const calcScore = () => {
  const resultPlayers: Player[] = [];
  for (let i = 0; i < players.length; i++) {
    if (players[i].getPrediction() === 0) {
      if (players[i].getPrediction() !== players[i].getVictory()) {
        players[i].writeScore(-10 * round);
      } else {
        players[i].writeScore(10 * round);
      }
    } else {
      if (players[i].getPrediction() !== players[i].getVictory()) {
        players[i].writeScore(
          -10 * Math.abs(players[i].getPrediction() - players[i].getVictory()),
        );
      } else {
        players[i].writeScore(20 * players[i].getPrediction());
      }
    }
    resultPlayers.push(players[i].clone());
    players[i].resetPlaying();
  }
  return resultPlayers.map((p) => p.infoJson());
};
