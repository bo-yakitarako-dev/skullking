import { atom, selector } from 'recoil';
import { CardType } from '../components/common/Card';
import { testCards } from '../debug/cards';
import { testPlayers } from '../debug/players';

let defaultPlayerId = 2;

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
  default: [...testPlayers],
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

export const startSliderState = atom({
  key: 'startSliderState',
  default: false,
});

export const predictSliderState = atom({
  key: 'predictSliderState',
  default: false,
});

export const tableCardsState = atom({
  key: 'tableCardsState',
  default: [testCards[6]] as CardType[],
});

export const turnPlayerSelector = selector({
  key: 'turnPlayerSelector',
  get: ({ get }) => {
    const players = get(playersState);
    const cardCount = get(tableCardsState).length;
    if (cardCount >= players.length || players.length === 0) {
      return null;
    }
    return players[cardCount];
  },
});
