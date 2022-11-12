import { FastifyPluginCallback } from 'fastify';
import { parse } from 'csv-parse';
import { pipeline } from 'stream/promises';
import got from 'got';
import { transform } from 'stream-transform';

// TODO: Move to a more appropriate place and test.
const pickRandom = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

export const genresRoutes: FastifyPluginCallback = (fastify, _opts, done) => {
  fastify.get('/random', async (_request, reply) => {
    // TODO: Cache this result.
    const genres: Set<string> = new Set();

    await pipeline(
      got.stream(
        'https://cdn.jsdelivr.net/gh/andrewjleung/tnd-reviews@main/reviews.csv',
      ),
      parse({
        cast: true,
        columns: true,
      }),
      // TODO: Some type safety please...
      transform((data) =>
        data.genres.split(';;').filter((genre: string) => genre.length > 0),
      ),
      transform((data) => {
        data.forEach((entry: string) => genres.add(entry));
      }),
    );

    reply.send(pickRandom(Array.from(genres)));
  });

  done();
};
