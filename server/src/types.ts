import { Codec, GetType, number, string } from 'purify-ts';

const AccessTokenResponse = Codec.interface({
  access_token: string,
  scope: string,
  expires_in: number,
  refresh_token: string,
});

type AccessTokenResponse = GetType<typeof AccessTokenResponse>;

export { AccessTokenResponse };
