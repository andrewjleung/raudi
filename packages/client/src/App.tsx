import { Button, Spinner } from '@chakra-ui/react';
import { FreesoundSoundInstance } from '@raudi/types';
import { useCallback } from 'react';
import { Sound } from './components/Sound';
import useLogin from './hooks/useLogin';
import { useSounds } from './hooks/useSounds';
import Player from './components/Player';

const App = () => {
  const { isLoggedIn } = useLogin(true);
  const { sound, getNextSound, canGetNextSound } = useSounds();

  const NoSounds = () => (
    <>
      Loading sounds...
      <Spinner />
    </>
  );

  const SoundRoller = useCallback(
    (sound: FreesoundSoundInstance) => (
      <>
        <Sound sound={sound} />
        <Player
          src={sound.previews['preview-hq-mp3']}
          onClickNext={getNextSound}
          canGetNextSound={canGetNextSound}
        />
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
