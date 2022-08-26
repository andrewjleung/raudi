import { useToast } from '@chakra-ui/react';
import { config } from '@raudi/types';
import { createContext, useContext, useEffect } from 'react';
import { Setter } from '../types';

export enum LoginState {
  Unknown = 'unknown', // Upon first load of application, need to confirm login manually.
  LoggedIn = 'loggedin', // Upon asking the server and confirming login or logging in.
  LoggedOut = 'loggedout', // Upon receiving an unauthorized response or timing out.
}

const UNKNOWN = LoginState.Unknown;
const LOGGED_IN = LoginState.LoggedIn;
const LOGGED_OUT = LoginState.LoggedOut;

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

type UseLogin = {
  isLoggedIn: boolean;
  transitionLoginState: (newState: LoginState) => void;
};

export default function useLogin(verifyLogin = false): UseLogin {
  const { loginState, setLoginState } = useContext(LoginContext);
  const showLogoutToast = useToast({
    title: 'You have been logged out.',
    description: 'Please login again.',
    status: 'info',
    duration: 5000,
    isClosable: true,
  });

  const transitionLoginState = (newState: LoginState) =>
    setLoginState((oldState) => {
      if (oldState === LOGGED_IN && newState === LOGGED_OUT) {
        showLogoutToast();
      }

      return newState;
    });

  useEffect(() => {
    if (!verifyLogin || loginState !== UNKNOWN) {
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    // TODO: Ensure that only a single `me` request can be in flight at one time.
    const fetchLoginState = async () => {
      const response = await fetch(`${config.serverUrl}/me`, {
        credentials: 'include',
        signal,
      });

      const isLoggedIn = response.status === 200;
      return isLoggedIn ? LoginState.LoggedIn : LoginState.LoggedOut;
    };

    fetchLoginState().then(setLoginState);

    return () => {
      controller.abort();
    };
  }, [loginState, setLoginState, verifyLogin]);

  return {
    isLoggedIn: loginState === LoginState.LoggedIn,
    transitionLoginState,
  };
}
