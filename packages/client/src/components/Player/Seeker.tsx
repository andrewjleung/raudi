import { useState } from 'react';
import { Setter, State } from '../../types';
import PlayerSlider from './PlayerSlider';

const SLIDER_STEP = 0.01;

type ScrubberProps = {
  duration: number;
  progress: number;
  setCurrentTime: Setter<number>;
  Playing: State<boolean>;
  className?: string;
};

export default function Seeker({
  duration,
  progress,
  setCurrentTime,
  Playing,
  className,
}: ScrubberProps) {
  const [playing, setPlaying] = Playing;
  const [wasPlaying, setWasPlaying] = useState(false);

  const onChange = (value: number) => {
    setCurrentTime((value / 100) * duration);
  };

  const onChangeStart = () => {
    setWasPlaying(playing);
    setPlaying(false);
  };

  const onChangeEnd = () => {
    setPlaying(wasPlaying);
  };

  return (
    <PlayerSlider
      className={className}
      aria-label="Seeker"
      defaultValue={0}
      step={SLIDER_STEP}
      value={progress}
      onChange={onChange}
      onChangeStart={onChangeStart}
      onChangeEnd={onChangeEnd}
    />
  );
}
