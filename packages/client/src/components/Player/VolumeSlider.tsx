import { useState } from 'react';
import {
  Tooltip,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';
import { State } from '../../types';

const SLIDER_STEP = 0.01;

type VolumeSliderProps = {
  Volume: State<number>;
};

export default function VolumeSlider({ Volume }: VolumeSliderProps) {
  const [volume, setVolume] = Volume;
  const [showVolumeTooltip, setShowVolumeTooltip] = useState(false);

  return (
    <Slider
      aria-label="Volume slider"
      defaultValue={volume}
      onChange={(v) => setVolume(v)}
      onMouseEnter={() => setShowVolumeTooltip(true)}
      onMouseLeave={() => setShowVolumeTooltip(false)}
      step={SLIDER_STEP}
    >
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <Tooltip
        bg="teal.500"
        color="white"
        placement="top"
        isOpen={showVolumeTooltip}
        label={`${Math.round(volume)}%`}
      >
        <SliderThumb />
      </Tooltip>
    </Slider>
  );
}
