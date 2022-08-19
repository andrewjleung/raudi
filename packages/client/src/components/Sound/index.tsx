import { Image, Skeleton } from '@chakra-ui/react';
import { FreesoundSoundInstance } from '@raudi/types';

const SOUND_IMAGE_H = 128;
const SOUND_IMAGE_W = 573;

type SoundProps = {
  sound: FreesoundSoundInstance;
};

const ImageFallback = () => (
  <Skeleton height={SOUND_IMAGE_H} width={SOUND_IMAGE_W} />
);

// TODO: Use better fallbacks.
const Sound = ({ sound }: SoundProps) => {
  return (
    <div>
      {sound.name}
      <Image src={sound.images.waveform_l} fallback={<ImageFallback />} />
      <Image
        height={SOUND_IMAGE_H}
        width={SOUND_IMAGE_W}
        src={sound.images.spectral_bw_l}
        fallback={<ImageFallback />}
      />
    </div>
  );
};

export { Sound };
