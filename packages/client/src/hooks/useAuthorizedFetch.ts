import { useContext } from 'react';
import { LoginContext, LoginState } from './useLogin';

export type AuthorizedFetch = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>;

export const useAuthorizedFetch = (): AuthorizedFetch => {
  const { setLoginState } = useContext(LoginContext);

  return async (input: RequestInfo | URL, init?: RequestInit) => {
    const response = await fetch(input, {
      ...init,
      credentials: 'include',
    });

    if (response.status === 401) {
      setLoginState(LoginState.LoggedOut);
    }

    return response;
  };
};
