import { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { playerSelector } from '../../../modules/state';

export const usePredictForm = () => {
  const [count, setCount] = useState(0);
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
    console.log('count:', count);
  }, [count]); // eslint-disable-line react-hooks/exhaustive-deps

  return { count, onChangeCount, onSubmit, prediction };
};
