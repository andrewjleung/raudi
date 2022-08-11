import { FreesoundSoundInstance } from '@raudi/types';
import { Just, Maybe, Nothing } from 'purify-ts';
import { useState } from 'react';
import { fetchSounds } from '../api/soundsApi';
import { useAuthorizedFetch } from './useAuthorizedFetch';
import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';

// TODO: pages may vary in size...
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
  const [soundLocation, setSoundLocation] = useState<SoundLocation>({
    page: 0,
    soundIndex: 0,
  });
  const authorizedFetch = useAuthorizedFetch();

  // TODO: Handle errors?
  const { data, error, fetchNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery(
      ['sounds'],
      () => fetchSounds(authorizedFetch).then((value) => value.unsafeCoerce()),
      {
        refetchOnWindowFocus: false,
        // Random sound data is not inherently paginated, so no pagination params
        // are really necessary here. However, we don't want `react-query` to wipe
        // previous data with each fetch, so just return true here rather than any
        // params.
        getNextPageParam: () => true,
        cacheTime: 0,
      },
    );

  const getNextSound = () => {
    getNextSoundLocation(data, soundLocation).ifJust(setSoundLocation);

    const isAhead = () =>
      data !== undefined &&
      data.pages.length - soundLocation.page >= STAYAHEAD_PAGE_COUNT;

    if (!isFetchingNextPage && !isAhead()) {
      console.log('fetching next page.');
      fetchNextPage();
    }
  };

  return {
    sound: data
      ? Just(data.pages[soundLocation.page][soundLocation.soundIndex])
      : Nothing,
    getNextSound,
    canGetNextSound: getNextSoundLocation(data, soundLocation).isJust(),
    isFetching,
  };
};
