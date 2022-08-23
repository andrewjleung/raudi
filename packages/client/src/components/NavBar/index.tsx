import { Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import NavButton from './NavButton';

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <div className=" h-14 sticky top-0 flex flex-row items-center gap-1 bg-white border-b-1">
      <div className="grow cursor-pointer" onClick={() => navigate('/')}>
        <Heading textColor="red.300">raudi</Heading>
      </div>
      <NavButton href="/about">About</NavButton>
      <NavButton href="/contact">Contact</NavButton>
    </div>
  );
}
