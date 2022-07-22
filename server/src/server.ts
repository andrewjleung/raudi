import crypto from 'crypto';
import Fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';
import fastifyJwt from '@fastify/jwt';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { authRoutes } from './routes/auth.js';

const fastify = Fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

const registerPlugins = () => {
  fastify.register(fastifyJwt, {
    secret: crypto.randomBytes(256).toString('base64'),
  });

  fastify.register(fastifyCookie, {
    secret: crypto.randomBytes(256).toString('base64'),
    parseOptions: {},
  });
};

const registerRoutes = () => {
  fastify.register(authRoutes, { prefix: '/auth' });
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
