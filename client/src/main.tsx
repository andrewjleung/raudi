import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import './index.css';
import Login from './routes/login';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
