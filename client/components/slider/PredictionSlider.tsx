import { Flex, StackDivider, Text, VStack } from '@chakra-ui/layout';
import { useRecoilValue } from 'recoil';
import {
  playerIdState,
  playersState,
  predictSliderState,
} from '../../modules/state';
import { InformationSlider } from './InformationSlider';

const PredictionSlider: React.FC = () => {
  const ownId = useRecoilValue(playerIdState);
  const players = useRecoilValue(playersState);
  return (
    <InformationSlider state={predictSliderState} redirectPath="/playing">
      <Text color="white" fontSize="4xl" fontWeight="bold" marginBottom={4}>
        みんなの予想！
      </Text>
      <VStack
        divider={<StackDivider borderColor="gray.400" />}
        border="1px solid white"
        padding="6"
        borderRadius="16"
        fontSize="xl"
      >
        {players.map(({ playerId, name, prediction }) => (
          <Flex
            key={playerId}
            color={playerId === ownId ? 'green.300' : 'white'}
            width="100%"
          >
            <Text flexGrow={1}>{name}</Text>
            <Text marginLeft={6}>{prediction}</Text>
          </Flex>
        ))}
      </VStack>
    </InformationSlider>
  );
};

export { PredictionSlider };
