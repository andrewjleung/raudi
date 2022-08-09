import { Button, Spinner } from '@chakra-ui/react';
import { FreesoundSoundInstance } from '@raudi/types';
import { useCallback } from 'react';
import { Sound } from './components/Sound';
import useLogin from './hooks/useLogin';
import { useSounds } from './hooks/useSounds';

const App = () => {
  const isLoggedIn = useLogin();
  const { sound, getNextSound, canGetNextSound } = useSounds(isLoggedIn);

  const NoSounds = () => (
    <>
      Loading sounds...
      <Spinner />
    </>
  );

  const SoundRoller = useCallback(
    (sound: FreesoundSoundInstance) => (
      <>
        {canGetNextSound ? (
          <Button onClick={getNextSound}>Next</Button>
        ) : (
          <Spinner />
        )}
        <Sound sound={sound} />
      </>
    ),
    [canGetNextSound, getNextSound],
  );

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

  return sound.caseOf({
    Nothing: NoSounds,
    Just: SoundRoller,
  });
};

export default App;
