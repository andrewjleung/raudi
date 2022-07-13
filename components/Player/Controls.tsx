// TODO: add key listeners to map certain functions to expected keys

export default ({ canPlayThrough, children }) => {
  if (!canPlayThrough) {
    // TODO: loading indicator
    return null;
  }

  return children;
};
