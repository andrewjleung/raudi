import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';
import { ComponentWithAs, SliderProps } from '@chakra-ui/react';
import { useState } from 'react';

const PlayerSlider: ComponentWithAs<'div', SliderProps> = (props) => {
  const [showThumb, setShowThumb] = useState(false);

  return (
    <Slider
      {...props}
      onMouseEnter={() => setShowThumb(true)}
      onMouseLeave={() => setShowThumb(false)}
    >
      <SliderTrack>
        <SliderFilledTrack borderRadius={50} />
      </SliderTrack>
      <SliderThumb boxSize={3} visibility={showThumb ? 'visible' : 'hidden'} />
    </Slider>
  );
};

export default PlayerSlider;
