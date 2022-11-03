import { Either, EitherAsync, Left, List, Right } from 'purify-ts';
import got, { Request } from 'got';
import {
  AccessTokenResponse,
  FreesoundSoundInstance,
  FreesoundMeUserInstance,
  AccessTokenResponseCodec,
  FreesoundSoundInstanceCodec,
  FreesoundMeUserInstanceCodec,
} from '@raudi/common';
import config from '../config.js';

const FREESOUND_URL = 'https://freesound.org';
const FREESOUND_API_URL = `${FREESOUND_URL}/apiv2`;

const getAccessToken = async (
  authCode: string,
): Promise<Either<unknown, AccessTokenResponse>> => {
  const options = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    searchParams: {
      client_id: config.freesoundClientId,
      client_secret: config.freesoundClientSecret,
      grant_type: 'authorization_code',
      code: authCode,
    },
  };

  return got
    .post(`${FREESOUND_API_URL}/oauth2/access_token`, options)
    .json()
    .then(AccessTokenResponseCodec.decode)
    .catch(Left);
};

const getRandomSoundId = async (): Promise<Either<unknown, string>> =>
  EitherAsync.fromPromise(() =>
    got.get(`${FREESOUND_URL}/browse/random`).then(Right).catch(Left),
  )
    .map((response) => new URL(response.url))
    .map((url) => url.pathname.split('/'))
    .chain((locations) =>
      EitherAsync.liftEither(
        List.at(locations.indexOf('sounds') + 1, locations).toEither(
          'Unable to fetch random sound ID.',
        ),
      ),
    );

const getSound =
  (accessToken: string) =>
  async (id: string): Promise<Either<unknown, FreesoundSoundInstance>> => {
    // Filter fields by those specified in the SoundInstance type.
    const fields = Object.keys(
      FreesoundSoundInstanceCodec.schema().properties || {},
    );

    const options = {
      // TODO: Make a `got` instance so this doesn't need to be manually specified.
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      searchParams: {
        fields: fields.join(','),
      },
    };

    return got
      .get(`${FREESOUND_API_URL}/sounds/${id}`, options)
      .json()
      .then(FreesoundSoundInstanceCodec.decode)
      .catch(Left);
  };

const getMe =
  (accessToken: string) =>
  async (): Promise<Either<unknown, FreesoundMeUserInstance>> => {
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    return got
      .get(`${FREESOUND_API_URL}/me`, options)
      .json()
      .then(FreesoundMeUserInstanceCodec.decode)
      .catch(Left);
  };

const downloadSound =
  (accessToken: string) =>
  (id: number): Either<unknown, Request> => {
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    return Either.encase(() =>
      got.stream(`${FREESOUND_API_URL}/sounds/${id}/download`, options),
    );
  };

export { getAccessToken, getRandomSoundId, getSound, getMe, downloadSound };
