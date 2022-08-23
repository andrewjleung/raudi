import {
  FreesoundSoundInstanceCodec,
  FreesoundSoundInstance,
} from '@raudi/types';
import { array, Either, EitherAsync } from 'purify-ts';
import { AuthorizedFetch } from '../hooks/useAuthorizedFetch';

export const fetchSounds = async (
  authorizedFetch: AuthorizedFetch,
): Promise<Either<unknown, FreesoundSoundInstance[]>> =>
  EitherAsync.fromPromise(() =>
    authorizedFetch('http://localhost:3000/sounds/random'),
  ).chain((response) =>
    EitherAsync.liftEither(array(FreesoundSoundInstanceCodec).decode(response)),
  );

// TODO: Move somewhere better and test.
const getSoundFileName = (sound: FreesoundSoundInstance) => {
  if (sound.name.includes('.')) {
    return sound.name;
  }

  return `${sound.name}.${sound.type}`;
};

export const downloadSound =
  (authorizedFetch: AuthorizedFetch) =>
  async (sound: FreesoundSoundInstance): Promise<Either<unknown, unknown>> =>
    EitherAsync.fromPromise(() =>
      authorizedFetch(
        `http://localhost:3000/sounds/${
          sound.id
        }/download?filename=${getSoundFileName(sound)}&filesize=${
          sound.filesize
        }`,
      ),
    );
