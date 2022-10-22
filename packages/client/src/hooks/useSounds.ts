import { FreesoundSoundInstance } from '@raudi/common';
import { Just, List, Maybe, Nothing } from 'purify-ts';
import { useEffect, useState } from 'react';
import { fetchSounds } from '../api/soundsApi';
import { useAuthorizedFetch } from './useAuthorizedFetch';
import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import useLogin from './useLogin';
import useInterval from './useInterval';
import mockSounds from '../../mockSounds';

const STAYAHEAD_SOUND_COUNT = 14;
const POLL_TIME = 2000;
const USE_MOCK = false;

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
  const [soundLocation, setSoundLocation] = useState(DEFAULT_SOUND_LOCATION);

  // These two pieces of state are used to keep track of number counts for which
  // sound the user is on and how many sounds there are total, since sound data
  // queried through `react-query` is paginated. This is used so that the app
  // knows how ahead it is in terms of number of sounds so that it can decide
  // whether to keep fetching sounds in the background.
  const [totalSounds, setTotalSounds] = useState(0);
  const [currentSound, setCurrentSound] = useState(1);

  const authorizedFetch = useAuthorizedFetch();
  const { isLoggedIn } = useLogin();

  // TODO: Handle errors?
  const { data, error, fetchNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery(
      ['sounds', isLoggedIn],
      () => {
        if (USE_MOCK) {
          return mockSounds;
        }

        // TODO: Handle errors.
        return fetchSounds(authorizedFetch).then((value) => {
          const page = value.unsafeCoerce();
          setTotalSounds((totalSounds) => totalSounds + page.length);
          return page;
        });
      },
      {
        refetchOnWindowFocus: false,
        // Random sound data is not inherently paginated, so no pagination
        // params are really necessary here. However, we don't want
        // `react-query` to wipe previous data with each fetch, so just return
        // true here rather than any params.
        getNextPageParam: () => isLoggedIn,
        cacheTime: 0,
        enabled: isLoggedIn,
        initialData: USE_MOCK
          ? {
              pages: [mockSounds],
              pageParams: [0],
            }
          : undefined,
      },
    );

  useInterval(
    () => {
      if (data === undefined) {
        return;
      }

      fetchNextPage();
    },
    POLL_TIME,
    !USE_MOCK &&
      !isFetchingNextPage &&
      totalSounds - currentSound < STAYAHEAD_SOUND_COUNT,
  );

  const getNextSound = () =>
    getNextSoundLocation(data, soundLocation).ifJust((soundLocation) => {
      setCurrentSound((currentSound) => currentSound + 1);
      setSoundLocation(soundLocation);
    });

  // Reset the sound location when the user gets logged out.
  // TODO: This may be an anti-pattern according to the React beta docs:
  // https://beta.reactjs.org/learn/you-might-not-need-an-effect
  // Not 100% sure since this is a hook...
  useEffect(() => {
    if (!isLoggedIn) {
      setSoundLocation(DEFAULT_SOUND_LOCATION);
      setTotalSounds(0);
      setCurrentSound(1);
    }
  }, [isLoggedIn]);

  return {
    sound: Just({})
      .chain(() => Maybe.fromFalsy(isLoggedIn))
      .chain(() => Maybe.fromFalsy(data))
      .chain((data) => List.at(soundLocation.page, data.pages))
      .chain((page) => List.at(soundLocation.soundIndex, page)),
    getNextSound,
    canGetNextSound: getNextSoundLocation(data, soundLocation).isJust(),
    isFetching,
  };
};
