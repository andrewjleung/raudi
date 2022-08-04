import { Button } from '@chakra-ui/react';
import { State } from '../../types';

type PlayPauseButtonProps = {
  Playing: State<boolean>;
};

export default ({ Playing }: PlayPauseButtonProps) => {
  const [playing, setPlaying] = Playing;

  return (
    <Button aria-label="Play/pause button" onClick={() => setPlaying(!playing)}>
      {playing ? 'Pause' : 'Play'}
    </Button>
  );
};
