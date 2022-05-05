import { Grid, GridItem, Text } from '@chakra-ui/layout';
import { useRecoilValue } from 'recoil';
import { playerSelector } from '../../modules/state';
import { Card } from '../common/Card';

const HandList: React.FC = () => {
  const player = useRecoilValue(playerSelector);
  const hands = player?.hand ?? [];
  const repeat = hands.length <= 5 ? hands.length : 5;
  return (
    <Grid
      position="relative"
      templateColumns={`repeat(${repeat}, 1fr)`}
      gap={4}
      border="1px solid white"
      padding="8"
      borderRadius="16"
    >
      <Text
        color="white"
        position="absolute"
        left="50%"
        transform="translate(-50%, -30px)"
        fontSize="3xl"
        paddingX="16px"
        backgroundColor="gray.900"
        whiteSpace="nowrap"
      >
        手札
      </Text>
      {hands.map((card) => (
        <GridItem key={card.cardId}>
          <Card card={card} />
        </GridItem>
      ))}
    </Grid>
  );
};

export { HandList };
