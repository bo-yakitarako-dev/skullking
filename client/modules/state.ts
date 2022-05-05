import { atom, selector } from 'recoil';
import { CardType } from '../components/common/Card';

let defaultPlayerId = 0;

if (typeof window !== 'undefined' && localStorage.playerId) {
  defaultPlayerId = Number(localStorage.playerId);
}

export const playerIdState = atom({
  key: 'playerIdState',
  default: defaultPlayerId,
});

export const nameState = atom({
  key: 'nameState',
  default: '',
});

export const playerCountSelector = selector({
  key: 'playerCountSelector',
  get: ({ get }) => {
    const { length } = get(playersState);
    return length;
  },
});

export type Player = {
  playerId: number;
  name: string;
  prediction: number;
  victory: number;
  hand: CardType[];
  scores: number[];
};

export const playersState = atom({
  key: 'playersState',
  default: [] as Player[],
});

export const playerSelector = selector({
  key: 'playerSelector',
  get: ({ get }) => {
    const players = get(playersState);
    const playerId = get(playerIdState);
    return players.find((player) => player.playerId === playerId) ?? null;
  },
});

type GameStatus = 'ready' | 'playing';
export const gameStatusState = atom({
  key: 'gameStatusState',
  default: 'ready' as GameStatus,
});
