import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { nameState, playerIdState, startPlayersState } from '../state';

export const usePlayerIdStorage = () => {
  const playerId = useRecoilValue(playerIdState);
  const players = useRecoilValue(startPlayersState);
  const setName = useSetRecoilState(nameState);

  useEffect(() => {
    const player = players.find((p) => p.playerId === playerId);
    if (player !== undefined) {
      setName(player.name);
    }
  }, [players, playerId, setName]);
};
