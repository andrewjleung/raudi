import { ChakraProvider, Container } from '@chakra-ui/react';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { LoginContext, LoginState } from './hooks/useLogin';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

const queryClient = new QueryClient();

const Main = () => {
  const [loginState, setLoginState] = useState<LoginState>(LoginState.Unknown);

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <LoginContext.Provider value={{ loginState, setLoginState }}>
          <ChakraProvider>
            <Container>
              <div className="flex flex-col min-h-screen">
                <BrowserRouter>
                  <NavBar />
                  <Routes>
                    <Route path="/" element={<App />} />
                  </Routes>
                  <Footer className="mt-auto" />
                </BrowserRouter>
              </div>
            </Container>
          </ChakraProvider>
        </LoginContext.Provider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Main />,
);
