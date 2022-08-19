import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faVolumeXmark,
  faVolumeOff,
  faVolumeHigh,
} from '@fortawesome/free-solid-svg-icons';
import { State } from '../../types';
import PlayerSlider from './PlayerSlider';
import classNames from 'classnames';

const SLIDER_STEP = 0.01;

type VolumeProps = {
  Volume: State<number>;
  Muted: State<boolean>;
};

export const VolumeSlider = ({ Volume, Muted }: VolumeProps) => {
  const [volume, setVolume] = Volume;
  const [muted] = Muted;

  return (
    <PlayerSlider
      width="10em"
      aria-label="Volume slider"
      defaultValue={volume}
      onChange={(v) => setVolume(v)}
      step={SLIDER_STEP}
      ignored={muted}
    />
  );
};

type VolumeButton = {
  Volume: State<number>;
};

export const VolumeButton = ({ Volume, Muted }: VolumeProps) => {
  const [volume] = Volume;
  const [muted, setMuted] = Muted;

  const volumeIcon = muted
    ? faVolumeXmark
    : volume === 0
    ? faVolumeOff
    : faVolumeHigh;

  const iconClassNames = classNames(
    // TODO: Hacky solution to consistent icon sizes, also a bit jittery when the size switches.
    { 'w-4 h-4': volume === 0 && !muted, 'w-5 h-5': volume > 0 || muted },
    'ease-in-out duration-75',
    'text-gray-200 hover:text-gray-300',
  );

  return (
    <button
      className="w-5 h-5 flex items-center"
      onClick={() => setMuted((muted) => !muted)}
    >
      <FontAwesomeIcon className={iconClassNames} icon={volumeIcon} />
    </button>
  );
};

type VolumeSetterProps = {
  children: React.ReactNode;
};

export const VolumeSetter = ({ children }: VolumeSetterProps) => {
  return <div className="flex flex-row items-center gap-3">{children}</div>;
};
