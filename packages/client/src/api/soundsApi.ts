import { FreesoundSoundInstance } from '@raudi/types';
import { Either, Left } from 'purify-ts';

export const fetchSounds = async (): Promise<
  Either<unknown, FreesoundSoundInstance[]>
> => {
  try {
    // TODO: Handle unauthorized.
    const response = await fetch('http://localhost:3000/sounds/random', {
      credentials: 'include',
    }).then((response) => response.json());

    if (!Array.isArray(response)) {
      return Left(Error('Random sounds response is not an array.'));
    }

    return Either.sequence(response.map(FreesoundSoundInstance.decode));
  } catch (e) {
    return Left(e);
  }
};
