import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { post } from '../../../modules/http';

export const useActions = () => {
  const router = useRouter();

  const goToTitle = useCallback(() => {
    router.replace('/');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const restart = useCallback(() => {
    post('/api/startGame');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { goToTitle, restart };
};
