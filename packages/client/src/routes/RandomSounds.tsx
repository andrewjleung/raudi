import { Button, Heading, Spinner, Text } from '@chakra-ui/react';
import { FreesoundSoundInstance } from '@raudi/common';
import { useCallback, useEffect, useState } from 'react';
import { Sound } from '../components/Sound';
import useLogin from '../hooks/useLogin';
import { UseSounds } from '../hooks/useSounds';
import Player from '../components/Player';
import SoundDataAccordion from '../components/Sound/SoundDataAccordion';
import SoundData from '../components/Sound/SoundData';
import SoundTags from '../components/Sound/SoundTags';
import SoundDescription from '../components/Sound/SoundDescription';

const DEFAULT_VOLUME = 50;

type RandomSoundsProps = {
  UseSounds: UseSounds;
  setSoundsEnabled: (soundsEnabled: boolean) => void;
};

export default function RandomSounds({
  UseSounds,
  setSoundsEnabled,
}: RandomSoundsProps) {
  const { isLoggedIn } = useLogin(true);
  const { sound, canGetNextSound, getNextSound, isFetching } = UseSounds;
  const Volume = useState(DEFAULT_VOLUME);

  useEffect(() => {
    setSoundsEnabled(true);
  }, [setSoundsEnabled]);

  const NoSounds = () => (
    <>
      <div className="mt-44 flex flex-col justify-center items-center gap-4">
        <Heading textColor="green.400">Loading sounds...</Heading>
        <Text marginTop="-3" textColor="green.400">
          (This may take a few seconds)
        </Text>
        <Spinner color="green.300" />
      </div>
    </>
  );

  const SoundPlayer = useCallback(
    (sound: FreesoundSoundInstance) => (
      <div className="flex justify-center mb-6">
        <div className="flex flex-col gap-4 max-w-2xl justify-center">
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
