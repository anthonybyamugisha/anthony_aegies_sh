import { Suspense, lazy, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import BackgroundFx from './components/layout/BackgroundFx';
import HudFrame from './components/layout/HudFrame';
import RouteTransition from './components/layout/RouteTransition';
import ThemeTransition from './components/layout/ThemeTransition';
import HomePage from './pages/HomePage';

const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const SkillsPage = lazy(() => import('./pages/SkillsPage'));
const CertsPage = lazy(() => import('./pages/CertsPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const RouteFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="flex items-center gap-3 text-neon text-xs">
      <span className="w-2 h-4 bg-neon animate-blink" />
      <span>loading module</span>
    </div>
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  const reduced = useReducedMotion();

  const initial = reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 };
  const animate = reduced
    ? { opacity: 1, y: 0, transition: { duration: 0 } }
    : { opacity: 1, y: 0, transition: { duration: 0.38, delay: 0.16, ease: EASE_OUT } };
  const exit = reduced
    ? { opacity: 1, transition: { duration: 0 } }
    : { opacity: 0, scale: 1.02, transition: { duration: 0.18, ease: 'easeIn' } };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={location.pathname} className="page-fx" initial={initial} animate={animate} exit={exit}>
        <Suspense fallback={<RouteFallback />}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/certs" element={<CertsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <BackgroundFx />
      <HudFrame />
      <ScrollToTop />

      <div className="relative flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1">
          <AnimatedRoutes />
        </main>

        <Footer />
      </div>

      <RouteTransition />
      <ThemeTransition />
    </Router>
  );
}

export default App;
