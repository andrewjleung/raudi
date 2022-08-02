import { Button, Spinner } from '@chakra-ui/react';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
  const isLoggedIn = useLogin();

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
