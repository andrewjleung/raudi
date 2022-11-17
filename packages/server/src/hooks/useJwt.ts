import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import {
  FastifyBaseLogger,
  FastifyInstance,
  preValidationHookHandler,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify';
import { Just, Maybe } from 'purify-ts';
import rotatingEncryption from '../encryption.js';
import { encaseNullable } from '../utils/purify-utils.js';
import { JWT_COOKIE_NAME } from '../routes/auth.js';
import { AccessTokenJwtPayloadCodec } from '@raudi/common';

const useJwt =
  (
    fastify: FastifyInstance<
      RawServerDefault,
      RawRequestDefaultExpression,
      RawReplyDefaultExpression,
      FastifyBaseLogger,
      TypeBoxTypeProvider
    >,
  ): preValidationHookHandler =>
  (request, reply, done) => {
    const { decrypt } = rotatingEncryption.get();

    Just({})
      .chain(encaseNullable(() => request.cookies[JWT_COOKIE_NAME]))
      .chain(encaseNullable((cookie) => reply.unsignCookie(cookie).value))
      .chain(encaseNullable((cookie) => fastify.jwt.decode<object>(cookie)))
      .chain((jwt) => AccessTokenJwtPayloadCodec.decode(jwt).toMaybe())
      .chain((jwt) =>
        Maybe.encase(() => ({
          ...jwt,
          access_token: decrypt(jwt.access_token),
          refresh_token: decrypt(jwt.refresh_token),
        })),
      )
      .ifJust((jwt) => {
        request.freesound = jwt;
      });

    done();
  };

export default useJwt;
