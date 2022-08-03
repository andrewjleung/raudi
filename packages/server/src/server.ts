import crypto from 'crypto';
import Fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';
import fastifyJwt from '@fastify/jwt';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { soundsRoutes } from './routes/sounds.js';
import { AccessTokenJwtPayload } from '@raudi/types';
import { authRoutes } from './routes/auth.js';
import useJwt from './hooks/useJwt.js';

// TODO: Don't use `Maybe` for error handling. Use `Either`!
// TODO: Make sure that exceptions will be properly handled for things like
//       decryption, JWT verifications, auth code timeout, access token timeout

declare module 'fastify' {
  interface FastifyRequest {
    freesound?: AccessTokenJwtPayload;
  }
}

const fastify = Fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

// TODO: Configure CORS.
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
    .register(soundsRoutes, { prefix: '/sounds' })
    .get('/me', (request, reply) => {
      if (request.freesound === undefined) {
        reply.code(401).send('Unauthorized.');
      } else {
        reply.code(200).send(request.freesound?.freesound_user_id);
      }
    });
};

const registerHooks = () => {
  fastify.addHook('preValidation', useJwt(fastify));
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
registerHooks();
start();