import {
  FreesoundSoundInstanceCodec,
  FreesoundSoundInstance,
} from '@raudi/types';
import { array, Either, EitherAsync } from 'purify-ts';
import { AuthorizedFetch } from '../hooks/useAuthorizedFetch';
import { config } from '@raudi/types';

export const fetchSounds = (
  authorizedFetch: AuthorizedFetch,
): Promise<Either<unknown, FreesoundSoundInstance[]>> =>
  EitherAsync.fromPromise(() =>
    authorizedFetch(`${config.serverUrl}/sounds/random`),
  )
    .map((response) => response.json())
    .chain((response) =>
      EitherAsync.liftEither(
        array(FreesoundSoundInstanceCodec).decode(response),
      ),
    )
    .run();
