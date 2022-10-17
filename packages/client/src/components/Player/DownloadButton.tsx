import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { FreesoundSoundInstance } from '@raudi/common';

// TODO: Move somewhere better and test.
const getSoundFileName = (sound: FreesoundSoundInstance) => {
  if (sound.name.includes('.')) {
    return sound.name;
  }

  return `${sound.name}.${sound.type}`;
};

type DownloadButtonProps = {
  sound: FreesoundSoundInstance;
};

export default function DownloadButton({ sound }: DownloadButtonProps) {
  const iconClassNames = classNames(
    'w-7 h-7',
    'cursor-pointer',
    'ease-in-out duration-75',
    'text-gray-200 hover:text-gray-300 active:text-gray-200',
  );

  return (
    <a
      className="w-10 h-10 flex justify-center items-center"
      href={`/api/sounds/${sound.id}/download?filename=${getSoundFileName(
        sound,
      )}&filesize=${sound.filesize}`}
      download={getSoundFileName(sound)}
    >
      <FontAwesomeIcon className={iconClassNames} icon={faDownload} />
    </a>
  );
}
