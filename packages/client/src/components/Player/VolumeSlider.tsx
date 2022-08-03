import { useState } from 'react';
import {
  Tooltip,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';

type VolumeSliderProps = {
  volume: number;
  setVolume: (value: number) => void;
};

export default ({ volume, setVolume }: VolumeSliderProps) => {
  const [showVolumeTooltip, setShowVolumeTooltip] = useState(false);

  return (
    <Slider
      aria-label="Volume slider"
      defaultValue={volume}
      onChange={(v) => setVolume(v)}
      onMouseEnter={() => setShowVolumeTooltip(true)}
      onMouseLeave={() => setShowVolumeTooltip(false)}
    >
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <Tooltip
        // TODO: style
        bg="teal.500"
        color="white"
        placement="top"
        isOpen={showVolumeTooltip}
        label={`${volume}%`}
      >
        <SliderThumb />
      </Tooltip>
    </Slider>
  );
};
