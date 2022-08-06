// TODO: add key listeners to map certain functions to expected keys

import { Spinner } from '@chakra-ui/spinner';

type ControlsProps = {
  canPlay: boolean;
  children: React.ReactNode;
};

export default function Controls({ canPlay, children }: ControlsProps) {
  if (!canPlay) {
    return <Spinner />;
  }

  return <>{children}</>;
}
