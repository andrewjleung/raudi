import { FreesoundSoundInstance } from '@raudi/types';
import Player from '../Player';

type SoundProps = {
  sound: FreesoundSoundInstance;
};

const Sound = ({ sound }: SoundProps) => {
  return (
    <>
      {sound.name}
      <Player src={sound.previews['preview-hq-mp3']} />
    </>
  );
};

export { Sound };
