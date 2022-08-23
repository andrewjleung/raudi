import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

type DownloadButtonProps = {
  onClick: () => void;
};

export default function DownloadButton({ onClick }: DownloadButtonProps) {
  const iconClassNames = classNames(
    'w-7 h-7',
    'cursor-pointer',
    'ease-in-out duration-75',
    'text-gray-200 hover:text-gray-300 active:text-gray-200',
  );

  return (
    <div
      onClick={onClick}
      className="w-10 h-10 flex justify-center items-center"
    >
      <FontAwesomeIcon className={iconClassNames} icon={faDownload} />
    </div>
  );
}
