import { FastifyPluginCallback } from 'fastify';
import { EitherAsync } from 'purify-ts';
import { getRandomSoundId, getSound } from '../apis/freesound.js';
import { useFreesound } from './auth.js';

const soundsRoutes: FastifyPluginCallback = (fastify, _opts, done) => {
  useFreesound(fastify);

  fastify.get('/random', async (request, reply) =>
    EitherAsync.fromPromise(getRandomSoundId)
      .chain(getSound(request.freesound.access_token))
      .caseOf({
        Left: (l) => {
          reply.code(500).send(l);
        },
        Right: (r) => {
          reply.code(200).send(r);
        },
      }),
  );

  done();
};

export { soundsRoutes };
