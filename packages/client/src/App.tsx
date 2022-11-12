import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import NavBar from './components/Nav';
import Footer from './components/Footer';
import About from './routes/About';
import Contact from './routes/Contact';
import PrivacyPolicy from './routes/PrivacyPolicy';
import RandomSounds from './routes/RandomSounds';
import NotFound from './routes/NotFound';
import Home from './routes/Home';
import Genres from './routes/Genres';
import { useSounds } from './hooks/useSounds';
import { useState } from 'react';

const App = () => {
  const [soundsEnabled, setSoundsEnabled] = useState(false);
  const UseSounds = useSounds(soundsEnabled);

  return (
    <div className="flex flex-col min-h-screen box-border px-6 pt-14">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/sounds"
            element={
              <RandomSounds
                UseSounds={UseSounds}
                setSoundsEnabled={setSoundsEnabled}
              />
            }
          />
          <Route path="/genres" element={<Genres />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer className="mt-auto" />
      </BrowserRouter>
    </div>
  );
};

export default App;
