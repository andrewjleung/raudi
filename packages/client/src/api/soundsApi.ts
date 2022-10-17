import {
  FreesoundSoundInstanceCodec,
  FreesoundSoundInstance,
} from '@raudi/common';
import { array, Either, EitherAsync } from 'purify-ts';
import { AuthorizedFetch } from '../hooks/useAuthorizedFetch';

export const fetchSounds = (
  authorizedFetch: AuthorizedFetch,
): Promise<Either<unknown, FreesoundSoundInstance[]>> =>
  EitherAsync.fromPromise(() => authorizedFetch(`/api/sounds/random`))
    .chain((response) => EitherAsync(() => response.json()))
    .chain((response) =>
      EitherAsync.liftEither(
        array(FreesoundSoundInstanceCodec).decode(response),
      ),
    )
    .run();
