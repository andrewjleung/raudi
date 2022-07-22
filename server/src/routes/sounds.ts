import { FastifyPluginCallback } from 'fastify';
import { useFreesound } from './auth.js';

const soundsRoutes: FastifyPluginCallback = (fastify, _opts, done) => {
  useFreesound(fastify);

  fastify.get('/random', async (_request, reply) => {
    reply.code(200).send('random sound!');
  });

  done();
};

export { soundsRoutes };
