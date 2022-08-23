import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForwardStep } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

type NextButtonProps = {
  onClick: () => void;
  disabled: boolean;
};

export default function NextButton({ onClick, disabled }: NextButtonProps) {
  const iconClassNames = classNames(
    'w-8 h-8',
    'cursor-pointer',
    'ease-in-out duration-75',
    'text-gray-200 hover:text-gray-300',
    {
      'active:text-gray-200': !disabled,
      'active:text-red-200': disabled,
    },
  );

  return (
    <div
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onClick={disabled ? () => {} : onClick}
      className="w-10 h-10 flex justify-center items-center"
    >
      <FontAwesomeIcon className={iconClassNames} icon={faForwardStep} />
    </div>
  );
}
