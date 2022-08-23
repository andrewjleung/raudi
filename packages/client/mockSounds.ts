import { FreesoundSoundInstance } from '../types/index';

const mockSounds: FreesoundSoundInstance[] = [
  {
    id: 1,
    url: '',
    name: 'really_cool_sound1.wav',
    tags: ['tag1', 'tag2', 'tag3'],
    description:
      "This is a really really cool sound I found the other day. Seriously, it's quite cool.<br><br> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    geotag: null,
    created: new Date().toISOString(),
    license: 'license',
    type: 'wav',
    channels: 2,
    filesize: 123,
    bitrate: 123,
    bitdepth: 32,
    duration: 123,
    samplerate: 44100,
    username: 'andrewjleung',
    download: 'google.com',
    previews: {
      'preview-hq-mp3':
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      'preview-lq-mp3':
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      'preview-hq-ogg':
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      'preview-lq-ogg':
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    images: {
      spectral_m:
        'https://cdn.freesound.org/displays/157/157042_2835342_spec_L.jpg',
      spectral_l:
        'https://cdn.freesound.org/displays/157/157042_2835342_spec_L.jpg',
      spectral_bw_l:
        'https://cdn.freesound.org/displays/157/157042_2835342_spec_L.jpg',
      waveform_bw_m:
        'https://cdn.freesound.org/displays/157/157042_2835342_wave_L.png',
      waveform_bw_l:
        'https://cdn.freesound.org/displays/157/157042_2835342_wave_L.png',
      waveform_l:
        'https://cdn.freesound.org/displays/157/157042_2835342_wave_L.png',
      waveform_m:
        'https://cdn.freesound.org/displays/157/157042_2835342_wave_L.png',
      spectral_bw_m:
        'https://cdn.freesound.org/displays/157/157042_2835342_spec_L.jpg',
    },
  },
  {
    id: 1,
    url: '',
    name: 'really_cool_sound2.wav',
    tags: ['tag1', 'tag2', 'tag3'],
    description:
      "This is a really really cool sound I found the other day. Seriously, it's quite cool.<br><br> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    geotag: null,
    created: new Date().toISOString(),
    license: 'license',
    type: 'wav',
    channels: 2,
    filesize: 123,
    bitrate: 123,
    bitdepth: 32,
    duration: 123,
    samplerate: 44100,
    username: 'andrewjleung',
    download: 'google.com',
    previews: {
      'preview-hq-mp3':
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      'preview-lq-mp3':
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      'preview-hq-ogg':
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      'preview-lq-ogg':
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    images: {
      spectral_m:
        'https://cdn.freesound.org/displays/157/157042_2835342_spec_L.jpg',
      spectral_l:
        'https://cdn.freesound.org/displays/157/157042_2835342_spec_L.jpg',
      spectral_bw_l:
        'https://cdn.freesound.org/displays/157/157042_2835342_spec_L.jpg',
      waveform_bw_m:
        'https://cdn.freesound.org/displays/157/157042_2835342_wave_L.png',
      waveform_bw_l:
        'https://cdn.freesound.org/displays/157/157042_2835342_wave_L.png',
      waveform_l:
        'https://cdn.freesound.org/displays/157/157042_2835342_wave_L.png',
      waveform_m:
        'https://cdn.freesound.org/displays/157/157042_2835342_wave_L.png',
      spectral_bw_m:
        'https://cdn.freesound.org/displays/157/157042_2835342_spec_L.jpg',
    },
  },
  {
    id: 1,
    url: '',
    name: 'really_cool_sound3.wav',
    tags: ['tag1', 'tag2', 'tag3'],
    description:
      "This is a really really cool sound I found the other day. Seriously, it's quite cool.<br><br> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    geotag: null,
    created: new Date().toISOString(),
    license: 'license',
    type: 'wav',
    channels: 2,
    filesize: 123,
    bitrate: 123,
    bitdepth: 32,
    duration: 123,
    samplerate: 44100,
    username: 'andrewjleung',
    download: 'google.com',
    previews: {
      'preview-hq-mp3':
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      'preview-lq-mp3':
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      'preview-hq-ogg':
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      'preview-lq-ogg':
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    images: {
      spectral_m:
        'https://cdn.freesound.org/displays/157/157042_2835342_spec_L.jpg',
      spectral_l:
        'https://cdn.freesound.org/displays/157/157042_2835342_spec_L.jpg',
      spectral_bw_l:
        'https://cdn.freesound.org/displays/157/157042_2835342_spec_L.jpg',
      waveform_bw_m:
        'https://cdn.freesound.org/displays/157/157042_2835342_wave_L.png',
      waveform_bw_l:
        'https://cdn.freesound.org/displays/157/157042_2835342_wave_L.png',
      waveform_l:
        'https://cdn.freesound.org/displays/157/157042_2835342_wave_L.png',
      waveform_m:
        'https://cdn.freesound.org/displays/157/157042_2835342_wave_L.png',
      spectral_bw_m:
        'https://cdn.freesound.org/displays/157/157042_2835342_spec_L.jpg',
    },
  },
  {
    id: 1,
    url: '',
    name: 'really_cool_sound4.wav',
    tags: ['tag1', 'tag2', 'tag3'],
    description:
      "This is a really really cool sound I found the other day. Seriously, it's quite cool.<br><br> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    geotag: null,
    created: new Date().toISOString(),
    license: 'license',
    type: 'wav',
    channels: 2,
    filesize: 123,
    bitrate: 123,
    bitdepth: 32,
    duration: 123,
    samplerate: 44100,
    username: 'andrewjleung',
    download: 'google.com',
    previews: {
      'preview-hq-mp3':
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      'preview-lq-mp3':
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      'preview-hq-ogg':
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      'preview-lq-ogg':
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    images: {
      spectral_m:
        'https://cdn.freesound.org/displays/157/157042_2835342_spec_L.jpg',
      spectral_l:
        'https://cdn.freesound.org/displays/157/157042_2835342_spec_L.jpg',
      spectral_bw_l:
        'https://cdn.freesound.org/displays/157/157042_2835342_spec_L.jpg',
      waveform_bw_m:
        'https://cdn.freesound.org/displays/157/157042_2835342_wave_L.png',
      waveform_bw_l:
        'https://cdn.freesound.org/displays/157/157042_2835342_wave_L.png',
      waveform_l:
        'https://cdn.freesound.org/displays/157/157042_2835342_wave_L.png',
      waveform_m:
        'https://cdn.freesound.org/displays/157/157042_2835342_wave_L.png',
      spectral_bw_m:
        'https://cdn.freesound.org/displays/157/157042_2835342_spec_L.jpg',
    },
  },
  {
    id: 1,
    url: '',
    name: 'really_cool_sound5.wav',
    tags: ['tag1', 'tag2', 'tag3'],
    description:
      "This is a really really cool sound I found the other day. Seriously, it's quite cool.<br><br> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    geotag: null,
    created: new Date().toISOString(),
    license: 'license',
    type: 'wav',
    channels: 2,
    filesize: 123,
    bitrate: 123,
    bitdepth: 32,
    duration: 123,
    samplerate: 44100,
    username: 'andrewjleung',
    download: 'google.com',
    previews: {
      'preview-hq-mp3':
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      'preview-lq-mp3':
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      'preview-hq-ogg':
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      'preview-lq-ogg':
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    images: {
      spectral_m:
        'https://cdn.freesound.org/displays/157/157042_2835342_spec_L.jpg',
      spectral_l:
        'https://cdn.freesound.org/displays/157/157042_2835342_spec_L.jpg',
      spectral_bw_l:
        'https://cdn.freesound.org/displays/157/157042_2835342_spec_L.jpg',
      waveform_bw_m:
        'https://cdn.freesound.org/displays/157/157042_2835342_wave_L.png',
      waveform_bw_l:
        'https://cdn.freesound.org/displays/157/157042_2835342_wave_L.png',
      waveform_l:
        'https://cdn.freesound.org/displays/157/157042_2835342_wave_L.png',
      waveform_m:
        'https://cdn.freesound.org/displays/157/157042_2835342_wave_L.png',
      spectral_bw_m:
        'https://cdn.freesound.org/displays/157/157042_2835342_spec_L.jpg',
    },
  },
];

export default mockSounds;
