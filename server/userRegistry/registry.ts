import { Response } from 'express';
import type { PostReq, Socket, SocketIO } from '../index';
import { Player } from './Player';

export let players: Player[] = [];

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

  return { createPlayer, rename, sendStartPlayers };
};

export const sort = (i: number) => {
  const id = players[i].getId();
  while (players[0].getId() !== id) {
    players.push(players.splice(0, 1)[0]);
  }
};

export const resetRegistry = () => {
  players = [];
};
