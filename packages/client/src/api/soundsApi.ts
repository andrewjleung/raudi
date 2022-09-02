import {
  FreesoundSoundInstanceCodec,
  FreesoundSoundInstance,
} from '@raudi/common';
import { array, Either, EitherAsync } from 'purify-ts';
import { AuthorizedFetch } from '../hooks/useAuthorizedFetch';
import config from '../config';

export const fetchSounds = (
  authorizedFetch: AuthorizedFetch,
): Promise<Either<unknown, FreesoundSoundInstance[]>> =>
  EitherAsync.fromPromise(() =>
    authorizedFetch(`${config.serverUrl}/sounds/random`),
  )
    .chain((response) => EitherAsync(() => response.json()))
    .chain((response) =>
      EitherAsync.liftEither(
        array(FreesoundSoundInstanceCodec).decode(response),
      ),
    )
    .run();
