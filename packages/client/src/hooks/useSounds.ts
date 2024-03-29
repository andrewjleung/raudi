import { FreesoundSoundInstance } from '@raudi/common';
import { Just, Maybe } from 'purify-ts';
import { fetchSounds } from '../api/raudiApi';
import { useAuthorizedFetch } from './useAuthorizedFetch';
import useLogin from './useLogin';
import useInfiniteQueryQueue from './useInfiniteQueryQueue';
import mockSounds from '../../mockSounds';

const STAYAHEAD_SOUND_COUNT = 14;
const POLL_TIME = 2000;

export type UseSounds = {
  sound: Maybe<FreesoundSoundInstance>;
  canGetNextSound: boolean;
  getNextSound: () => void;
  isFetching: boolean;
};

// TODO: Sounds should only be actively fetched if the user is logged in and is
// on the sounds screen.
export const useSounds = (enabled: boolean): UseSounds => {
  const authorizedFetch = useAuthorizedFetch();
  const { isLoggedIn } = useLogin();

  const { currentItem, hasNext, getNext, isFetching } = useInfiniteQueryQueue(
    POLL_TIME,
    STAYAHEAD_SOUND_COUNT,
    ['sounds', isLoggedIn],
    () => fetchSounds(authorizedFetch),
    {
      // Random sound data is not inherently paginated, so no pagination params
      // are really necessary here. However, we don't want `react-query` to wipe
      // previous data with each fetch, so just return true here rather than any
      // params.
      getNextPageParam: () => true,
      enabled: isLoggedIn && enabled,
    },
  );

  return {
    sound: Just({})
      .chain(() => Maybe.fromFalsy(isLoggedIn))
      .chain(() => currentItem),
    canGetNextSound: hasNext,
    getNextSound: getNext,
    isFetching,
  };
};
