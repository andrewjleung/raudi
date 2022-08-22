import { ChakraProvider } from '@chakra-ui/react';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { LoginContext, LoginState } from './hooks/useLogin';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NavBar from './components/NavBar';

const queryClient = new QueryClient();

const Main = () => {
  const [loginState, setLoginState] = useState<LoginState>(LoginState.Unknown);

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <LoginContext.Provider value={{ loginState, setLoginState }}>
          <ChakraProvider>
            <BrowserRouter>
              <NavBar>
                <Routes>
                  <Route path="/" element={<App />} />
                </Routes>
              </NavBar>
            </BrowserRouter>
          </ChakraProvider>
        </LoginContext.Provider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Main />,
);
