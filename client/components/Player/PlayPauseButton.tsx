import { Button } from "@chakra-ui/react";

export default ({ playing, setPlaying }) => (
  <Button aria-label="Play/pause button" onClick={() => setPlaying(!playing)}>
    {playing ? "Pause" : "Play"}
  </Button>
);
