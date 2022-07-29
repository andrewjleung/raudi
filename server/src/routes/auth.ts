import { Either, EitherAsync } from 'purify-ts';
import { config } from '../config.js';
import { encrypt } from '../encryption.js';
import { getAccessToken, getMe } from '../apis/freesound.js';
import { FastifyInstance, FastifyPluginCallback } from 'fastify';
import { Static, Type } from '@sinclair/typebox';
import { AccessTokenResponse, AccessTokenJwtPayload } from '../types.js';

const AuthCode = Type.Object({
  code: Type.String(),
});

type AuthCode = Static<typeof AuthCode>;

const HOST_COOKIE_PREFIX = '__Host-';
const JWT_COOKIE_NAME = `${HOST_COOKIE_PREFIX}accessData`;
const ACCESS_DURATION_MS = 1 * 60 * 60 * 1000; // 1 hour.

const makeAccessTokenJwt =
  (fastify: FastifyInstance) =>
  (payload: AccessTokenJwtPayload): string => {
    const { access_token, refresh_token, expires_in } = payload;

    return fastify.jwt.sign(
      {
        ...payload,
        access_token: encrypt(access_token),
        refresh_token: encrypt(refresh_token),
      },
      { expiresIn: expires_in },
    );
  };

const makeAccessTokenJwtPayload = async (
  response: AccessTokenResponse,
): Promise<Either<unknown, AccessTokenJwtPayload>> => {
  const eitherMeOrError = await getMe(response.access_token)();

  eitherMeOrError.ifLeft((e) => {
    console.log(e);
  });

  return eitherMeOrError.map((me) => ({
    ...response,
    freesound_user_id: me.unique_id,
  }));
};

const authRoutes: FastifyPluginCallback = (fastify, _opts, done) => {
  fastify.get('/login', async (_request, reply) => {
    reply.redirect(
      302,
      `https://freesound.org/apiv2/oauth2/authorize/?client_id=${config.freesoundClientId}&response_type=code`,
    );
  });

  fastify.get<{ Querystring: AuthCode }>(
    '/callback',
    {
      schema: {
        querystring: AuthCode,
      },
    },
    async (request, reply) =>
      EitherAsync.fromPromise(() => getAccessToken(request.query.code))
        .chain(makeAccessTokenJwtPayload)
        .map(makeAccessTokenJwt(fastify))
        .caseOf({
          Left: () => {
            reply.code(401).send('Unauthorized');
          },
          Right: (jwt: string) => {
            const expireDate = new Date();
            expireDate.setTime(expireDate.getTime() + ACCESS_DURATION_MS);

            reply
              .setCookie(JWT_COOKIE_NAME, jwt, {
                path: '/',
                signed: true,
                secure: true,
                httpOnly: true,
                sameSite: true,
                expires: expireDate,
              })
              .redirect(302, 'http://localhost:5173'); // TODO: Is this the right code?
          },
        }),
  );

  done();
};

export { authRoutes, JWT_COOKIE_NAME };
