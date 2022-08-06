import { FastifyPluginCallback } from 'fastify';
import { EitherAsync } from 'purify-ts';
import { getRandomSoundId, getSound } from '../apis/freesound.js';

const soundsRoutes: FastifyPluginCallback = (fastify, _opts, done) => {
  fastify.get('/random', async (request, reply) => {
    if (request.freesound === undefined) {
      reply.code(401).send('Unauthorized.');
    } else {
      const accessToken = request.freesound.access_token;
      const randomSoundIds = EitherAsync.all(
        [...Array(5)].map(() => EitherAsync.fromPromise(getRandomSoundId)),
      );

      const getRandomSounds = (ids: string[]) =>
        EitherAsync.all(
          ids.map((id) =>
            EitherAsync.fromPromise(() => getSound(accessToken)(id)),
          ),
        );

      return randomSoundIds.chain(getRandomSounds).caseOf({
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
