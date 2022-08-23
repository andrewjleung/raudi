import { FastifyPluginCallback } from 'fastify';
import { EitherAsync } from 'purify-ts';
import {
  downloadSound,
  getRandomSoundId,
  getSound,
} from '../apis/freesound.js';
import { Static, Type } from '@sinclair/typebox';

const SoundId = Type.Number();

type SoundId = Static<typeof SoundId>;

const SoundDownloadInfo = Type.Object({
  filename: Type.String(),
  filesize: Type.Number(),
});

type SoundDownloadInfo = Static<typeof SoundDownloadInfo>;

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

  fastify.get<{ Params: { soundId: SoundId }; Querystring: SoundDownloadInfo }>(
    '/:soundId/download',
    {
      schema: {
        params: {
          soundId: SoundId,
        },
        querystring: SoundDownloadInfo,
      },
    },
    async (request, reply) => {
      if (request.freesound === undefined) {
        reply.code(401).send('Unauthorized.');
      } else {
        const accessToken = request.freesound.access_token;
        const { soundId } = request.params;
        const { filename, filesize } = request.query;

        downloadSound(accessToken)(soundId).caseOf({
          Left: (l) => reply.code(500).send(l),
          Right: (getDownloadStream) =>
            reply
              .headers({
                // https://github.com/eligrey/FileSaver.js/wiki/Saving-a-remote-file
                'Content-Type': 'application/octet-stream; charset=utf-8',
                'Content-Disposition': `attachment; filename=${filename} filename*=${filename}`,
                'Content-length': filesize,
              })
              .send(getDownloadStream()),
        });
      }
    },
  );

  done();
};

export { soundsRoutes };
