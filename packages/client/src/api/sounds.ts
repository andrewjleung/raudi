import { FreesoundSoundInstance } from '@raudi/types';
import { Either, Maybe } from 'purify-ts';

export const fetchSounds = async (): Promise<
  Maybe<FreesoundSoundInstance[]>
> => {
  const response = await fetch('http://localhost:3000/sounds/random', {
    credentials: 'include',
  }).then((response) => response.json());

  if (response.status != 200) {
    // TODO: Handle error.
    console.log(response.statusText);
  }

  return Either.sequence(
    (response as Array<unknown>).map(FreesoundSoundInstance.decode),
  ).toMaybe();
};
