import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <div className="w-fit mt-10">Nothing to see here...</div>
      <Button className="w-fit">
        <Link to="/">Go home</Link>
      </Button>
    </div>
  );
}
