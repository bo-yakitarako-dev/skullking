import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { GameStatus, predictSliderState, startSliderState } from '../state';

export const useStatusUpdate = () => {
  const setStartSlider = useSetRecoilState(startSliderState);
  const setPredictionSlider = useSetRecoilState(predictSliderState);

  const updateByStatus = useCallback(
    (gameStatus: GameStatus) => {
      switch (gameStatus) {
        case 'start':
          setStartSlider(true);
          break;
        case 'predicted':
          setPredictionSlider(true);
          break;
      }
    },
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );

  return updateByStatus;
};
