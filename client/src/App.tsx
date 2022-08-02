import { Button, Spinner } from '@chakra-ui/react';
import { useLogin } from './hooks/useLogin';

const App = () => {
  const isLoggedIn = useLogin();

  if (!isLoggedIn) {
    return <Spinner />;
  }

  return (
    <>
      <Button
        onClick={() => {
          window.location.replace(`http://localhost:3000/sounds/random`);
        }}
      >
        Get a random sound!
      </Button>
    </>
  );
};

export default App;
