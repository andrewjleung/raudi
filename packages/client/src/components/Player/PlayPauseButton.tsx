import { State } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

type PlayPauseButtonProps = {
  Playing: State<boolean>;
};

const PlayPauseIcon = ({ playing }: { playing: boolean }) => {
  if (!playing) {
    return (
      <FontAwesomeIcon
        icon={faPlay}
        size="lg"
        color="white"
        className="ml-0.5"
      />
    );
  }

  return <FontAwesomeIcon icon={faPause} size="lg" color="white" />;
};

export default function PlayPauseButton({ Playing }: PlayPauseButtonProps) {
  const [playing, setPlaying] = Playing;

  return (
    <div
      onClick={() => setPlaying((playing) => !playing)}
      className="rounded-full w-10 h-10 bg-emerald-500 ease-in-out duration-75 hover:scale-105 active:scale-110 flex justify-center items-center"
    >
      <PlayPauseIcon playing={playing} />
    </div>
  );
}
