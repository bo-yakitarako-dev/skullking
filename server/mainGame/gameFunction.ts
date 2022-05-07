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

//type MustColor = 'undefined' | 'black' | 'green' | 'yellow' | 'purple';

type State =
  | 'ready'
  | 'start'
  | 'predicting'
  | 'predicted'
  | 'playing'
  | 'finish';
export let state: State = 'ready';
export let round = 0;

export const gameFunction = (io: SocketIO) => {
  const sendInfo = () => {
    io.emit('playerInfo', [...players.map((p) => p.infoJson())]);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const startGame = (req: any, res: Response) => {
    state = 'start';
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
    tableCards.push(player.useCard(req.body.cardId));

    if (tableCards.length === players.length) {
      const winnerIndex = battle();
      io.emit('winner', players[winnerIndex].infoJson());
      players[winnerIndex].win();
      sort(winnerIndex);
      discardTheCards();
      if (players[players.length - 1].getHand().length === 0) {
        calcScore();
        if (round === 10) {
          finishGame(req, res);
          state = 'finish';
        } else {
          startRound();
          state = 'predicting';
          io.emit('startRound', round);
        }
      }
      io.emit('gameStatus', state);
    }
    sendInfo();
    io.emit('tableCards', [...tableCards.map((p) => p.convertJson())]);
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

const battle = () => {
  //const mustColor: MustColor = 'undefined';
  return 1;
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
