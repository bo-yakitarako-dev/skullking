import { Text } from '@chakra-ui/layout';
import { useRecoilValue } from 'recoil';
import { roundOverSliderState, roundState } from '../../modules/state';
import { Information } from '../playing/Information';
import { InformationSlider } from './InformationSlider';

const RoundOverSlider: React.FC = () => {
  const round = useRecoilValue(roundState);
  return (
    <InformationSlider
      state={roundOverSliderState}
      redirectPath="/predict"
      displayTime={6000}
    >
      <Text fontSize="2xl" fontWeight="bold" color="white" marginBottom="4">
        第{round - 1}らうんどの結果！
      </Text>
      <Information />
      <Text fontSize="xl" color="white" marginTop="4">
        第{round}らうんどの予想していこうね
      </Text>
    </InformationSlider>
  );
};

export { RoundOverSlider };
