import { useRecoilValue } from 'recoil';
import { playerSelector } from '../../modules/state';
import { PredictionSlider } from './PredictionSlider';
import { ResultSlider } from './ResultSlider';
import { RoundOverSlider } from './RoundOverSlider';
import { StartSlider } from './StartSlider';

const Sliders: React.FC = () => {
  const player = useRecoilValue(playerSelector);

  if (player === null) {
    return null;
  }

  return (
    <>
      <StartSlider />
      <PredictionSlider />
      <RoundOverSlider />
      <ResultSlider />
    </>
  );
};

export { Sliders };
