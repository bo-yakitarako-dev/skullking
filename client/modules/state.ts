import { atom, selector } from 'recoil';

export const playerIdState = atom({
  key: 'playerIdState',
  default: 0,
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
