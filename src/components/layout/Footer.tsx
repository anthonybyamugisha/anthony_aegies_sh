import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { site, activeSocials } from '../../config/site.data';
import { navLinks } from '../../config/nav.data';

const isLocal = (href: string) => /^(mailto:|tel:)/.test(href);

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-16 border-t border-neon/15">
      <div className="px-6 sm:px-9 py-10">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col-reverse gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Link
                to="/"
                className="group inline-flex items-center gap-1 neon-text font-semibold text-sm"
              >
                <span className="animate-blink">&gt;_</span>
                <span className="text-gray-600 group-hover:text-neon transition-colors">.</span>
                <span>/{site.username}.sh</span>
              </Link>

              <p className="mt-4 text-sm text-gray-400">{site.name}</p>
              <p className="mt-1 text-xs text-gray-600">{site.role}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {activeSocials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  {...(isLocal(href) ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                  aria-label={label}
                  title={label}
                  className="flex w-10 h-10 items-center justify-center border border-neon/20 text-neon transition-colors duration-300 hover:border-neon hover:bg-neon/10 hover:shadow-neon"
                >
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          <p className="mt-4 flex items-center gap-2 text-xs text-gray-500">
            <MapPin className="w-3.5 h-3.5 text-neon/70" strokeWidth={1.5} />
            {site.location}
          </p>

          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-neon/10 pt-5 text-xs sm:flex-row">
            <nav className="flex flex-wrap justify-center gap-x-4 gap-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-gray-600 transition-colors duration-200 hover:text-neon"
                >
                  {link.label.toLowerCase()}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 text-neon/70">
                <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse-dot" />
                {site.systemStatus}
              </span>
              <span className="text-gray-700">|</span>
              <span className="text-gray-600">
                &copy; {year} {site.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
