import { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { post } from '../../../modules/http';
import { playerIdState, playerSelector } from '../../../modules/state';

export const usePredictForm = () => {
  const [count, setCount] = useState(0);
  const playerId = useRecoilValue(playerIdState);
  const player = useRecoilValue(playerSelector);
  const prediction = player?.prediction ?? 0;

  const onChangeCount = useCallback(
    (valueAsString: string, valueAsNumber: number) => {
      const value = Number.isNaN(valueAsNumber) ? 0 : valueAsNumber;
      setCount(value);
    },
    [],
  );

  const onSubmit = useCallback(() => {
    const params = { playerId, prediction: count };
    post('/api/predict', params);
  }, [playerId, count]); // eslint-disable-line react-hooks/exhaustive-deps

  return { count, onChangeCount, onSubmit, prediction };
};
