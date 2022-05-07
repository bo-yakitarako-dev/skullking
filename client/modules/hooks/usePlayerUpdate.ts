import { useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  gameStatusState,
  Player,
  playersState,
  predictSliderState,
} from '../state';

export const usePlayerUpdate = () => {
  const gameStatus = useRecoilValue(gameStatusState);
  const currentPlayers = useRecoilValue(playersState);
  const setPredictionSlider = useSetRecoilState(predictSliderState);

  const updateByPlayers = useCallback(
    (updatedPlayers: Player[]) => {
      if (currentPlayers.length === 0 || updatedPlayers.length === 0) {
        return;
      }
      switch (gameStatus) {
        case 'predicting':
          const hasNoPrediction = currentPlayers.some((p) => p.prediction < 0);
          const donePrediction = updatedPlayers.every((p) => p.prediction >= 0);
          if (hasNoPrediction && donePrediction) {
            setPredictionSlider(true);
          }
          break;
      }
    },
    [currentPlayers], // eslint-disable-line react-hooks/exhaustive-deps
  );

  return updateByPlayers;
};
