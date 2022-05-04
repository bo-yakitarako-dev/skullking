import { atom, selector } from 'recoil';

const defaultPlayerId = 0;

export const playerIdState = atom({
  key: 'playerIdState',
  default: defaultPlayerId,
});

export const nameState = atom({
  key: 'nameState',
  default: '',
});

export type StartPlayer = { playerId: number; name: string };

export const startPlayersState = atom({
  key: 'startPlayersState',
  default: [] as StartPlayer[],
});

export const playerCountSelector = selector({
  key: 'playerCountSelector',
  get: ({ get }) => {
    const { length } = get(startPlayersState);
    return length;
  },
});
