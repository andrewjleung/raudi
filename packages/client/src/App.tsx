import { Button, Spinner } from '@chakra-ui/react';
import { FreesoundSoundInstance } from '@raudi/types';
import { useEffect, useState } from 'react';
import { fetchSounds } from './api/sounds';
import { Sound } from './components/Sound';
import { useLogin } from './hooks/useLogin';

const STAYAHEAD_COUNT = 15;

const App = () => {
  const isLoggedIn = useLogin();
  const [sounds, setSounds] = useState<FreesoundSoundInstance[]>([]);
  const [cursor, setCursor] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (
      !isLoggedIn ||
      isFetching ||
      sounds.length - cursor >= STAYAHEAD_COUNT
    ) {
      return;
    }

    setIsFetching(true);
    fetchSounds().then((maybeSounds) => {
      setIsFetching(false);

      return maybeSounds.caseOf({
        Just: (newSounds) => setSounds((sounds) => sounds.concat(newSounds)),
        Nothing: () => {},
      });
    });
  }, [cursor, isFetching, isLoggedIn, sounds]);

  if (!isLoggedIn) {
    return (
      <Button
        onClick={() => {
          window.location.replace(`http://localhost:3000/auth/login`);
        }}
      >
        Login with Freesound
      </Button>
    );
  }

  return (
    <>
      {sounds.length} sounds Cursor: {cursor}
      {cursor < sounds.length - 1 ? (
        <Button
          onClick={() => {
            if (cursor < sounds.length - 1) {
              setCursor((cursor) => cursor + 1);
            }
          }}
        >
          Next
        </Button>
      ) : (
        <Spinner />
      )}
      {sounds.length > 0 ? <Sound sound={sounds[cursor]} /> : <Spinner />}
    </>
  );
};

export default App;
