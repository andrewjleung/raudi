import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import {
  FastifyInstance,
  FastifyLoggerInstance,
  preValidationHookHandler,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify';
import { Maybe } from 'purify-ts';
import { decrypt } from '../encryption.js';
import { JWT_COOKIE_NAME } from '../routes/auth.js';
import { AccessTokenJwtPayload } from '../types.js';

const useJwt =
  (
    fastify: FastifyInstance<
      RawServerDefault,
      RawRequestDefaultExpression,
      RawReplyDefaultExpression,
      FastifyLoggerInstance,
      TypeBoxTypeProvider
    >,
  ): preValidationHookHandler =>
  (request, reply, done) => {
    const maybeCookie = Maybe.fromNullable(request.cookies[JWT_COOKIE_NAME]);

    // TODO: This should be able to fail without causing any issues.
    //       The purpose of this is only to add the access token payload to
    //       the request. Checking for the presence of the cookie is a separate
    //       hook.
    maybeCookie
      .chainNullable((cookie) => reply.unsignCookie(cookie).value)
      .ifJust(fastify.jwt.verify)
      .chainNullable((cookie) => fastify.jwt.decode<object>(cookie))
      .chain((jwt) => AccessTokenJwtPayload.decode(jwt).toMaybe())
      .ifJust((jwt) => {
        request.freesound = {
          ...jwt,
          access_token: decrypt(jwt.access_token),
          // TODO: Check for access token expiry and request a new one with refresh token?
          refresh_token: decrypt(jwt.refresh_token),
        };
      });

    done();
  };

export default useJwt;
