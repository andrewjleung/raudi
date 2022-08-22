import { FreesoundSoundInstance } from '@raudi/types';
import { Just, Maybe, Nothing } from 'purify-ts';
import { useEffect, useState } from 'react';
import { fetchSounds } from '../api/soundsApi';
import { useAuthorizedFetch } from './useAuthorizedFetch';
import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import useLogin from './useLogin';

const STAYAHEAD_PAGE_COUNT = 3;

export type UseSounds = {
  sound: Maybe<FreesoundSoundInstance>;
  canGetNextSound: boolean;
  getNextSound: () => void;
  isFetching: boolean;
};

type SoundLocation = {
  page: number;
  soundIndex: number;
};

const DEFAULT_SOUND_LOCATION: SoundLocation = {
  page: 0,
  soundIndex: 0,
};

const getNextSoundLocation = (
  data: InfiniteData<Array<FreesoundSoundInstance>> | undefined,
  soundLocation: SoundLocation,
): Maybe<SoundLocation> => {
  if (data === undefined) {
    return Nothing;
  }

  const { page, soundIndex } = soundLocation;
  const currentPage = data.pages[page];

  if (soundIndex + 1 < currentPage.length) {
    return Just({ page, soundIndex: soundIndex + 1 });
  }

  if (page + 1 < data.pages.length) {
    return Just({ page: page + 1, soundIndex: 0 });
  }

  return Nothing;
};

// TODO: Cleanup sounds after a certain threshold, currently they will keep
//       building up forever.
export const useSounds = (): UseSounds => {
  const [soundLocation, setSoundLocation] = useState<SoundLocation>(
    DEFAULT_SOUND_LOCATION,
  );
  const authorizedFetch = useAuthorizedFetch();
  const { isLoggedIn } = useLogin();

  // TODO: Handle errors?
  const { data, error, fetchNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery(
      ['sounds', isLoggedIn],
      () => fetchSounds(authorizedFetch).then((value) => value.unsafeCoerce()),
      {
        refetchOnWindowFocus: false,
        // Random sound data is not inherently paginated, so no pagination
        // params are really necessary here. However, we don't want
        // `react-query` to wipe previous data with each fetch, so just return
        // true here rather than any params.
        getNextPageParam: () => isLoggedIn,
        cacheTime: 0,
        enabled: isLoggedIn,
      },
    );

  const getNextSound = () => {
    getNextSoundLocation(data, soundLocation).ifJust(setSoundLocation);

    const isAhead = () =>
      data !== undefined &&
      data.pages.length - soundLocation.page >= STAYAHEAD_PAGE_COUNT;

    if (!isFetchingNextPage && !isAhead()) {
      fetchNextPage();
    }
  };

  // Reset the sound location when the user gets logged out.
  useEffect(() => {
    if (!isLoggedIn) {
      setSoundLocation(DEFAULT_SOUND_LOCATION);
    }
  }, [isLoggedIn]);

  return {
    sound:
      isLoggedIn && data
        ? // TODO: ensure this access is safe.
          Just(data.pages[soundLocation.page][soundLocation.soundIndex])
      : Nothing,
    getNextSound,
    canGetNextSound: getNextSoundLocation(data, soundLocation).isJust(),
    isFetching,
  };
};
