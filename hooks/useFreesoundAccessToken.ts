import {
  Codec,
  GetType,
  Maybe,
  MaybeAsync,
  Nothing,
  number,
  string,
} from 'purify-ts';
import { useEffect, useState } from 'react';
import useQuery from './useQuery';

const AccessTokenResponse = Codec.interface({
  access_token: string,
  scope: string,
  expires_in: number,
  refresh_token: string,
});

type AccessTokenResponse = GetType<typeof AccessTokenResponse>;

// TODO: test this
const objectToParams = (o: Record<string, string>): string =>
  Object.entries(o)
    .map(([key, val]) => `${key}=${val}`)
    .join('&');

// TODO: Implement more robust error handling here.
// Right now it is just assumed that a failure must be because of an expired
// auth code.
const fetchAccessToken = async (
  clientId: string,
  clientSecret: string,
  authCode: string,
): Promise<Maybe<string>> => {
  try {
    const response = await fetch(
      `https://freesound.org/apiv2/oauth2/access_token/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: objectToParams({
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'authorization_code',
          code: authCode,
        }),
      },
    ).then((response) => response.json());

    return AccessTokenResponse.decode(response)
      .toMaybe()
      .map((response) => response.access_token);
  } catch (e) {
    return Nothing;
  }
};

const useFreesoundApi = (
  clientId: string,
  clientSecret: string,
): Maybe<string> => {
  const query = useQuery();
  const [maybeAccessToken, setMaybeAccessToken] =
    useState<Maybe<string>>(Nothing);

  // TODO: because of React 18 this is happening twice.
  useEffect(() => {
    const maybeAuthCode = Maybe.fromNullable(query.get('code'));

    MaybeAsync.liftMaybe(maybeAuthCode)
      .chain((authCode) => fetchAccessToken(clientId, clientSecret, authCode))
      .run()
      .then(setMaybeAccessToken);
  }, [clientId, clientSecret, query]);

  return maybeAccessToken;
};

export default useFreesoundApi;
