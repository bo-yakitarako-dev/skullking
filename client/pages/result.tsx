import { Text, VStack } from '@chakra-ui/layout';
import { Actions } from '../components/result/Actions';
import { Ranking } from '../components/result/Ranking';

const Result: React.FC = () => {
  return (
    <VStack minHeight="100vh" justifyContent="center">
      <Text color="white" fontSize="20px" marginBottom="4">
        今回の結果は...
      </Text>
      <Ranking />
      <Actions />
    </VStack>
  );
};

export default Result;
