import Fastify from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { AuthCode } from './schemas/auth.js';
import 'dotenv/config';

const fastify = Fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

fastify.get(
  '/token',
  {
    schema: {
      querystring: AuthCode,
    },
  },
  async (request, reply) => {
    const { code } = request.query;

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
