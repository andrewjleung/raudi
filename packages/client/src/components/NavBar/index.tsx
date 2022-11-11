import { Heading, useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import NavButton from './NavButton';
import { Squash as Hamburger } from 'hamburger-react';
import cn from 'classnames';

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const toggle = () => {
    if (isOpen) {
      onClose();
      return;
    }

    onOpen();
  };

  return (
    <div>
      <div className="h-14 sticky top-0 flex flex-row items-center gap-3 bg-white border-b-1">
        <div className="grow cursor-pointer" onClick={() => navigate('/')}>
          <Heading textColor="red.300">raudi</Heading>
        </div>
        <NavButton href="/about" onClose={onClose}>
          About
        </NavButton>
        <NavButton href="/contact" onClose={onClose}>
          Contact
        </NavButton>
        <Hamburger
          color="lightgray"
          toggled={isOpen}
          toggle={toggle}
          duration={0.2}
          size={20}
          rounded
        />
      </div>
      <div
        className={cn(
          'fixed',
          'overflow-x-hidden',
          'right-0',
          'px-10',
          'transition-height ease-in-out',
          isOpen ? 'duration-700' : '',
          'bg-white',
          'w-full',
          isOpen ? 'h-screen' : 'h-0',
          'rounded-lg',
          'overflow-hidden',
        )}
      >
        <div
          className={cn(
            'p-2',
            'transition-opacity ease-in-out',
            isOpen ? 'duration-200 delay-500' : '',
            isOpen ? 'opacity-100' : 'opacity-0',
            'grid grid-cols-2 gap-2',
          )}
        >
          <NavButton className="col-span-2" href="/sounds" onClose={onClose}>
            Random Sounds
          </NavButton>
          <NavButton className="col-span-2" href="/genres" onClose={onClose}>
            Random Genres
          </NavButton>
        </div>
      </div>
    </div>
  );
}
