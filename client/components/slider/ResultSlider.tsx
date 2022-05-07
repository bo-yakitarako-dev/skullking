import { Text } from '@chakra-ui/layout';
import { resultSliderState } from '../../modules/state';
import { InformationSlider } from './InformationSlider';

const ResultSlider: React.FC = () => {
  return (
    <InformationSlider
      state={resultSliderState}
      redirectPath="/result"
      displayTime={2000}
    >
      <Text color="white" fontSize="4xl">
        けっかはっぴょぉぉぉ～～～
      </Text>
    </InformationSlider>
  );
};

export { ResultSlider };
