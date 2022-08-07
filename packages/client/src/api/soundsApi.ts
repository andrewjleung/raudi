import { FreesoundSoundInstance } from '@raudi/types';
import { Either, Left } from 'purify-ts';
import { AuthorizedFetch } from '../hooks/useAuthorizedFetch';

export const fetchSounds = async (
  authorizedFetch: AuthorizedFetch,
): Promise<Either<unknown, FreesoundSoundInstance[]>> => {
  try {
    const response = await authorizedFetch(
      'http://localhost:3000/sounds/random',
    ).then((response) => response.json());

    if (!Array.isArray(response)) {
      return Left(Error('Random sounds response is not an array.'));
    }

    return Either.sequence(response.map(FreesoundSoundInstance.decode));
  } catch (e) {
    return Left(e);
  }
};
