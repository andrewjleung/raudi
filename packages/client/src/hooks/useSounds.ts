import { FreesoundSoundInstance } from '@raudi/types';
import { Just, Maybe, Nothing } from 'purify-ts';
import { useEffect, useState } from 'react';
import { fetchSounds } from '../api/soundsApi';

const STAYAHEAD_COUNT = 15;

export type UseSounds = {
  sound: Maybe<FreesoundSoundInstance>;
  canGetNextSound: boolean;
  getNextSound: () => void;
  isFetching: boolean;
};

export const useSounds = (
  isLoggedIn: boolean,
  stayAheadCount: number = STAYAHEAD_COUNT,
): UseSounds => {
  const [sounds, setSounds] = useState<Array<FreesoundSoundInstance>>([]);
  const [cursor, setCursor] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const isAhead = sounds.length - cursor >= stayAheadCount;

    if (!isLoggedIn || isFetching || isAhead) {
      return;
    }

    const fetchAndSetSounds = async () => {
      setIsFetching(true);
      const errOrSounds = await fetchSounds();

      // TODO: Do something if no sounds are retrieved, somehow retry?
      errOrSounds.ifRight((newSounds) =>
        setSounds((sounds) => sounds.concat(newSounds)),
      );
      setIsFetching(false);
    };

    fetchAndSetSounds();
  }, [cursor, isFetching, isLoggedIn, sounds.length, stayAheadCount]);

  const canGetNextSound = cursor < sounds.length - 1;

  const getNextSound = () => {
    if (!canGetNextSound) {
      return;
    }

    setCursor((cursor) => cursor + 1);
  };

  return {
    sound: sounds.length > 0 ? Just(sounds[cursor]) : Nothing,
    getNextSound,
    canGetNextSound,
    isFetching,
  };
};
