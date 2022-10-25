import {
  useInfiniteQuery,
  InfiniteData,
  QueryKey,
  QueryFunctionContext,
} from '@tanstack/react-query';
import { Just, List, Maybe, Nothing } from 'purify-ts';
import { useState } from 'react';
import { bindM, maybeOf } from '../purifyUtils';
import useInterval from './useInterval';

type Cursor = {
  page: number;
  index: number;
};

const DEFAULT_CURSOR: Cursor = {
  page: 0,
  index: 0,
};

type UseInfiniteQueryQueue<T> = {
  currentItem: Maybe<T>;
  hasNext: boolean;
  getNext: () => void;
  isFetching: boolean;
};

const getNextCursorPosition = <T>(
  data: InfiniteData<T[]> | undefined,
  cursor: Cursor,
): Maybe<Cursor> => {
  const { page, index } = cursor;

  return Just({})
    .chain(() => Maybe.fromNullable(data))
    .chain((data) =>
      List.at(page, data.pages).map((currentPage) => ({ data, currentPage })),
    )
    .chain(({ data, currentPage }) => {
      if (index + 1 < currentPage.length) {
        return Just({ page, index: index + 1 });
      }

      if (page + 1 < data.pages.length) {
        return Just({ page: page + 1, index: 0 });
      }

      return Nothing;
    });
};

/**
This hook wraps a queue data structure for infinite queried data, providing a 
simple iterator-like API for accessing this data.

Internally, individual elements of data are accessed via a monotonically 
advancing cursor which indexes into an array of pages of data, while data 
fetching is done via a polling mechanism which will every so often fetch and 
append to the data queue if the end of the queue is a specified length of 
elements away from the cursor.

The purpose of this is to ensure near-seamless navigation through infinite data
despite slow data fetches (like a slow API). This does come at the cost of a
long initial load for now.
 */
export default function useInfiniteQueryQueue<T>(
  pollTime: number,
  stayAheadCount: number,
  ...parameters: Parameters<typeof useInfiniteQuery<T[]>>
): UseInfiniteQueryQueue<T> {
  const [queryKey, queryFn, options] = parameters;
  const [cursor, setCursor] = useState<Cursor>(DEFAULT_CURSOR);

  // These two pieces of state are used to keep track of number counts for a
  // flat index of which element of data the user is currently on and the total
  // length of data since infinite data queried through `react-query` is
  // paginated. This is used so that the app knows how ahead it is in terms of
  // number of sounds so that it can decide whether to keep fetching sounds in
  // the background.
  const [dataLength, setDataLength] = useState(0);
  const [flatCursor, setFlatCursor] = useState(0);

  const { data, error, fetchNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery(
      queryKey,
      async (context: QueryFunctionContext<QueryKey, unknown>) => {
        const result = queryFn(context);

        if (Array.isArray(result)) {
          setDataLength((length) => length + result.length);
        } else {
          const awaitedResult = await result;
          setDataLength((length) => length + awaitedResult.length);
        }

        return result;
      },
      {
        refetchOnWindowFocus: false,
        cacheTime: 0,
        ...options,
      },
    );

  useInterval(
    () => {
      if (data === undefined) {
        return;
      }

      fetchNextPage();
    },
    pollTime,
    !isFetchingNextPage && dataLength - flatCursor < stayAheadCount,
  );

  const getNext = (): void => {
    Just({})
      .chain(bindM('nextCursor', () => getNextCursorPosition<T>(data, cursor)))
      .ifJust(({ nextCursor }) => {
        setCursor(nextCursor);
        setFlatCursor((value) => value + 1);
      });
  };

  const hasNext = getNextCursorPosition<T>(data, cursor).isJust();

  return {
    currentItem: Just({})
      .chain(() => maybeOf(data))
      .chain((data) => List.at(cursor.page, data.pages))
      .chain((page) => List.at(cursor.index, page)),
    hasNext,
    getNext,
    isFetching,
  };
}
