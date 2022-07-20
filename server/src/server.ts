import crypto from 'crypto';
import { encryption } from './encryption.js';
import Fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { AuthCode } from './schemas/auth.js';
import 'dotenv/config';

const e = encryption();

const fastify = Fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

fastify.register(fastifyJwt, {
  secret: crypto.randomBytes(256).toString('base64'),
});

fastify.get(
  '/token',
  {
    schema: {
      querystring: AuthCode,
    },
  },
  async (request, reply) => {
    const { code } = request.query;

    // Encrypt the code.

    reply.send(code);
  },
);

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
