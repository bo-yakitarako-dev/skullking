import { Response } from 'express';
import type { PostReq, Socket, SocketIO } from '../index';
import { Player } from './Player';

export let players: Player[] = [];
export let state: 0 | 1 = 0;

export const createRegistryFunction = (io: SocketIO) => {
  const createPlayer = (req: PostReq<{ name: string }>, res: Response) => {
    const playerId = players.length + 1;
    const addedPlayer = new Player(playerId, req.body.name);
    players = [...players, addedPlayer];
    io.emit('startPlayers', [...players.map((p) => p.createTitleJson())]);
    res.json({ ok: true, playerId });
  };

  const rename = (
    req: PostReq<{ playerId: number; name: string }>,
    res: Response,
  ) => {
    const { playerId, name } = req.body;
    const player = players.find((player) => player.isPlayerId(playerId));
    if (player === undefined) {
      res
        .status(400)
        .json({ ok: false, message: 'そのIDのプレイヤーはおらんのじゃ' });
      return;
    }
    player.rename(name);
    io.emit('startPlayers', [...players.map((p) => p.createTitleJson())]);
    res.json({ ok: true, name });
  };

  const sendStartPlayers = (socket: Socket) => {
    socket.emit('startPlayers', [...players.map((p) => p.createTitleJson())]);
  };

  const startGame = () => {
    state = 1;
    io.emit('startGame');
  };

  const finishGame = () => {
    state = 0;
    io.emit('finishGame');
  };

  return { createPlayer, rename, sendStartPlayers, startGame, finishGame };
};
