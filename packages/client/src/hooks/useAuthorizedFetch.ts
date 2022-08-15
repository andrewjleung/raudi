import { Either, Left, Right } from 'purify-ts';
import useLogin, { LoginState } from './useLogin';

export type AuthorizedFetch = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Either<unknown, unknown>>;

export const useAuthorizedFetch = (): AuthorizedFetch => {
  const { transitionLoginState } = useLogin();

  return async (input: RequestInfo | URL, init?: RequestInit) => {
    try {
      const response = await fetch(input, {
        ...init,
        credentials: 'include',
      });

      if (response.status === 401) {
        transitionLoginState(LoginState.LoggedOut);
      }

      if (!response.ok) {
        // TODO: Better error message?
        return Left(Error('Network response was not ok.'));
      }

      const parsedResponse = await response.json();
      return Right(parsedResponse);
    } catch (e) {
      return Left(e);
    }
  };
};
