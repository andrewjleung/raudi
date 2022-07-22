import { AccessTokenResponse } from '../types.js';
import { Maybe, Just, Nothing } from 'purify-ts';
import { config } from '../config.js';
import { encrypt, decrypt } from '../encryption.js';
import { getAccessToken } from '../apis/freesound.js';
import { FastifyPluginCallback } from 'fastify';
import { Static, Type } from '@sinclair/typebox';

export const AuthCode = Type.Object({
  code: Type.String(),
});

export type AuthCode = Static<typeof AuthCode>;

// 1 Hour.
const ACCESS_DURATION_MS = 1 * 60 * 60 * 1000;

const authRoutes: FastifyPluginCallback = (fastify, opts, done) => {
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

      maybeAccessTokenResponse
        .map(JSON.stringify)
        .map(encrypt)
        .map((encrypted) => fastify.jwt.sign({ encrypted }))
        .caseOf({
          Just: (jwt: string) => {
            const expireDate = new Date();
            expireDate.setTime(expireDate.getTime() + ACCESS_DURATION_MS);

            reply
              .setCookie('__Host-accessData', jwt, {
                path: '/',
                signed: true,
                secure: true,
                httpOnly: true,
                sameSite: true,
                expires: expireDate,
              })
              .redirect(302, 'http://localhost:5173'); // TODO: is this the right code?
          },
          Nothing: () => reply.redirect(302, 'http://localhost:5173/sad'),
        });
    },
  );

  fastify.get('/testCookie', async (request, reply) => {
    const maybeCookie = Maybe.fromNullable(
      request.cookies['__Host-accessData'],
    );
    maybeCookie
      .map(request.unsignCookie)
      .chain(({ value: valueOrNull }) => Maybe.fromNullable(valueOrNull))
      .ifJust(fastify.jwt.verify)
      .map(fastify.jwt.decode)
      .chain((value) => Maybe.fromNullable(value))
      .chain((value) => {
        if (typeof value !== 'string') {
          return Just(value as { encrypted: string });
        }
        return Nothing;
      })
      .map(({ encrypted }) => encrypted)
      .map((value) => decrypt(value))
      .map(JSON.parse)
      .chain((o) => AccessTokenResponse.decode(o).toMaybe())
      .caseOf({
        Just: (accessTokenResponse) => reply.send(accessTokenResponse),
        Nothing: () => reply.send('bad'),
      });
  });

  done();
};

export { authRoutes };
