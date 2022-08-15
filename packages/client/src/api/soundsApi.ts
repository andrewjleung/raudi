import { FreesoundSoundInstance } from '@raudi/types';
import { array, Either, EitherAsync } from 'purify-ts';
import { AuthorizedFetch } from '../hooks/useAuthorizedFetch';

export const fetchSounds = async (
  authorizedFetch: AuthorizedFetch,
): Promise<Either<unknown, FreesoundSoundInstance[]>> =>
  EitherAsync.fromPromise(() =>
    authorizedFetch('http://localhost:3000/sounds/random'),
  ).chain((response) =>
    EitherAsync.liftEither(array(FreesoundSoundInstance).decode(response)),
  );
