import useFreesoundAccessToken from '../hooks/useFreesoundAccessToken';
import { Button } from '@chakra-ui/react';

// TODO: Get rid of these... they should be server-side...
const CLIENT_ID = import.meta.env.VITE_FREESOUND_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_FREESOUND_CLIENT_SECRET;

console.log(CLIENT_ID);

const App = () => {
  const maybeToken = useFreesoundAccessToken(CLIENT_ID, CLIENT_SECRET);

  if (maybeToken.isNothing()) {
    return (
      <Button
        onClick={() => {
          window.location.replace(
            `https://freesound.org/apiv2/oauth2/authorize/?client_id=${CLIENT_ID}&response_type=code`,
          );
        }}
      >
        Login with Freesound
      </Button>
    );
  }

  return <div className="App">hello</div>;
};

export default App;
