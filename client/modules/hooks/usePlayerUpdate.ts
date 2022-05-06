import { useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  gameStatusState,
  Player,
  playersState,
  predictSliderState,
} from '../state';

export const usePlayerUpdate = () => {
  const currentPlayers = useRecoilValue(playersState);
  const gameStatus = useRecoilValue(gameStatusState);
  const setPredictionSlider = useSetRecoilState(predictSliderState);

  const updateByPlayers = useCallback(
    (updatedPlayers: Player[]) => {
      if (gameStatus === 'ready') {
        return;
      }
      const hasNoPrediction = currentPlayers.some((p) => p.prediction < 0);
      const donePrediction = updatedPlayers.every((p) => p.prediction >= 0);
      if (hasNoPrediction && donePrediction) {
        setPredictionSlider(true);
      }
    },
    [currentPlayers, gameStatus], // eslint-disable-line react-hooks/exhaustive-deps
  );

  return updateByPlayers;
};
