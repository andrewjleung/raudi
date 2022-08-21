import { Heading, Image, Skeleton } from '@chakra-ui/react';
import { FreesoundSoundInstance } from '@raudi/types';

const SOUND_IMAGE_H = 128;
const SOUND_IMAGE_W = 573;

const ImageFallback = () => (
  <Skeleton height={SOUND_IMAGE_H} width={SOUND_IMAGE_W} />
);

type SoundProps = {
  sound: FreesoundSoundInstance;
};

const Sound = ({ sound }: SoundProps) => {
  return (
    <div>
      <Heading>{sound.name}</Heading>
      <Heading size="xs">{sound.username}</Heading>
      <Image
        height={SOUND_IMAGE_H}
        width={SOUND_IMAGE_W}
        src={sound.images.waveform_l}
        fallback={<ImageFallback />}
      />
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
