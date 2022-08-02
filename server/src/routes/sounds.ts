import { Static, Type } from '@sinclair/typebox';
import { FastifyPluginCallback } from 'fastify';
import { EitherAsync } from 'purify-ts';
import {
  getRandomSounds,
  getRandomSoundId,
  getSound,
} from '../apis/freesound.js';

const Amount = Type.Object({
  amount: Type.Number(),
});

type Amount = Static<typeof Amount>;

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

  fastify.get<{ Querystring: Amount }>(
    '/randomSounds',
    {
      schema: {
        querystring: Amount,
      },
    },
    async (request, reply) => {
      const accessToken = request.freesound?.access_token;

      if (accessToken) {
        return EitherAsync.fromPromise(() =>
          getRandomSounds(accessToken)(request.query.amount),
        ).caseOf({
          Left: (l) => {
            reply.code(500).send(l);
          },
          Right: (r) => {
            reply.code(200).send(r);
          },
        });
      } else {
        reply.code(401).send('Unauthorized.');
      }
    },
  );

  done();
};

export { soundsRoutes };
