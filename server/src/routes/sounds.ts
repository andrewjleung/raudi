import { FastifyPluginCallback } from 'fastify';
import { EitherAsync } from 'purify-ts';
import { getRandomSoundId, getSound } from '../apis/freesound.js';

const soundsRoutes: FastifyPluginCallback = (fastify, _opts, done) => {
  fastify.get('/random', async (request, reply) => {
    if (request.freesound === undefined) {
      reply.code(401).send('Unauthorized.');
    } else {
      return EitherAsync.fromPromise(getRandomSoundId)
        .chain(getSound(request.freesound.access_token))
        .caseOf({
          Left: (l) => {
            reply.code(500).send(l);
          },
          Right: (r) => {
            reply.code(200).send(r);
          },
        });
    }
  });

  done();
};

export { soundsRoutes };
