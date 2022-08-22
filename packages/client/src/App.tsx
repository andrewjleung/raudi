import { Button, Container } from '@chakra-ui/react';
import { FreesoundSoundInstance } from '@raudi/types';
import { useCallback } from 'react';
import { Sound } from './components/Sound';
import useLogin from './hooks/useLogin';
import { useSounds } from './hooks/useSounds';
import Player from './components/Player';
import ProgressHeader from './components/ProgressHeader';
import SoundDataAccordion from './components/Sound/SoundDataAccordion';
import SoundData from './components/Sound/SoundData';
import SoundTags from './components/Sound/SoundTags';
import SoundDescription from './components/Sound/SoundDescription';

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
      <div className="flex flex-col gap-4">
        <Sound sound={sound} />
        <Player
          src={sound.previews['preview-hq-mp3']}
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
    <Container>
      {sound.caseOf({
        Nothing: NoSounds,
        Just: SoundPlayer,
      })}
    </Container>
  );
};

export default App;
