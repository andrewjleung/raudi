import { Button, CircularProgress, Heading } from '@chakra-ui/react';
import { FreesoundSoundInstance } from '@raudi/common';
import { useCallback, useState } from 'react';
import { Sound } from '../components/Sound';
import useLogin from '../hooks/useLogin';
import { UseSounds } from '../hooks/useSounds';
import Player from '../components/Player';
import SoundDataAccordion from '../components/Sound/SoundDataAccordion';
import SoundData from '../components/Sound/SoundData';
import SoundTags from '../components/Sound/SoundTags';
import SoundDescription from '../components/Sound/SoundDescription';

const DEFAULT_VOLUME = 50;

type HomeProps = {
  UseSounds: UseSounds;
};

export default function Home({ UseSounds }: HomeProps) {
  const { isLoggedIn } = useLogin(true);
  const { sound, getNextSound, canGetNextSound, isFetching } = UseSounds;
  const Volume = useState(DEFAULT_VOLUME);

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
          key={sound.id}
          Volume={Volume}
          onClickNext={getNextSound}
          canGetNextSound={canGetNextSound}
        />
        <SoundDataAccordion>
          <SoundDescription className="mb-1" sound={sound} key={sound.id} />
          <SoundTags sound={sound} />
          <SoundData sound={sound} />
        </SoundDataAccordion>
      </div>
    ),
    [Volume, canGetNextSound, getNextSound],
  );

  if (!isLoggedIn) {
    return (
      <div className="mt-40 flex justify-center">
        <Button>
          <a href="/api/auth/login">Login with Freesound</a>
        </Button>
      </div>
    );
  }

  return sound.caseOf({
    Nothing: NoSounds,
    Just: SoundPlayer,
  });
}
