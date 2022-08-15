import { useMemo, useState } from 'react';
import { Setter, State } from '../../types';
import PlayerSlider from '../PlayerSlider';

const SLIDER_STEP = 0.01;

type HoursMinutesSeconds = {
  hours: number;
  minutes: number;
  seconds: number;
};

const getHMS = (seconds: number): HoursMinutesSeconds => {
  const minutes = seconds / 60;
  const hours = minutes / 60;

  return {
    hours: Math.floor(hours),
    minutes: Math.floor(minutes),
    seconds: Math.floor(seconds % 60),
  };
};

const getFormattedTime = (seconds: number): string => {
  const hms = getHMS(seconds);
  const pad = (timePart: number) => String(timePart).padStart(2, '0');

  if (hms.hours < 1) {
    return `${hms.minutes}:${pad(hms.seconds)}`;
  }

  return `${hms.hours}:${pad(hms.minutes)}:${pad(hms.seconds)}`;
};

type ScrubberProps = {
  duration: number;
  progress: number;
  setTime: Setter<number>;
  Playing: State<boolean>;
};

export default function Seeker({
  duration,
  progress,
  setTime,
  Playing,
}: ScrubberProps) {
  const [playing, setPlaying] = Playing;
  const [wasPlaying, setWasPlaying] = useState(false);

  const formattedTime = useMemo(
    () => getFormattedTime((progress / 100) * duration),
    [progress, duration],
  );

  const onChange = (value: number) => {
    setTime((value / 100) * duration);
  };

  const onChangeStart = () => {
    setWasPlaying(playing);
    setPlaying(false);
  };

  const onChangeEnd = () => {
    setPlaying(wasPlaying);
  };

  return (
    <>
      <PlayerSlider
        aria-label="Seeker"
        defaultValue={0}
        step={SLIDER_STEP}
        value={progress}
        onChange={onChange}
        onChangeStart={onChangeStart}
        onChangeEnd={onChangeEnd}
      />
      {formattedTime} / {getFormattedTime(duration)}
    </>
  );
}
