import { VStack } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { RecoilState, useRecoilState } from 'recoil';

type Props = {
  state: RecoilState<boolean>;
  redirectPath?: string;
  displayTime?: number;
  push?: boolean;
};

const InformationSlider: React.FC<Props> = ({
  children,
  state,
  redirectPath = '/',
  displayTime = 4000,
  push = false,
}) => {
  const [positionX, setPositionX] = useState('-100%');
  const [canAnimate, setCanAnimate] = useState(true);
  const [startFadeIn, setStartFadeIn] = useRecoilState(state);
  const router = useRouter();

  useEffect(() => {
    if (startFadeIn) {
      setStartFadeIn(false);
      setPositionX('0');
      setTimeout(() => {
        if (push) {
          router.push(redirectPath);
        } else {
          router.replace(redirectPath);
        }
        setTimeout(() => {
          setPositionX('100%');
          setTimeout(() => {
            setCanAnimate(false);
            setPositionX('-100%');
            setTimeout(() => {
              setCanAnimate(true);
            }, 2000);
          }, 2000);
        }, displayTime);
      }, 2000);
    }
  }, [startFadeIn, setStartFadeIn, router, redirectPath, displayTime, push]);

  return (
    <VStack
      position="fixed"
      backgroundColor="gray.900"
      width="100vw"
      height="100vh"
      justifyContent="center"
      transitionDuration={canAnimate ? '1.0s' : '0s'}
      transitionProperty="left"
      left={positionX}
      top="0"
      boxSizing="border-box"
      border="16px solid"
      borderColor="gray.300"
      borderRadius="36px"
      zIndex={10000}
    >
      {children}
    </VStack>
  );
};

export { InformationSlider };
