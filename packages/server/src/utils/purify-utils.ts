import { Maybe } from 'purify-ts';

const encaseNullable =
  <T, R>(fn: (value: T) => R | undefined | null | void) =>
  (value: T): Maybe<R> =>
    Maybe.encase(() => Maybe.fromNullable(fn(value))).join();

// TODO: Share purify utils between the client/server packages.

export { encaseNullable };
