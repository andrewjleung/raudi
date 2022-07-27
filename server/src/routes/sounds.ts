import { FastifyPluginCallback } from 'fastify';
import { getRandomSoundId } from '../apis/freesound.js';
import { useFreesound } from './auth.js';

const soundsRoutes: FastifyPluginCallback = (fastify, _opts, done) => {
  useFreesound(fastify);

  fastify.get('/random', async (_request, reply) => {
    const randomSoundId = await getRandomSoundId();

    reply.code(200).send(randomSoundId);
  });

  done();
};

export { soundsRoutes };
