import { ChakraProvider } from '@chakra-ui/react';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { LoginContext, LoginState } from './hooks/useLogin';
import './index.css';
import Login from './routes/login';

const Main = () => {
  const [loginState, setLoginState] = useState<LoginState>(LoginState.Unknown);

  return (
    <React.StrictMode>
      <LoginContext.Provider value={{ loginState, setLoginState }}>
        <ChakraProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </ChakraProvider>
      </LoginContext.Provider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Main />,
);
