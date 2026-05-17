import { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ThemeProvider } from './contexts/ThemeContext';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import AIChat from './components/AIChat';
import AccessibilityMenu from './components/AccessibilityMenu';
import ScrollToTop from './components/ScrollToTop';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Booking = lazy(() => import('./pages/Booking'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const Accessibility = lazy(() => import('./pages/Accessibility'));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
      >
        <Suspense fallback={<PageLoader />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/accessibility" element={<Accessibility />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  const { t, i18n } = useTranslation();

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
        <ScrollToTop />
        <div className="min-h-screen flex flex-col transition-colors duration-500 overflow-x-hidden">
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:z-[9999] focus:p-4 focus:bg-white focus:text-dark focus:top-0 focus:left-0 focus:font-bold focus:border-2 focus:border-gold"
          >
            {t('accessibility.skip_to_main', 'Skip to main content')}
          </a>
          <Navbar />
          <main id="main-content" className="flex-grow pt-[124px] outline-none" tabIndex="-1">
            <AnimatedRoutes />
          </main>
          <Footer />
          <FloatingWhatsApp />
          <AIChat />
          <AccessibilityMenu />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
