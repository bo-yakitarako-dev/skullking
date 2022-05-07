import { Box, Flex, StackDivider, Text, VStack } from '@chakra-ui/layout';
import { useRecoilValue } from 'recoil';
import { playerIdState, playersState } from '../../modules/state';

const Ranking: React.FC = () => {
  const players = useRecoilValue(playersState);
  const ownId = useRecoilValue(playerIdState);
  const results = players
    .map(({ playerId, name, scores }) => {
      const total = scores.reduce((acc, curr) => acc + curr, 0);
      return { playerId, name, scores, total };
    })
    .sort((a, b) => b.total - a.total);
  return (
    <VStack
      divider={<StackDivider borderColor="gray.400" />}
      align="left"
      padding="8"
      border="1px solid white"
      borderRadius="16px"
    >
      {results.map(({ playerId, name, total }, index) => (
        <Flex
          key={playerId}
          color={playerId === ownId ? 'green.300' : 'white'}
          fontSize="24px"
        >
          <Box flexGrow={1}>
            <Text display="inline-block" w={16}>
              {index + 1}位
            </Text>
            <Text display="inline-block">{name}</Text>
          </Box>
          <Text paddingLeft="4">
            {total > 0 ? '+' : ''}
            {total}点
          </Text>
        </Flex>
      ))}
    </VStack>
  );
};

export { Ranking };
