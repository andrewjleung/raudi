import { Container, Heading } from '@chakra-ui/react';
import NavButton from './NavButton';

type NavBarProps = {
  children: React.ReactNode;
};

export default function NavBar({ children }: NavBarProps) {
  return (
    <Container>
      <div className="h-20 sticky top-0 flex flex-row items-center gap-1 bg-white border-b-1">
        <div className="grow">
          <Heading textColor="red.300">raudi</Heading>
        </div>
        <NavButton href="/about">About</NavButton>
        <NavButton href="/contact">Contact</NavButton>
      </div>
      {children}
    </Container>
  );
}
