import { Button, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    // TODO: Don't ping here, hoist `isLoggedIn` into app state and pull from there.
    //       Otherwise, there will be repeat pings.
    const checkLogin = async () => {
      const response = await fetch('http://localhost:3000/me', {
        credentials: 'include',
      });

      if (response.status === 200) {
        window.location.replace(`http://localhost:5173/`);
        return;
      }

      setIsLoggedIn(false);
    };

    checkLogin();
  }, []);

  if (isLoggedIn) {
    return <Spinner />;
  }

  return (
    <Button
      onClick={() => {
        window.location.replace(`http://localhost:3000/auth/login`);
      }}
    >
      Login with Freesound
    </Button>
  );
};

export default Login;
