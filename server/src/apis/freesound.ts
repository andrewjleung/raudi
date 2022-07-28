import { Either, Left, Right } from 'purify-ts';
import got from 'got';
import { AccessTokenResponse, FreesoundSoundInstance } from '../types.js';
import { config } from '../config.js';

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

  try {
    const response = await got
      .post(`${FREESOUND_API_URL}/oauth2/access_token`, options)
      .json();

    return AccessTokenResponse.decode(response);
  } catch (e) {
    return Left(e);
  }
};

const getRandomSoundId = async (): Promise<Either<unknown, string>> => {
  try {
    const response = await got.get(`${FREESOUND_URL}/browse/random`);
    const responseUrl = new URL(response.url);
    const locations = responseUrl.pathname.split('/');
    const soundId = locations[locations.indexOf('sounds') + 1];

    return Right(soundId);
  } catch (e) {
    // TODO: DRY this?
    return Left(e);
  }
};

const getSound =
  (accessToken: string) =>
  async (id: string): Promise<Either<unknown, FreesoundSoundInstance>> => {
    // Filter fields by those specified in the SoundInstance type.
    const fields = Object.keys(
      FreesoundSoundInstance.schema().properties || {},
    );

    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      searchParams: {
        fields: fields.join(','),
      },
    };

    try {
      const response = await got
        .get(`${FREESOUND_API_URL}/sounds/${id}`, options)
        .json();

      console.log(response);

      return FreesoundSoundInstance.decode(response);
    } catch (e) {
      return Left(e);
    }
  };

export { getAccessToken, getRandomSoundId, getSound };
