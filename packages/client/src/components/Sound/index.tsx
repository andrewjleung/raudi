import { Heading, Image, Skeleton } from '@chakra-ui/react';
import { FreesoundSoundInstance } from '@raudi/common';

const SOUND_IMAGE_H = 128;
const SOUND_IMAGE_W = 672;

const ImageFallback = () => <Skeleton height={SOUND_IMAGE_H} width="full" />;

type SoundProps = {
  sound: FreesoundSoundInstance;
};

const Sound = ({ sound }: SoundProps) => {
  return (
    <div>
      <div className="h-20 flex items-end">
        <Heading wordBreak="break-word" size="lg" noOfLines={2}>
          {sound.name}
        </Heading>
      </div>
      <Heading className="mb-1" size="xs">
        {sound.username}
      </Heading>
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
