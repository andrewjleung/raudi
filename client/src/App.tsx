import { Button } from '@chakra-ui/react';

const App = () => {
  return (
    <>
      <Button
        onClick={() => {
          window.location.replace(`http://localhost:3000/auth/login`);
        }}
      >
        Login with Freesound
      </Button>
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
