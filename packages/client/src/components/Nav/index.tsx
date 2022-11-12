import { Heading, useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import NavButton from './NavButton';
import { Squash as Hamburger } from 'hamburger-react';
import cn from 'classnames';
import ToolCardContent from '../ToolCardContent';

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
      <div
        id="nav-items"
        className="h-14 fixed top-0 left-10 right-10 bottom-auto flex flex-row items-center gap-3 bg-white border-b-1"
      >
        <div
          className="cursor-pointer"
          onClick={() => {
            onClose();
            navigate('/');
          }}
        >
          <Heading textColor="red.300">raudi</Heading>
        </div>
        <NavButton
          className="ml-auto invisible sm:visible"
          href="/about"
          onClick={onClose}
        >
          About
        </NavButton>
        <NavButton
          className="invisible sm:visible"
          href="/contact"
          onClick={onClose}
        >
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
        id="drawer"
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
            'p-4',
            'transition-opacity ease-in-out',
            isOpen ? 'duration-200 delay-500' : '',
            isOpen ? 'opacity-100' : 'opacity-0',
            'grid grid-cols-2 gap-4',
          )}
        >
          <NavButton
            className="col-span-2 sm:col-span-1"
            href="/sounds"
            onClick={onClose}
          >
            <ToolCardContent
              title="Random Sounds"
              description="Demo and download random soundbytes for instant inspiration, Tinder-style."
            />
          </NavButton>
          <NavButton
            className="col-span-2 sm:col-span-1"
            href="/genres"
            onClick={onClose}
          >
            <ToolCardContent
              title="Random Genres"
              description="Pick a random genre from Anthony Fantano's reviews to make music to."
            />
          </NavButton>
          <NavButton
            className="visible sm:invisible"
            href="/about"
            onClick={onClose}
          >
            About
          </NavButton>
          <NavButton
            className="visible sm:invisible"
            href="/contact"
            onClick={onClose}
          >
            Contact
          </NavButton>
        </div>
      </div>
    </div>
  );
}
