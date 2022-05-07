import { Flex } from '@chakra-ui/layout';
import { Hand } from '../components/playing/Hand';
import { GameTable } from '../components/playing/GameTable';

const Playing: React.FC = () => {
  return (
    <Flex minHeight="100vh" justifyContent="center" alignItems="center">
      <GameTable />
      <Hand />
    </Flex>
  );
};

export default Playing;
