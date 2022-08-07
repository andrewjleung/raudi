import { FreesoundSoundInstance } from '@raudi/types';
import { Either, Left } from 'purify-ts';

export const fetchSounds = async (): Promise<
  Either<unknown, FreesoundSoundInstance[]>
> => {
  try {
    const response = await fetch('http://localhost:3000/sounds/random', {
      credentials: 'include',
    }).then((response) => response.json());

    return Either.sequence(
      (response as Array<unknown>).map(FreesoundSoundInstance.decode),
    );
  } catch (e) {
    return Left(e);
  }
};
