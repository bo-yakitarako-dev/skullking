import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import {
  gameStatusState,
  playerIdState,
  playersState,
} from '../../../modules/state';

export const useCanStart = () => {
  const ownId = useRecoilValue(playerIdState);
  const players = useRecoilValue(playersState);
  const status = useRecoilValue(gameStatusState);

  const errorMessage = useMemo(() => {
    if (status !== 'ready') {
      return 'ゲーム中だからはじめられないよ><';
    }
    if (players.length === 0) {
      return 'プレイヤーがいないよー><';
    }
    if (players[0].playerId !== ownId) {
      return '最初の人しかはじめられないよ><';
    }
    const playerCount = players.length;
    if (playerCount < 2) {
      return '2人以上いないと始められないよ><';
    }
    return '';
  }, [ownId, players, status]);

  const canStart = errorMessage === '';

  return { errorMessage, canStart };
};
