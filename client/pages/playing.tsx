import { Flex, Text } from '@chakra-ui/layout';
import { Hand } from '../components/playing/Hand';

const Playing: React.FC = () => {
  return (
    <Flex minHeight="100vh" justifyContent="center" alignItems="center">
      <Text color="white">
        はじまると思った？残念！はじまりませぇ～～～んｗｗｗ
      </Text>
      <Hand />
    </Flex>
  );
};

export default Playing;
