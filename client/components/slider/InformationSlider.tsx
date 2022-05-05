import { Flex } from '@chakra-ui/layout';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type Props = {
  startFadeIn: boolean;
  setStartFadeIn: Dispatch<SetStateAction<boolean>>;
  onDisplay: () => void;
  displayTime?: number;
};

const InformationSlider: React.FC<Props> = ({
  children,
  startFadeIn,
  setStartFadeIn,
  onDisplay,
  displayTime = 4000,
}) => {
  const [positionX, setPositionX] = useState('-100%');
  const [canAnimate, setCanAnimate] = useState(true);

  useEffect(() => {
    if (startFadeIn) {
      setStartFadeIn(false);
      setPositionX('0');
      setTimeout(() => {
        onDisplay();
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
  }, [startFadeIn, onDisplay, displayTime, setStartFadeIn]);

  return (
    <Flex
      position="fixed"
      backgroundColor="gray.900"
      width="100vw"
      height="100vh"
      justifyContent="center"
      alignItems="center"
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
    </Flex>
  );
};

export { InformationSlider };
