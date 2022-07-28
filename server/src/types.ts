import { array, Codec, GetType, nullable, number, string } from 'purify-ts';

const AccessTokenResponse = Codec.interface({
  access_token: string,
  scope: string,
  expires_in: number,
  refresh_token: string,
});

type AccessTokenResponse = GetType<typeof AccessTokenResponse>;

const SoundInstancePreviews = Codec.interface({
  'preview-hq-mp3': string,
  'preview-lq-mp3': string,
  'preview-hq-ogg': string,
  'preview-lq-ogg': string,
});

// const SoundInstanceImages = Codec.interface({
//   spectral_m: string,
//   spectral_l: string,
//   spectral_bw_l: string,
//   waveform_bw_m: string,
//   waveform_bw_l: string,
//   waveform_l: string,
//   waveform_m: string,
//   spectral_bw_m: string,
// });

// https://freesound.org/docs/api/resources_apiv2.html#sound-instance
const FreesoundSoundInstance = Codec.interface({
  id: number,
  url: string,
  name: string,
  tags: array(string),
  description: string,
  geotag: nullable(string),
  created: string,
  license: string,
  type: string,
  channels: number,
  filesize: number,
  bitrate: number,
  bitdepth: number,
  duration: number,
  samplerate: number,
  username: string,
  // pack: string,
  download: string,
  // bookmark: string,
  previews: SoundInstancePreviews,
  // images: SoundInstanceImages,
  // num_downloads: number,
  // avg_rating: number,
  // num_ratings: number,
  // rate: string,
  // comments: string,
  // num_comments: number,
  // comment: string,
  // similar_sounds: string,
  // analysis: nullable(record(string, unknown)),
  // analysis_stats: string,
  // analysis_frames: string,
  // ac_analysis: record(string, unknown),
});

type FreesoundSoundInstance = GetType<typeof FreesoundSoundInstance>;

const FreesoundUserInstanceAvatar = Codec.interface({
  small: string,
  large: string,
  medium: string,
});

const FreesoundUserInstance = Codec.interface({
  url: string,
  username: string,
  about: string,
  homepage: string,
  avatar: FreesoundUserInstanceAvatar,
  date_joined: string,
  num_sounds: number,
  sounds: string,
  num_packs: number,
  packs: string,
  num_posts: number,
  num_comments: number,
  bookmark_categories: string,
});

type FreesoundUserInstance = GetType<typeof FreesoundUserInstance>;

export { AccessTokenResponse, FreesoundSoundInstance, FreesoundUserInstance };
