import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DevelopmentBanner from './components/DevelopmentBanner';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import NodeGate from './components/NodeGate';
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
            <Route path="/eggwallet" element={<NodeGate><EggWalletPage /></NodeGate>} />
            <Route path="/hatch-social" element={<NodeGate><HatchSocialPage /></NodeGate>} />
            <Route path="/persona-blockchain" element={<NodeGate><PersonaBlockchainPage /></NodeGate>} />
            <Route path="/incubex" element={<NodeGate><IncubExPage /></NodeGate>} />
            <Route path="/bountybee" element={<NodeGate><BountyBeePage /></NodeGate>} />
          </Routes>
        </main>
        <Footer />
        <div className="grain-overlay" />
      </div>
    </Router>
  );
}

export default App;
