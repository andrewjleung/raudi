import { Heading } from '@chakra-ui/react';

type HProps = {
  children: string;
};

export default function H({ children }: HProps) {
  return (
    <Heading as="h2" size="md">
      {children}
    </Heading>
  );
}
