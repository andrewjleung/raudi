import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForwardStep } from '@fortawesome/free-solid-svg-icons';

type NextButtonProps = {
  onClick: () => void;
  disabled: boolean;
};

export default function NextButton({ onClick, disabled }: NextButtonProps) {
  const activeClassName = disabled
    ? 'active:text-red-400'
    : 'active:text-gray-200';

  return (
    <div
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onClick={disabled ? () => {} : onClick}
      className="w-10 h-10 flex justify-center items-center"
    >
      <FontAwesomeIcon
        className={`w-10 h-10 ease-in-out duration-75 text-gray-200 hover:text-gray-300 ${activeClassName}`}
        icon={faForwardStep}
      />
    </div>
  );
}
