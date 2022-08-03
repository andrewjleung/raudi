// TODO: add key listeners to map certain functions to expected keys

import { Spinner } from '@chakra-ui/spinner';

type ControlsProps = {
  canPlayThrough: boolean;
  children: React.ReactNode;
};

export default ({ canPlayThrough, children }: ControlsProps) => {
  if (!canPlayThrough) {
    // TODO: loading indicator
    return <Spinner />;
  }

  return <>children</>;
};
