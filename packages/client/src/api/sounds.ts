import { FreesoundSoundInstance } from '@raudi/types';
import { Maybe } from 'purify-ts';

export const fetchSound = async (): Promise<Maybe<FreesoundSoundInstance>> => {
  const response = await fetch('http://localhost:3000/sounds/random', {
    credentials: 'include',
  }).then((response) => response.json());

  if (response.status != 200) {
    // TODO: Handle error.
    console.log(response.statusText);
  }

  return FreesoundSoundInstance.decode(response).ifLeft(console.log).toMaybe();
};
