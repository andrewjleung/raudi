import {
  Tooltip,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';

type ScrubberProps = {
  currentTime: number;
  setCurrentTime: (value: number) => void;
};

export default ({ currentTime, setCurrentTime }: ScrubberProps) => (
  <Slider
    aria-label="Media scrubber"
    defaultValue={currentTime}
    onChange={(v) => setCurrentTime(v)}
  >
    <SliderTrack>
      <SliderFilledTrack />
    </SliderTrack>
    <Tooltip
      // TODO: style
      bg="teal.500"
      color="white"
      placement="top"
      isOpen
      label={`${currentTime}`}
    >
      <SliderThumb />
    </Tooltip>
  </Slider>
);
