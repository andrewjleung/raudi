import { Button, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const response = await fetch('http://localhost:3000/me', {
        credentials: 'include',
      });

      if (response.status !== 200) {
        window.location.replace(`http://localhost:5173/login`);
        return;
      }

      setIsLoggedIn(true);
    };

    checkLogin();
  }, [setIsLoggedIn]);

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
      <Button
        onClick={() => {
          window.location.replace(
            `http://localhost:3000/sounds/randomSounds?amount=5`,
          );
        }}
      >
        Get five random sounds!
      </Button>
    </>
  );
};

export default App;
