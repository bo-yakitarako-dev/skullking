import { Button } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import { Box, Text } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/react';
import { keyframes } from '@chakra-ui/system';
import { useBreakpointValue } from '@chakra-ui/media-query';
import { NameBox } from './NameBox';
import { useRecoilValue } from 'recoil';
import { playerCountSelector } from '../../modules/state';

const setCrowdyKeyframe = (rotate: number) => `
  0%, 100% {
    transform: translateY(5px) rotate(${rotate}deg);
  }
  50% {
    transform: translateY(-5px) rotate(${rotate}deg);
  }
`;

const Start: React.FC = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const playerCount = useRecoilValue(playerCountSelector);
  const canStart = playerCount >= 2 && playerCount <= 6;
  return (
    <Box
      backgroundColor="gray.900"
      width="100%"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box width="fit-content" position="relative" textAlign="center">
        <Image
          alt="海賊男"
          src="/images/start/kaizoku_man.png"
          position="absolute"
          top={{ base: 8, sm: 6, md: 0 }}
          width={{ base: 20, sm: 24, md: 28 }}
          zIndex={1}
          animation={`${keyframes(setCrowdyKeyframe(-10))} 3s infinite`}
        />
        <Image
          alt="海賊女"
          src="/images/start/kaizoku_woman.png"
          position="absolute"
          top={{ base: 8, sm: 6, md: 0 }}
          width={{ base: 20, sm: 24, md: 28 }}
          zIndex={1}
          animation={`${keyframes(setCrowdyKeyframe(10))} 3s infinite`}
          right="0"
        />
        <Text
          position="relative"
          color="white"
          fontSize={{ base: '5xl', md: '7xl' }}
          paddingX={{ base: 20, sm: 28 }}
          zIndex={10}
        >
          {isMobile ? (
            <>
              すかる
              <br />
              きんぐ
            </>
          ) : (
            <>すかるきんぐ</>
          )}
        </Text>
        <Tooltip
          label="2人以上いないと始められないよ><"
          hasArrow
          bg="red.600"
          isDisabled={canStart}
          fontFamily="'Hachi Maru Pop', cursive"
        >
          <Box width="fit-content" marginX="auto" marginY="8">
            <Button width="64" size="lg" fontSize="xl" disabled={!canStart}>
              はじめる
            </Button>
          </Box>
        </Tooltip>
        <NameBox />
      </Box>
    </Box>
  );
};

export { Start };
