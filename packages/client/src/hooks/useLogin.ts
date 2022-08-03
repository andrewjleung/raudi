import { createContext, useContext, useEffect, useMemo } from 'react';

enum LoginState {
  Unknown = 'unknown', // Upon first load of application, need to confirm login manually.
  LoggedIn = 'loggedin', // Upon asking the server and confirming login or logging in.
  LoggedOut = 'loggedout', // Upon receiving an unauthorized response or timing out.
}

type LoginContext = {
  loginState: LoginState;
  setLoginState: (value: LoginState) => void;
};

const DEFAULT_LOGIN_CONTEXT: LoginContext = {
  loginState: LoginState.Unknown,
  setLoginState: () => {
    return;
  },
};

const LoginContext = createContext<LoginContext>(DEFAULT_LOGIN_CONTEXT);

const useLogin = () => {
  const { loginState, setLoginState } = useContext(LoginContext);

  useEffect(() => {
    const fetchLoginState = async () => {
      const response = await fetch('http://localhost:3000/me', {
        credentials: 'include',
      });

      const isLoggedIn = response.status === 200;
      return isLoggedIn ? LoginState.LoggedIn : LoginState.LoggedOut;
    };

    switch (loginState) {
      case LoginState.Unknown:
        fetchLoginState().then(setLoginState);
        break;
      case LoginState.LoggedIn:
        break;
      case LoginState.LoggedOut:
        break;
      default:
        setLoginState(LoginState.Unknown);
    }
  }, [loginState, setLoginState]);

  return useMemo(() => loginState === LoginState.LoggedIn, [loginState]);
};

export { LoginState, LoginContext, useLogin };
