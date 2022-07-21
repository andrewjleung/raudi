import { Codec, Maybe, GetType, number, string, Nothing } from 'purify-ts';
import got, { HTTPError } from 'got/dist/source';

const FREESOUND_API_URL = 'https://freesound.org/apiv2';

const AccessTokenResponse = Codec.interface({
  access_token: string,
  scope: string,
  expires_in: number,
  refresh_token: string,
});

type AccessTokenResponse = GetType<typeof AccessTokenResponse>;

const getAccessToken = async (
  clientId: string,
  clientSecret: string,
  authCode: string,
): Promise<Maybe<AccessTokenResponse>> => {
  const options = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    json: {
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'authorization_code',
      code: authCode,
    },
  };

  try {
    const response = await got
      .post(`${FREESOUND_API_URL}/oauth2/access_token`, options)
      .json();

    return AccessTokenResponse.decode(response).toMaybe();
  } catch (e) {
    if (!(e instanceof HTTPError)) {
      throw e;
    }

    if (e.response.statusCode >= 400) {
      return Nothing;
    }
  }
};

export { getAccessToken };
