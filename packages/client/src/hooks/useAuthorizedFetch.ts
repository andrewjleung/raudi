import { Either, EitherAsync, Left, Maybe, Right } from 'purify-ts';
import useLogin, { LoginState } from './useLogin';

export type AuthorizedFetch = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Either<unknown, Response>>;

export const useAuthorizedFetch = (): AuthorizedFetch => {
  const { transitionLoginState } = useLogin();

  return async (input: RequestInfo | URL, init?: RequestInit) =>
    EitherAsync.fromPromise(() =>
      fetch(input, {
        ...init,
        credentials: 'include',
      })
        .then(Right)
        .catch(Left),
    )
      .ifRight((response) => {
        if (response.status === 401) {
          transitionLoginState(LoginState.LoggedOut);
        }
      })
      .chain((response) =>
        EitherAsync.liftEither(
          Maybe.fromFalsy(response.ok)
            .toEither('Network response was not ok.')
            .map(() => response),
        ),
      );
};
