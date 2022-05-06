import { Text } from '@chakra-ui/layout';
import { startSliderState } from '../../modules/state';
import { InformationSlider } from './InformationSlider';

const StartSlider: React.FC = () => {
  return (
    <InformationSlider
      state={startSliderState}
      redirectPath="/predict"
      displayTime={2000}
      push
    >
      <Text color="white" fontSize="4xl">
        はじまるよ！
      </Text>
    </InformationSlider>
  );
};

export { StartSlider };
