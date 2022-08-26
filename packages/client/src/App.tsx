import { Container } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import About from './routes/About';
import Contact from './routes/Contact';
import PrivacyPolicy from './routes/PrivacyPolicy';
import { useSounds } from './hooks/useSounds';
import Home from './routes/Home';

const App = () => {
  const UseSounds = useSounds();

  return (
    <Container>
      <div className="flex flex-col min-h-screen">
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home UseSounds={UseSounds} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>
          <Footer className="mt-auto" />
        </BrowserRouter>
      </div>
    </Container>
  );
};

export default App;
