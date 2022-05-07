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
import { Card } from '../cardDealing/card';
let mustColor = 'undefined';

type State = 'ready' | 'playing';
export let state: State = 'ready';
let round = 0;

export const gameFunction = (io: SocketIO) => {
  const sendInfo = () => {
    io.emit('playerInfo', [...players.map((p) => p.infoJson())]);
  };

  const startGame = () => {
    state = 'playing';
    shuffle(deck);
    startRound();
    sendInfo();
    io.emit('startRound', round);
  };

  const finishGame = () => {
    state = 'ready';
    round = 0;
    resetRegistry();
    addAndShuffle();
    io.emit('finishGame');
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
    res.json({ ok: true });
  };

  const useCard = (
    req: PostReq<{ playerId: number; cardId: number }>,
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
    const card: Card = player.useCard(req.body.cardId);
    tableCards.push(card);
    if (
      mustColor === 'undefined' &&
      card.getColor() === ('black' || 'green' || 'yellow' || 'purple')
    ) {
      mustColor = card.getColor();
    }

    if (tableCards.length === players.length) {
      const winnerIndex = battle();
      io.emit('winnerIndex', winnerIndex);
      if (winnerIndex < 0) {
        sort(winnerIndex + players.length);
      } else {
        players[winnerIndex].win();
        sort(winnerIndex);
      }
      discardTheCards();
      mustColor = 'undefined';
      if (players[players.length].getHand().length === 0) {
        calcScore();
        if (round === 10) {
          finishGame();
        } else {
          startRound();
          io.emit('startRound', round);
        }
      }
    }
    sendInfo();
    io.emit('tableCards', [...tableCards.map((p) => p.convertJson())]);
    io.emit('mustColor', mustColor);
  };

  return { startGame, finishGame, predict, useCard };
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

const battle = () => {
  //green,purple,yellowはMCでなければ0
  //blackは+14
  let winnerIndex = 0;
  if (
    tableCards.some((card) => card.getColor() === 'pirates') &&
    tableCards.some((card) => card.getColor() === 'mermaid') &&
    !tableCards.some((card) => card.getColor() === 'skullking')
  ) {
    winnerIndex = tableCards.findIndex(
      (card) => card.getColor() === 'skullking',
    );
  } else {
    for (let i = 1; i < players.length; i++) {
      const a = tableCards[winnerIndex].getStrength();
      const b = tableCards[i].getStrength();
    }
  }

  if (tableCards.some((card) => card.getColor() === 'kraken')) {
    return winnerIndex - players.length;
  } else {
    return winnerIndex;
  }
};

const calcScore = () => {
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
    players[i].reset();
  }
};
