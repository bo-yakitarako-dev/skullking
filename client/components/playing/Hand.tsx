import { Wrap, WrapItem } from '@chakra-ui/layout';
import { useRecoilValue } from 'recoil';
import { playerSelector } from '../../modules/state';
import { Card } from '../common/Card';
import { useHand } from './hooks/useHand';

const Hand: React.FC = () => {
  const player = useRecoilValue(playerSelector);

  const { isValid, onClickCard } = useHand();

  if (player === null) {
    return null;
  }
  const { hand } = player;
  return (
    <Wrap spacing="8px" align="center" position="fixed" bottom={4}>
      {hand.map((card) => (
        <WrapItem key={card.cardId}>
          <Card
            card={card}
            invalid={!isValid(card)}
            onClick={onClickCard(card)}
          />
        </WrapItem>
      ))}
    </Wrap>
  );
};

export { Hand };
