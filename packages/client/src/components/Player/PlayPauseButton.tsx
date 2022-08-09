import { State } from '../../types';
import { PlayIcon, PauseIcon } from '@heroicons/react/solid';
import CircularButton from '../CircularButton';

type PlayPauseButtonProps = {
  Playing: State<boolean>;
};

export default function PlayPauseButton({ Playing }: PlayPauseButtonProps) {
  const [playing, setPlaying] = Playing;

  return (
    <CircularButton
      icon={playing ? <PauseIcon /> : <PlayIcon />}
      onClick={() => setPlaying((playing) => !playing)}
    />
  );
}
