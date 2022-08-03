import { Button } from '@chakra-ui/react';

type PlayPauseButtonProps = {
  playing: boolean;
  setPlaying: (value: boolean) => void;
};

export default ({ playing, setPlaying }: PlayPauseButtonProps) => (
  <Button aria-label="Play/pause button" onClick={() => setPlaying(!playing)}>
    {playing ? 'Pause' : 'Play'}
  </Button>
);
