import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';
import { ComponentWithAs, SliderProps } from '@chakra-ui/react';
import { useState } from 'react';

const PlayerSlider: ComponentWithAs<'div', SliderProps> = (props) => {
  const [mouseEntered, setMouseEntered] = useState(false);
  const [changing, setChanging] = useState(false);

  const showThumb = mouseEntered || changing;

  return (
    <Slider
      {...props}
      onMouseEnter={() => setMouseEntered(true)}
      onMouseLeave={() => setMouseEntered(false)}
      onChangeStart={() => setChanging(true)}
      onChangeEnd={() => setChanging(false)}
    >
      <SliderTrack>
        <SliderFilledTrack bgColor="gray.400" borderRadius={50} />
      </SliderTrack>
      <SliderThumb boxSize={3} visibility={showThumb ? 'visible' : 'hidden'} />
    </Slider>
  );
};

export default PlayerSlider;
