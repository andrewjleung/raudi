import crypto from 'crypto';
import Fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';
import fastifyJwt from '@fastify/jwt';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { AuthCode } from './schemas/auth.js';
import { getAccessToken } from './apis/freesound.js';
import { Maybe, Just, Nothing } from 'purify-ts';
import { AccessTokenResponse } from './types.js';

// 1 Hour.
const ACCESS_DURATION_MS = 1 * 60 * 60 * 1000;

const fastify = Fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

fastify.register(fastifyJwt, {
  secret: crypto.randomBytes(256).toString('base64'),
});

fastify.register(fastifyCookie, {
  secret: crypto.randomBytes(256).toString('base64'),
  parseOptions: {},
});

fastify.get('/auth/login', async (request, reply) => {
  reply.redirect(
    302,
    `https://freesound.org/apiv2/oauth2/authorize/?client_id=${FREESOUND_CLIENT_ID}&response_type=code`,
  );
});

fastify.get(
  '/auth/callback',
  {
    schema: {
      querystring: AuthCode,
    },
  },
  async (request, reply) => {
    const { code } = request.query;
    const maybeAccessTokenResponse = await getAccessToken(code);

    /*
    1. stringify
    2. encrypt
    3. put in jwt
    4. cookie!
    */
    maybeAccessTokenResponse
      .ifJust(console.log)
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
  const maybeCookie = Maybe.fromNullable(request.cookies['__Host-accessData']);
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

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
