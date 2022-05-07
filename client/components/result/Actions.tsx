import { Button } from '@chakra-ui/button';
import { Flex } from '@chakra-ui/layout';
import { useActions } from './hooks/useActions';

const Actions: React.FC = () => {
  const { goToTitle, restart } = useActions();
  return (
    <Flex gridGap="4" paddingTop="4">
      <Button onClick={restart}>もっかいやる</Button>
      <Button onClick={goToTitle}>たいとるに戻る</Button>
    </Flex>
  );
};

export { Actions };
