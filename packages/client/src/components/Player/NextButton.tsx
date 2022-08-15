import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForwardStep } from '@fortawesome/free-solid-svg-icons';

type NextButtonProps = {
  onClick: () => void;
};

export default function NextButton({ onClick }: NextButtonProps) {
  return (
    <div
      onClick={onClick}
      className="w-10 h-10 flex justify-center items-center"
    >
      <FontAwesomeIcon
        className="w-10 h-10 ease-in-out duration-75 text-gray-200 hover:text-gray-300 active:text-gray-200"
        icon={faForwardStep}
      />
    </div>
  );
}
