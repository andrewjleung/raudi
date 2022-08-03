import { Button } from '@chakra-ui/react';
import Player from './components/Player';
import { Sound } from './components/Sound';
import { useLogin } from './hooks/useLogin';

const mockSound: FreesoundSoundInstance = {
  id: 578209,
  url: 'https://freesound.org/people/Buckine/sounds/578209/',
  name: 'AG The Rock 120bpm 002.wav',
  tags: [
    'loop',
    'percussion-loop',
    'drums',
    'FX',
    'beat',
    'percussion',
    'drum-loop',
    'drum',
  ],
  description:
    'Mangled loop originated from The  Rock 0001 using FX, chopping, looping',
  geotag: null,
  created: '2021-06-27T23:52:11',
  license: 'https://creativecommons.org/licenses/by/4.0/',
  type: 'wav',
  channels: 2,
  filesize: 1411620,
  bitrate: 0,
  bitdepth: 16,
  duration: 8,
  samplerate: 44100,
  username: 'Buckine',
  download: 'https://freesound.org/apiv2/sounds/578209/download/',
  previews: {
    'preview-hq-mp3':
      'https://cdn.freesound.org/previews/578/578209_11834494-hq.mp3',
    'preview-lq-mp3':
      'https://cdn.freesound.org/previews/578/578209_11834494-lq.mp3',
    'preview-hq-ogg':
      'https://cdn.freesound.org/previews/578/578209_11834494-hq.ogg',
    'preview-lq-ogg':
      'https://cdn.freesound.org/previews/578/578209_11834494-lq.ogg',
  },
};

const App = () => {
  const isLoggedIn = useLogin();

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
    <>
      <Sound sound={mockSound} />
      {/* <Button
        onClick={() => {
          window.location.replace(`http://localhost:3000/sounds/random`);
        }}
      >
        Get a random sound!
      </Button> */}
    </>
  );
};

export default App;
