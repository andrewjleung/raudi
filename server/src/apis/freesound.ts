import { Maybe, Nothing } from 'purify-ts';
import got from 'got';
import { AccessTokenResponse } from '../types.js';
import { config } from '../config.js';

const FREESOUND_URL = 'https://freesound.org';
const FREESOUND_API_URL = `${FREESOUND_URL}/apiv2`;

// TODO: Test this and move it
const objectToParams = (o: Record<string, string>): string =>
  Object.entries(o)
    .map(([key, val]) => `${key}=${val}`)
    .join('&');

const getAccessToken = async (
  authCode: string,
): Promise<Maybe<AccessTokenResponse>> => {
  const options = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  };

  const params = objectToParams({
    client_id: config.freesoundClientId,
    client_secret: config.freesoundClientSecret,
    grant_type: 'authorization_code',
    code: authCode,
  });

  try {
    const response = await got
      .post(`${FREESOUND_API_URL}/oauth2/access_token?${params}`, options)
      .json();

    return AccessTokenResponse.decode(response).toMaybe();
  } catch (e) {
    // TODO: Implement more robust error handling. Currently this assumes the
    // error is a grant error (auth code is expired).
    return Nothing;
  }
};

const getRandomSoundId = async (): Promise<string> => {
  const response = await got.get(`${FREESOUND_URL}/browse/random`);
  const responseUrl = new URL(response.url);
  const locations = responseUrl.pathname.split('/');
  const soundId = locations[locations.indexOf('sounds') + 1];

  return soundId;
};

export { getAccessToken, getRandomSoundId };
