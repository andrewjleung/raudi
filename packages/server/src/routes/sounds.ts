import { FastifyPluginCallback } from 'fastify';
import { EitherAsync } from 'purify-ts';
import { getRandomSoundId, getSound } from '../apis/freesound.js';

const soundsRoutes: FastifyPluginCallback = (fastify, _opts, done) => {
  fastify.get('/random', async (request, reply) => {
    if (request.freesound === undefined) {
      reply.code(401).send('Unauthorized.');
    } else {
      const accessToken = request.freesound.access_token;
      const randomSoundIds = await EitherAsync.rights(
        [...Array(5)].map(() => EitherAsync.fromPromise(getRandomSoundId)),
      );
      const randomSounds = await EitherAsync.rights(
        randomSoundIds.map((id) =>
          EitherAsync.fromPromise(() => getSound(accessToken)(id)),
        ),
      );

      if (randomSounds.length < 1) {
        reply.code(429).send('Too Many Requests');
        return;
      }

      reply.code(200).send(randomSounds);
    }
  });

  done();
};

export { soundsRoutes };
