import { Flex } from '@chakra-ui/layout';
import { useRecoilValue } from 'recoil';
import { playersState, tableCardsState } from '../../modules/state';
import { Card } from '../common/Card';

const GameTable: React.FC = () => {
  const players = useRecoilValue(playersState);
  const tableCards = useRecoilValue(tableCardsState);
  return (
    <Flex border="1px solid white" padding="8" borderRadius="16" gridGap="2">
      {players.map(({ playerId, name }, index) =>
        tableCards.length > index ? (
          <Card key={playerId} card={tableCards[index]} />
        ) : (
          <Flex
            key={playerId}
            width="90px"
            height="140px"
            border="2px dotted white"
            borderRadius="16px"
            padding="16px"
            align="center"
            justify="center"
            color="white"
            fontSize="md"
          >
            {name}
          </Flex>
        ),
      )}
    </Flex>
  );
};

export { GameTable };
