import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { nameState, playerIdState, startPlayersState } from '../state';

export const useSessionPlayer = (playerId: number) => {
  const players = useRecoilValue(startPlayersState);
  const setPlayerId = useSetRecoilState(playerIdState);
  const setPlayerName = useSetRecoilState(nameState);

  useEffect(() => {
    if (players.length === 0) {
      return;
    }
    console.log('ばか');
    setPlayerId(playerId);
    console.log('あほ');
    console.log(players);
    const player = players.find((p) => p.playerId === playerId);
    if (player === undefined) {
      return;
    }
    setPlayerName(player.name);
    console.log('くず');
  }, [players, playerId, setPlayerId, setPlayerName]);
};
