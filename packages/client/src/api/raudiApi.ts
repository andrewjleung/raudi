import {
  FreesoundSoundInstanceCodec,
  FreesoundSoundInstance,
} from '@raudi/common';
import { array, EitherAsync, Left, Right } from 'purify-ts';
import { AuthorizedFetch } from '../hooks/useAuthorizedFetch';

export const fetchSounds = (
  authorizedFetch: AuthorizedFetch,
): Promise<FreesoundSoundInstance[]> =>
  EitherAsync.fromPromise(() => authorizedFetch(`/api/sounds/random`))
    .chain((response) => EitherAsync(() => response.json()))
    .chain((response) =>
      EitherAsync.liftEither(
        array(FreesoundSoundInstanceCodec).decode(response),
      ),
    )
    .run()
    .then((eitherSoundsOrError) => eitherSoundsOrError.unsafeCoerce());

export const fetchRandomGenre = (): Promise<string> =>
  EitherAsync.fromPromise(() =>
    fetch('/api/genres/random').then(Right).catch(Left),
  )
    .chain((response) => EitherAsync(() => response.text()))
    .run()
    .then((eitherGenreOrError) => eitherGenreOrError.unsafeCoerce());
