import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import { ThemeProvider } from './contexts/ThemeContext';
import AdminDashboard from './pages/admin/AdminDashboard';
import FloatingWhatsApp from './components/FloatingWhatsApp';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Set direction and language on body
    document.body.dir = i18n.dir();
    document.documentElement.lang = i18n.language;
    
    // Premium Brand Typography System
    if (i18n.language === 'he') {
      document.body.style.fontFamily = "var(--font-hebrew)";
    } else {
      document.body.style.fontFamily = "var(--font-inter)";
    }
  }, [i18n, i18n.language]);

  return (
    <ThemeProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <div className="min-h-screen flex flex-col transition-colors duration-300">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
          <FloatingWhatsApp />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
