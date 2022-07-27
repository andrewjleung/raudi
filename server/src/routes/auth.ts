import { Maybe } from 'purify-ts';
import { config } from '../config.js';
import { decrypt, encrypt } from '../encryption.js';
import { getAccessToken } from '../apis/freesound.js';
import { FastifyInstance, FastifyPluginCallback } from 'fastify';
import { Static, Type } from '@sinclair/typebox';
import { AccessTokenResponse } from '../types.js';

const AuthCode = Type.Object({
  code: Type.String(),
});

type AuthCode = Static<typeof AuthCode>;

const HOST_COOKIE_PREFIX = '__Host-';
const ACCESS_DATA_COOKIE = `${HOST_COOKIE_PREFIX}accessData`;
const ACCESS_DURATION_MS = 1 * 60 * 60 * 1000; // 1 hour.

const accessTokenResponseToJwt =
  (fastify: FastifyInstance) =>
  (response: AccessTokenResponse): string => {
    const { access_token, refresh_token, scope, expires_in } = response;

    return fastify.jwt.sign(
      {
        access_token: encrypt(access_token),
        refresh_token: encrypt(refresh_token),
        scope,
        expires_in,
      },
      { expiresIn: expires_in },
    );
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
    async (request, reply) => {
      const { code } = request.query;
      const maybeAccessTokenResponse = await getAccessToken(code);

      maybeAccessTokenResponse.map(accessTokenResponseToJwt(fastify)).caseOf({
        Just: (jwt: string) => {
          const expireDate = new Date();
          expireDate.setTime(expireDate.getTime() + ACCESS_DURATION_MS);

          reply
            .setCookie(ACCESS_DATA_COOKIE, jwt, {
              path: '/',
              signed: true,
              secure: true,
              httpOnly: true,
              sameSite: true,
              expires: expireDate,
            })
            .redirect(302, 'http://localhost:5173'); // TODO: Is this the right code?
        },
        Nothing: () => reply.redirect(302, 'http://localhost:5173/sad'),
      });
    },
  );

  fastify.get('/hello', async (request, reply) => {
    reply.send('hello world!');
  });

  done();
};

const useFreesound = (fastify: FastifyInstance) =>
  fastify.addHook('preValidation', (request, reply, done) => {
    const maybeCookie = Maybe.fromNullable(request.cookies[ACCESS_DATA_COOKIE]);

    maybeCookie
      .chainNullable((cookie) => reply.unsignCookie(cookie).value)
      .ifJust(fastify.jwt.verify)
      .chainNullable((cookie) => fastify.jwt.decode<object>(cookie))
      .chain((jwt) => AccessTokenResponse.decode(jwt).toMaybe())
      .ifJust((jwt) => {
        request.freesound = {
          ...jwt,
          access_token: decrypt(jwt.access_token),
          // TODO: Check for access token expiry and request a new one with refresh token?
          refresh_token: decrypt(jwt.refresh_token),
        };
      })
      .ifNothing(() => reply.code(401));

    done();
  });

export { authRoutes, useFreesound };
