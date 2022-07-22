import { Maybe, Nothing } from 'purify-ts';
import got from 'got';
import { AccessTokenResponse } from '../types.js';
import { config } from '../config.js';

const FREESOUND_API_URL = 'https://freesound.org/apiv2';

// TODO: test this
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

export { getAccessToken };
