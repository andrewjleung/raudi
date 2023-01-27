import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import {
  FastifyBaseLogger,
  FastifyInstance,
  preValidationHookHandler,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify';
import { Either, Maybe, Right } from 'purify-ts';
import rotatingEncryption from '../encryption.js';
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

    Right({})
      .chain(() =>
        Maybe.fromNullable(request.cookies[JWT_COOKIE_NAME]).toEither(
          'Missing JWT cookie.',
        ),
      )
      .chain((cookie) =>
        Maybe.fromNullable(reply.unsignCookie(cookie).value).toEither(
          'Failed to verify cookie signature.',
        ),
      )
      .chain((cookie) =>
        Maybe.fromNullable(fastify.jwt.decode<object>(cookie)).toEither(
          'Failed to decode JWT.',
        ),
      )
      .chain((jwt) => AccessTokenJwtPayloadCodec.decode(jwt))
      .chain((jwt) =>
        Either.encase(() => ({
          ...jwt,
          access_token: decrypt(jwt.access_token),
          refresh_token: decrypt(jwt.refresh_token),
        })),
      )
      .caseOf({
        Left: (error) => {
          reply.clearCookie(JWT_COOKIE_NAME);
          console.error(error);
        },
        Right: (jwt) => {
          request.freesound = jwt;
        },
      });

    done();
  };

export default useJwt;
