import { Either, Left, Right } from 'purify-ts';
import useLogin, { LoginState } from './useLogin';

export type AuthorizedFetch = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Either<unknown, Response>>;

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

      return Right(response);
    } catch (e) {
      return Left(e);
    }
  };
};
