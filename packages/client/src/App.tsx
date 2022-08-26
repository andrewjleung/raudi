import { Button, CircularProgress, Heading } from '@chakra-ui/react';
import { FreesoundSoundInstance } from '@raudi/types';
import { useCallback } from 'react';
import { Sound } from './components/Sound';
import useLogin from './hooks/useLogin';
import { useSounds } from './hooks/useSounds';
import Player from './components/Player';
import SoundDataAccordion from './components/Sound/SoundDataAccordion';
import SoundData from './components/Sound/SoundData';
import SoundTags from './components/Sound/SoundTags';
import SoundDescription from './components/Sound/SoundDescription';
import { config } from '@raudi/types';

const App = () => {
  const { isLoggedIn } = useLogin(true);
  const { sound, getNextSound, canGetNextSound, isFetching } = useSounds();

  const NoSounds = () => (
    <>
      <div className="mt-44 flex flex-col justify-center items-center gap-4">
        <Heading textColor="green.300">Loading sounds...</Heading>
        <CircularProgress isIndeterminate color="green.300" />
      </div>
    </>
  );

  const SoundPlayer = useCallback(
    (sound: FreesoundSoundInstance) => (
      <div className="flex flex-col gap-4">
        <Sound sound={sound} />
        <Player
          sound={sound}
          onClickNext={getNextSound}
          canGetNextSound={canGetNextSound}
        />
        <SoundDataAccordion>
          <SoundDescription className="mb-1" sound={sound} />
          <SoundTags sound={sound} />
          <SoundData sound={sound} />
        </SoundDataAccordion>
      </div>
    ),
    [canGetNextSound, getNextSound],
  );

  if (!isLoggedIn) {
    return (
      <div className="mt-40 flex justify-center">
        <Button
          onClick={() => {
            window.location.replace(`${config.serverUrl}/auth/login`);
          }}
        >
          Login with Freesound
        </Button>
      </div>
    );
  }

  return sound.caseOf({
    Nothing: NoSounds,
    Just: SoundPlayer,
  });
};

export default App;
