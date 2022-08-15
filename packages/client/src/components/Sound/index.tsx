import { Image, Spinner } from '@chakra-ui/react';
import { FreesoundSoundInstance } from '@raudi/types';

type SoundProps = {
  sound: FreesoundSoundInstance;
};

// TODO: Use better fallbacks.
const Sound = ({ sound }: SoundProps) => {
  return (
    <>
      {sound.name}
      <Image src={sound.images.waveform_l} fallback={<Spinner />} />
      <Image src={sound.images.spectral_bw_l} fallback={<Spinner />} />
    </>
  );
};

export { Sound };
