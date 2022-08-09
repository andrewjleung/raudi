import { createContext, useContext, useEffect, useMemo } from 'react';
import { Setter } from '../types';

export enum LoginState {
  Unknown = 'unknown', // Upon first load of application, need to confirm login manually.
  LoggedIn = 'loggedin', // Upon asking the server and confirming login or logging in.
  LoggedOut = 'loggedout', // Upon receiving an unauthorized response or timing out.
}

export type LoginContext = {
  loginState: LoginState;
  setLoginState: Setter<LoginState>;
};

const DEFAULT_LOGIN_CONTEXT: LoginContext = {
  loginState: LoginState.Unknown,
  setLoginState: () => {
    return;
  },
};

export const LoginContext = createContext<LoginContext>(DEFAULT_LOGIN_CONTEXT);

export default function useLogin(): boolean {
  const { loginState, setLoginState } = useContext(LoginContext);

  useEffect(() => {
    const fetchLoginState = async () => {
      const response = await fetch('http://localhost:3000/me', {
        credentials: 'include',
      });

      const isLoggedIn = response.status === 200;
      return isLoggedIn ? LoginState.LoggedIn : LoginState.LoggedOut;
    };

    if (loginState === LoginState.Unknown) {
      fetchLoginState().then(setLoginState);
    }
  }, [loginState, setLoginState]);

  return useMemo(() => loginState === LoginState.LoggedIn, [loginState]);
}
