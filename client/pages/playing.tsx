import { Flex, Text, VStack } from '@chakra-ui/layout';
import { Hand } from '../components/playing/Hand';
import { GameTable } from '../components/playing/GameTable';
import { useRecoilValue } from 'recoil';
import { roundState } from '../modules/state';
import { Information } from '../components/playing/Information';

const Playing: React.FC = () => {
  const round = useRecoilValue(roundState);
  return (
    <VStack minHeight="100vh" justifyContent="center">
      <Text
        position="absolute"
        color="white"
        fontWeight="bold"
        fontSize="4xl"
        marginBottom="4"
        top="32px"
      >
        第{round}らうんど！勝負だ！
      </Text>
      <Flex gridGap="4" alignItems="flex-start">
        <GameTable />
        <Information />
      </Flex>
      <Hand />
    </VStack>
  );
};

export default Playing;
