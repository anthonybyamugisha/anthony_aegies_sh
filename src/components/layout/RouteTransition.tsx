import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { useLocation } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import { navLinks } from '../../config/nav.data';
import { site } from '../../config/site.data';

const DURATION = 900;

interface Run {
  path: string;
  command: string;
  lines: string[];
}

const labelFor = (pathname: string) =>
  navLinks.find((link) => link.to === pathname)?.label.toLowerCase() ?? 'unknown';

const buildRun = (pathname: string): Run => ({
  path: pathname,
  command: `./${site.username}.sh --route ${pathname}`,
  lines: [
    `[ok] resolving ${labelFor(pathname)} route`,
    '[ok] fetching chunk bundle',
    '[ok] session handshake verified',
  ],
});

const RouteTransition = () => {
  const { pathname } = useLocation();
  const reduced = useReducedMotion();
  const [run, setRun] = useState<Run | null>(null);
  const previous = useRef<string | null>(null);

  useEffect(() => {
    if (previous.current === pathname) return;

    const isFirst = previous.current === null;
    previous.current = pathname;

    if (isFirst || reduced) return;

    setRun(buildRun(pathname));
    const id = setTimeout(() => setRun(null), DURATION);
    return () => clearTimeout(id);
  }, [pathname, reduced]);

  if (!run) return null;

  return (
    <div key={run.path} className="route-fx" aria-hidden="true">
      <span className="route-fx-scan" />

      <div className="route-fx-panel">
        <div className="route-fx-inner">
          <p className="route-fx-cmd">
            <span className="text-neon neon-text">&gt;</span>{' '}
            <span
              className="route-fx-type"
              style={{ '--n': run.command.length } as CSSProperties}
            >
              {run.command}
            </span>
            <span className="route-fx-caret" />
          </p>

          <ul className="route-fx-log">
            {run.lines.map((line, i) => (
              <li
                key={line}
                className="route-fx-line"
                style={{ animationDelay: `${360 + i * 65}ms` }}
              >
                {line}
              </li>
            ))}
          </ul>

          <div className="route-fx-bar">
            <span className="route-fx-bar-fill" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteTransition;
