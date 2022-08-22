import { FastifyPluginCallback } from 'fastify';
import { EitherAsync } from 'purify-ts';
import { getRandomSoundId, getSound } from '../apis/freesound.js';

const soundsRoutes: FastifyPluginCallback = (fastify, _opts, done) => {
  fastify.get('/random', async (request, reply) => {
    if (request.freesound === undefined) {
      reply.code(401).send('Unauthorized.');
    } else {
      const accessToken = request.freesound.access_token;
      const randomSoundIds = EitherAsync.rights(
        [...Array(5)].map(() => EitherAsync.fromPromise(getRandomSoundId)),
      );
      const getRandomSounds = (ids: string[]) =>
        EitherAsync.rights(
          ids.map((id) =>
            EitherAsync.fromPromise(() => getSound(accessToken)(id)),
          ),
        );

      randomSoundIds
        .then(getRandomSounds)
        .then((sounds) => {
          if (sounds.length < 1) {
            reply.code(500);
          }

          reply.code(200).send(sounds);
        })
        .catch((e) => reply.code(500).send(e));
    }
  });

  done();
};

export { soundsRoutes };
