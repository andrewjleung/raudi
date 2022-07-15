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
import { useSearchParams } from 'react-router-dom';

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
  const [searchParams, setSearchParams] = useSearchParams();
  const [maybeAccessToken, setMaybeAccessToken] =
    useState<Maybe<string>>(Nothing);

  useEffect(() => {
    const maybeAuthCode = Maybe.fromNullable(searchParams.get('code'));

    MaybeAsync.liftMaybe(maybeAuthCode)
      .chain((authCode) => fetchAccessToken(clientId, clientSecret, authCode))
      .run()
      .then(setMaybeAccessToken);

    // TODO: Stopgap to avoid triggering another token fetch with the same auth
    // code. Best thing to do would be to put all of this stuff server-side.
    return () => {
      searchParams.delete('code');
      setSearchParams(searchParams);
    };
  }, [clientId, clientSecret, searchParams]);

  return maybeAccessToken;
};

export default useFreesoundApi;
