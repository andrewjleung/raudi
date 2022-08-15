import { State } from '../../types';
import PlayerSlider from './PlayerSlider';

const SLIDER_STEP = 0.01;

type VolumeSliderProps = {
  Volume: State<number>;
};

export default function VolumeSlider({ Volume }: VolumeSliderProps) {
  const [volume, setVolume] = Volume;

  return (
    <PlayerSlider
      width="10em"
      aria-label="Volume slider"
      defaultValue={volume}
      onChange={(v) => setVolume(v)}
      step={SLIDER_STEP}
    />
  );
}
