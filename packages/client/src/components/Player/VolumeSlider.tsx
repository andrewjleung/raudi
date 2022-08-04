import { useState } from 'react';
import {
  Tooltip,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';
import { State } from '../../types';

type VolumeSliderProps = {
  Volume: State<number>;
};

export default ({ Volume }: VolumeSliderProps) => {
  const [volume, setVolume] = Volume;
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
