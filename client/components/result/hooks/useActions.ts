import { useRouter } from 'next/router';
import { useCallback } from 'react';

export const useActions = () => {
  const router = useRouter();

  const goToTitle = useCallback(() => {
    router.replace('/');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { goToTitle };
};
