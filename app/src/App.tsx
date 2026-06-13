import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DevelopmentBanner from './components/DevelopmentBanner';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import EggWalletPage from './pages/EggWalletPage';
import HatchSocialPage from './pages/HatchSocialPage';
import PersonaBlockchainPage from './pages/PersonaBlockchainPage';
import IncubExPage from './pages/IncubExPage';
import BountyBeePage from './pages/BountyBeePage';
import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-dark text-foreground">
        <DevelopmentBanner />
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/eggwallet" element={<EggWalletPage />} />
            <Route path="/hatch-social" element={<HatchSocialPage />} />
            <Route path="/persona-blockchain" element={<PersonaBlockchainPage />} />
            <Route path="/incubex" element={<IncubExPage />} />
            <Route path="/bountybee" element={<BountyBeePage />} />
          </Routes>
        </main>
        <Footer />
        <div className="grain-overlay" />
      </div>
    </Router>
  );
}

export default App;
