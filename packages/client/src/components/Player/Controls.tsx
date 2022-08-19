// TODO: add key listeners to map certain functions to expected keys

import { Spinner } from '@chakra-ui/spinner';

type ControlsProps = {
  canPlay: boolean;
  children: React.ReactNode;
  className?: string;
};

export default function Controls({
  canPlay,
  children,
  className,
}: ControlsProps) {
  if (!canPlay) {
    return <Spinner />;
  }

  return <div className={className}>{children}</div>;
}
