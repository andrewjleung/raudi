import crypto from 'crypto';
import Fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';
import fastifyJwt from '@fastify/jwt';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { authRoutes } from './routes/auth.js';
import { soundsRoutes } from './routes/sounds.js';
import { AccessTokenResponse } from './types.js';

// TODO: Don't use `Maybe` for error handling. Use `Either`!
// TODO: Make sure that exceptions will be properly handled for things like
//       decryption, JWT verifications, etc.

declare module 'fastify' {
  interface FastifyRequest {
    freesound: AccessTokenResponse;
  }
}

const fastify = Fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

const registerPlugins = () => {
  fastify
    .register(fastifyJwt, {
      secret: crypto.randomBytes(256).toString('base64'),
    })
    .register(fastifyCookie, {
      secret: crypto.randomBytes(256).toString('base64'),
      parseOptions: {},
    });
};

const registerRoutes = () => {
  fastify
    .register(authRoutes, { prefix: '/auth' })
    .register(soundsRoutes, { prefix: '/sounds' });
};

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

registerPlugins();
registerRoutes();
start();
