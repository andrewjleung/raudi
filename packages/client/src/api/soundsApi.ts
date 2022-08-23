import {
  FreesoundSoundInstanceCodec,
  FreesoundSoundInstance,
} from '@raudi/types';
import { array, Either, EitherAsync } from 'purify-ts';
import { AuthorizedFetch } from '../hooks/useAuthorizedFetch';

export const fetchSounds = (
  authorizedFetch: AuthorizedFetch,
): Promise<Either<unknown, FreesoundSoundInstance[]>> =>
  EitherAsync.fromPromise(() =>
    authorizedFetch('http://localhost:3000/sounds/random'),
  )
    .map((response) => response.json())
    .chain((response) =>
      EitherAsync.liftEither(
        array(FreesoundSoundInstanceCodec).decode(response),
      ),
    )
    .run();
