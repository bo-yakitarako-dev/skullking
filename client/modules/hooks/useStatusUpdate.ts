import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  GameStatus,
  predictSliderState,
  roundOverSliderState,
  startSliderState,
} from '../state';

export const useStatusUpdate = () => {
  const setStartSlider = useSetRecoilState(startSliderState);
  const setPredictionSlider = useSetRecoilState(predictSliderState);
  const setRoundOverSlider = useSetRecoilState(roundOverSliderState);

  const updateByStatus = useCallback(
    (gameStatus: GameStatus) => {
      switch (gameStatus) {
        case 'start':
          setStartSlider(true);
          break;
        case 'predicted':
          setPredictionSlider(true);
          break;
        case 'predicting':
          setRoundOverSlider(true);
          break;
      }
    },
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );

  return updateByStatus;
};
