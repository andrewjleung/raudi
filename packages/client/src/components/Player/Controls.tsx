// TODO: add key listeners to map certain functions to expected keys

type ControlsProps = React.PropsWithChildren<{
  canPlayThrough: boolean;
}>;

export default ({ canPlayThrough, children }: ControlsProps) => {
  if (!canPlayThrough) {
    // TODO: loading indicator
    return null;
  }

  return children;
};
