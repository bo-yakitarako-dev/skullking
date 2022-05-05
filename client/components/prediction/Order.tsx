import { Box, StackDivider, Text, VStack } from '@chakra-ui/layout';
import { useRecoilValue } from 'recoil';
import { playerIdState, playersState } from '../../modules/state';

const Order: React.FC = () => {
  const ownId = useRecoilValue(playerIdState);
  const players = useRecoilValue(playersState);
  return (
    <Box position="relative">
      <Text
        color="white"
        position="absolute"
        left="50%"
        transform="translate(-50%, -28px)"
        fontSize="3xl"
        paddingX="16px"
        backgroundColor="gray.900"
        whiteSpace="nowrap"
      >
        順番
      </Text>
      <VStack
        divider={<StackDivider borderColor="gray.400" />}
        border="1px solid white"
        padding="6"
        borderRadius="16"
      >
        {players.map(({ playerId, name }, index) => (
          <Box
            key={playerId}
            color={playerId === ownId ? 'green.300' : 'white'}
            width="100%"
          >
            <Text width="24px" display="inline-block">
              {index + 1}
            </Text>
            <Text as="span">{name}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export { Order };
