import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { registerThemeApplier, setTheme, type Theme } from '../../lib/theme';
import MatrixRain from './MatrixRain';

const TOTAL_MS = 680;
const SWAP_MS = Math.round(TOTAL_MS * 0.5);

const BAND_AMP = 7;
const BAND_TEETH = 6;

const triangle = (k: number, total: number) => 1 - Math.abs(2 * ((k / total) % 1) - 1);

const bandClip = (amp: number, teeth: number) => {
  const total = teeth * 2;
  const points: string[] = [];

  for (let k = 0; k <= total; k += 1) {
    const y = ((k / total) * 100).toFixed(2);
    points.push(`${(amp * triangle(k, total)).toFixed(2)}% ${y}%`);
  }

  for (let k = total; k >= 0; k -= 1) {
    const y = ((k / total) * 100).toFixed(2);
    points.push(`${(100 - amp * triangle(k + 1, total)).toFixed(2)}% ${y}%`);
  }

  return `polygon(${points.join(',')})`;
};

const CLIP = bandClip(BAND_AMP, BAND_TEETH);

type Phase = 'idle' | 'collapse' | 'expand';

const ThemeTransition = () => {
  const [phase, setPhase] = useState<Phase>('idle');
  const reduced = useReducedMotion();

  useEffect(() => {
    const timers: number[] = [];
    let busy = false;
    let queued: Theme | null = null;

    const run = () => {
      const target = queued;
      if (!target) return;

      queued = null;
      busy = true;
      setPhase('collapse');

      timers.push(
        window.setTimeout(() => {
          setTheme(target);
          setPhase('expand');
        }, SWAP_MS),
        window.setTimeout(() => {
          setPhase('idle');
          busy = false;
          if (queued) run();
        }, TOTAL_MS),
      );
    };

    const unregister = registerThemeApplier((next) => {
      if (reduced) {
        setTheme(next);
        return;
      }
      queued = next;
      if (!busy) run();
    });

    return () => {
      unregister();
      timers.forEach((id) => window.clearTimeout(id));
      if (queued) setTheme(queued);
    };
  }, [reduced]);

  return (
    <AnimatePresence>
      {phase !== 'idle' && (
        <motion.div
          key="theme-fx"
          className="theme-fx"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          <div className="theme-fx-zig" style={{ clipPath: CLIP }}>
            <div className="theme-fx-zig-inner">
              <MatrixRain />
            </div>
          </div>

          <motion.div
            className="theme-fx-bars"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.45, 0.12, 0] }}
            transition={{ duration: 0.5, times: [0, 0.3, 0.6, 1], ease: 'easeOut' }}
          />

          <motion.div
            className="theme-fx-flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 0.36, times: [0, 0.4, 1], ease: 'easeOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ThemeTransition;
