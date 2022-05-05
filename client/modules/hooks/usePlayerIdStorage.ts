import { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { nameState, playerIdState, playersState } from '../state';

export const usePlayerIdStorage = () => {
  const playerId = useRecoilValue(playerIdState);
  const players = useRecoilValue(playersState);
  const [name, setName] = useRecoilState(nameState);

  useEffect(() => {
    const player = players.find((p) => p.playerId === playerId);
    if (player !== undefined && name === '') {
      setName(player.name);
    }
  }, [players, playerId, name, setName]);
};
