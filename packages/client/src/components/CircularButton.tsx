import { Box } from '@chakra-ui/react';

type CircularButtonProps = {
  onClick: () => void;
  icon: JSX.Element;
};

const CircularButton = ({ onClick, icon }: CircularButtonProps) => {
  return (
    <Box
      as="button"
      onClick={onClick}
      className="rounded-full w-10 h-10 ease-in-out duration-75  bg-indigo-400 hover:bg-indigo-500 hover:scale-105 active:bg-indigo-600 active:scale-110"
    >
      {icon}
    </Box>
  );
};

export default CircularButton;
