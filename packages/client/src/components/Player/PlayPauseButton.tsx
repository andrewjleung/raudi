import { State } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { Spinner } from '@chakra-ui/react';

type PlayPauseButtonProps = {
  Playing: State<boolean>;
  canPlay: boolean;
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

export default function PlayPauseButton({
  Playing,
  canPlay,
}: PlayPauseButtonProps) {
  const [playing, setPlaying] = Playing;

  const enabledBtnClassName = classNames(
    'rounded-full',
    'flex justify-center items-center',
    'w-10 h-10',
    'cursor-pointer',
    'bg-emerald-500',
    'ease-out duration-75',
    'hover:scale-105 active:scale-110',
  );

  const disabledBtnClassName = classNames(
    'rounded-full',
    'flex justify-center items-center',
    'w-10 h-10',
    'bg-gray-200 active:bg-red-200',
    'ease-out duration-75',
    'hover:scale-95 active:scale-100',
  );

  return (
    <div
      onClick={() => canPlay && setPlaying((playing) => !playing)}
      className={canPlay ? enabledBtnClassName : disabledBtnClassName}
    >
      {canPlay ? (
        <PlayPauseIcon playing={playing} />
      ) : (
        <Spinner color="white" />
      )}
    </div>
  );
}
