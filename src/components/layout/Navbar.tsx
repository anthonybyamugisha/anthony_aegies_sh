import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { navLinks, isExternal } from '../../config/nav.data';
import { site } from '../../config/site.data';
import { preloadRoute } from '../../lib/routes';
import ThemeToggle from '../ui/ThemeToggle';

const useClock = () => {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return time.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
};

const Navbar = () => {
  const clock = useClock();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const renderLink = (link: (typeof navLinks)[number], onNavigate?: () => void) => {
    const Icon = link.icon;
    const base =
      'flex items-center gap-2 px-2 py-1.5 text-xs tracking-wide transition-colors duration-200';

    if (isExternal(link.to)) {
      return (
        <a
          key={link.to}
          href={link.to}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} text-gray-500 hover:text-neon`}
        >
          <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
          {link.label}
        </a>
      );
    }

    return (
      <NavLink
        key={link.to}
        to={link.to}
        onClick={onNavigate}
        onMouseEnter={() => preloadRoute(link.to)}
        onFocus={() => preloadRoute(link.to)}
        className={({ isActive }) =>
          `${base} ${isActive ? 'text-neon' : 'text-gray-500 hover:text-neon'}`
        }
      >
        <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
        {link.label}
      </NavLink>
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b border-neon/10 bg-base-900/85 backdrop-blur-md">
      <div className="px-6 sm:px-9">
        <div className="h-14 flex items-center justify-between gap-4">
          <Link to="/" className="shrink-0 group flex items-center gap-1 neon-text font-semibold text-sm">
            <span className="animate-blink">&gt;_</span>
            <span className="text-gray-600 group-hover:text-neon transition-colors">.</span>
            <span>/{site.username}.sh</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => renderLink(link))}
          </nav>

          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <span className="text-neon text-sm tabular-nums tracking-wider animate-flicker">
              {clock}
            </span>
            <span className="w-px h-4 bg-neon/30" />
            <span className="flex items-center gap-2 text-neon text-xs tracking-[0.2em]">
              <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse-dot" />
              {site.systemStatus}
            </span>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              className="text-neon p-1"
            >
              {isOpen ? (
                <X className="w-5 h-5" strokeWidth={1.5} />
              ) : (
                <Menu className="w-5 h-5" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden border-t border-neon/10 bg-base-800/95"
          >
            <div className="px-6 sm:px-9 py-4 grid grid-cols-2 gap-1">
              {navLinks.map((link) => renderLink(link, () => setIsOpen(false)))}
            </div>

            <div className="px-6 sm:px-9 pb-4 pt-2 flex items-center gap-4 border-t border-neon/10">
              <span className="text-neon text-sm tabular-nums">{clock}</span>
              <span className="w-px h-4 bg-neon/30" />
              <span className="flex items-center gap-2 text-neon text-xs tracking-[0.2em]">
                <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse-dot" />
                {site.systemStatus}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
