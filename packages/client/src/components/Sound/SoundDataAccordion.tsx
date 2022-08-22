import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { Collapse, useDisclosure } from '@chakra-ui/react';
import classNames from 'classnames';

type SoundDataAccordionProps = {
  children: React.ReactNode;
};

export default function SoundDataAccordion({
  children,
}: SoundDataAccordionProps) {
  const { isOpen, onToggle } = useDisclosure();

  const btnClassNames = classNames(
    'flex justify-center',
    'cursor-pointer',
    'text-gray-300',
    'ease-in-out duration-300',
    'hover:bg-gray-100',
  );

  return (
    <div>
      <div className={btnClassNames} onClick={onToggle}>
        <FontAwesomeIcon icon={faEllipsis} />
      </div>
      <Collapse in={isOpen} animateOpacity>
        {children}
      </Collapse>
    </div>
  );
}
