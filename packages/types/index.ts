import {
  array,
  Codec,
  GetType,
  nullable,
  number,
  string,
  exactly,
} from "purify-ts";

const AccessTokenResponseProperties = {
  access_token: string,
  scope: string,
  expires_in: number,
  refresh_token: string,
};

export const AccessTokenResponseCodec = Codec.interface(
  AccessTokenResponseProperties
);

export type AccessTokenResponse = GetType<typeof AccessTokenResponseCodec>;

export const AccessTokenJwtPayloadCodec = Codec.interface({
  ...AccessTokenResponseProperties,
  freesound_user_id: number,
});

export type AccessTokenJwtPayload = GetType<typeof AccessTokenJwtPayloadCodec>;

const SoundInstancePreviews = Codec.interface({
  "preview-hq-mp3": string,
  "preview-lq-mp3": string,
  "preview-hq-ogg": string,
  "preview-lq-ogg": string,
});

const SoundInstanceImages = Codec.interface({
  spectral_m: string,
  spectral_l: string,
  spectral_bw_l: string,
  waveform_bw_m: string,
  waveform_bw_l: string,
  waveform_l: string,
  waveform_m: string,
  spectral_bw_m: string,
});

// https://freesound.org/docs/api/resources_apiv2.html#sound-instance
export const FreesoundSoundInstanceCodec = Codec.interface({
  id: number,
  url: string,
  name: string,
  tags: array(string),
  description: string,
  geotag: nullable(string),
  created: string,
  license: string,
  type: exactly("wav", "aif", "aiff", "mp3", "m4a", "flac"),
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
  images: SoundInstanceImages,
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

export type FreesoundSoundInstance = GetType<
  typeof FreesoundSoundInstanceCodec
>;

const FreesoundUserInstanceAvatarCodec = Codec.interface({
  small: string,
  large: string,
  medium: string,
});

export const FreesoundMeUserInstanceCodec = Codec.interface({
  email: string,
  unique_id: number,
  url: string,
  username: string,
  about: string,
  home_page: string,
  avatar: FreesoundUserInstanceAvatarCodec,
  date_joined: string,
  num_sounds: number,
  sounds: string,
  num_packs: number,
  packs: string,
  num_posts: number,
  num_comments: number,
  bookmark_categories: string,
});

export type FreesoundMeUserInstance = GetType<
  typeof FreesoundMeUserInstanceCodec
>;

export enum Environment {
  DEV = "development",
  PROD = "production",
}

export type Configuration = {
  clientUrl: string;
  serverUrl: string;
};

const buildConfig = (node_env?: string): Configuration => {
  if (node_env === Environment.PROD) {
    return {
      clientUrl: "https://raudi.xyz",
      serverUrl: "https://raudi.xyz/api",
    };
  }

  return {
    clientUrl: "http://localhost:5173",
    serverUrl: "http://localhost:3000",
  };
};

export const config = buildConfig(process.env.NODE_ENV);
