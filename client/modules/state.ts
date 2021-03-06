import { atom, selector } from 'recoil';
import { CardType } from '../components/common/Card';
import { getCurrentColor } from '../components/playing/hooks/useHand';

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

export type GameStatus =
  | 'ready'
  | 'start'
  | 'predicting'
  | 'predicted'
  | 'playing'
  | 'result';
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

export const roundOverSliderState = atom({
  key: 'roundOverSliderState',
  default: false,
});

export const resultSliderState = atom({
  key: 'resultSliderState',
  default: false,
});

export const roundState = atom({
  key: 'roundState',
  default: 0,
});

export const tableCardsState = atom({
  key: 'tableCardsState',
  default: [] as CardType[],
});

export const includeColorInHandSelector = selector({
  key: 'includeColorInHandSelector',
  get: ({ get }) => {
    const player = get(playerSelector);
    if (player === null) {
      return false;
    }
    const tableCards = get(tableCardsState);
    const currentColor = getCurrentColor(tableCards);
    return player.hand.some(({ color }) => color === currentColor);
  },
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

export const tigresCardIdState = atom({
  key: 'tigresCardIdState',
  default: 0,
});

export const roundOverPlayersState = atom({
  key: 'roundOverPlayersState',
  default: [] as Player[],
});
