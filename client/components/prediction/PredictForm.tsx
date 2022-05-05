import { Flex } from '@chakra-ui/layout';
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Text,
} from '@chakra-ui/react';
import { usePredictForm } from './hooks/usePredictForm';

const PredictForm: React.FC = () => {
  const { count, onChangeCount, onSubmit, prediction } = usePredictForm();
  if (prediction >= 0) {
    return (
      <Text color="white" fontSize="20px" paddingTop={8}>
        {message(prediction)}
        <br />
        みんなが予想終わるまでちょい待ちね
      </Text>
    );
  }
  return (
    <Flex paddingTop={8}>
      <NumberInput
        borderRadius={10}
        width="160px"
        value={count}
        min={0}
        max={10}
        onChange={onChangeCount}
        onKeyPress={(e) => {
          e.preventDefault();
          if (e.key === 'Enter') {
            onSubmit();
          }
        }}
      >
        <NumberInputField color="white" fontFamily="Halvetica, sans-serif" />
        <NumberInputStepper>
          <NumberIncrementStepper color="white" />
          <NumberDecrementStepper color="white" />
        </NumberInputStepper>
      </NumberInput>
      <Button marginLeft={4} onClick={onSubmit}>
        予想送信！
      </Button>
    </Flex>
  );
};

export { PredictForm };

const message = (prediction: number) => {
  if (prediction <= 0) {
    return '無勝で最強のザコを目指そうね';
  }
  if (prediction < 5) {
    return `${prediction}勝目指してふぁいてぃー`;
  }
  if (prediction < 7) {
    return `${prediction}勝予想とは攻めてんね～やるぅ～`;
  }
  return `${prediction}勝は流石に無謀だと思うよ...`;
};
