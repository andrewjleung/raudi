import { Image, Spinner } from '@chakra-ui/react';
import { FreesoundSoundInstance } from '@raudi/types';
import Player from '../Player';

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
      <Player src={sound.previews['preview-hq-mp3']} />
    </>
  );
};

export { Sound };
