import { Button } from '@chakra-ui/react';
import { FreesoundSoundInstance } from '@raudi/types';
import { useCallback } from 'react';
import { Sound } from './components/Sound';
import useLogin from './hooks/useLogin';
import { useSounds } from './hooks/useSounds';
import Player from './components/Player';
import ProgressHeader from './components/ProgressHeader';

const App = () => {
  const { isLoggedIn } = useLogin(true);
  const { sound, getNextSound, canGetNextSound, isFetching } = useSounds();

  const NoSounds = () => (
    <>
      <ProgressHeader />
      Loading sounds...
    </>
  );

  const SoundPlayer = useCallback(
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
    Just: SoundPlayer,
  });
};

export default App;
