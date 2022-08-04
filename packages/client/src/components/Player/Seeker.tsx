import {
  Tooltip,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { Setter, State } from '../../types';

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
  Seeking: State<boolean>;
  Playing: State<boolean>;
};

export default ({
  duration,
  progress,
  setTime,
  Seeking,
  Playing,
}: ScrubberProps) => {
  const [seeking, setSeeking] = Seeking;
  const [playing, setPlaying] = Playing;

  const [showTimeTooltip, setShowTimeTooltip] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [wasPlaying, setWasPlaying] = useState(false);

  const formattedTime = useMemo(
    () => getFormattedTime((progress / 100) * duration),
    [progress, duration],
  );

  const onChange = (value: number) => {
    setTime((value / 100) * duration);
  };

  const onMouseEnter = () => {
    setHovering(true);
    setShowTimeTooltip(true);
  };

  const onMouseLeave = () => {
    setHovering(false);
    if (!seeking) {
      setShowTimeTooltip(false);
    }
  };

  const onChangeStart = () => {
    setSeeking(true);
    setWasPlaying(playing);
    setPlaying(false);
    setShowTimeTooltip(true);
  };

  const onChangeEnd = () => {
    setSeeking(false);
    setPlaying(wasPlaying);
    if (!hovering) {
      setShowTimeTooltip(false);
    }
  };

  return (
    <>
      <Slider
        aria-label="Seeker"
        defaultValue={0}
        step={0.01}
        value={progress}
        onChange={onChange}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onChangeStart={onChangeStart}
        onChangeEnd={onChangeEnd}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <Tooltip
          bg="teal.500"
          color="white"
          placement="top"
          isOpen={showTimeTooltip}
          label={`${formattedTime}`}
        >
          <SliderThumb />
        </Tooltip>
      </Slider>
      {formattedTime}
    </>
  );
};
