import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useTheme } from '../../lib/theme';

type RGB = [number, number, number];

const GLYPHS = '01';
const FALLBACK_BG: RGB = [4, 6, 4];
const FALLBACK_ACCENT: RGB = [0, 255, 65];
const HEAD_MIX: RGB = [226, 255, 235];
const MAX_DPR = 2;
const LINE_HEIGHT = 1.22;

const MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

const clamp = (value: number, min: number, max: number) =>
  value < min ? min : value > max ? max : value;

const rnd = (min: number, max: number) => min + Math.random() * (max - min);

const mix = (a: RGB, b: RGB, t: number): RGB => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

const rgba = (c: RGB, alpha: number) =>
  `rgba(${Math.round(c[0])}, ${Math.round(c[1])}, ${Math.round(c[2])}, ${alpha})`;

const readVar = (name: string, fallback: RGB): RGB => {
  if (typeof window === 'undefined') return fallback;
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  if (!raw) return fallback;
  const parts = raw.split(/[\s,]+/).map(Number);
  if (parts.length < 3 || parts.some((n) => !Number.isFinite(n))) return fallback;
  return [parts[0], parts[1], parts[2]];
};

const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

interface Column {
  x: number;
  y: number;
  speed: number;
  size: number;
  trail: number;
  bright: number;
  vivid: boolean;
  glyphs: string[];
}

interface LayerSpec {
  font: [number, number];
  speed: [number, number];
  trail: [number, number];
  bright: [number, number];
  vividChance: number;
  area: number;
  minColumns: number;
  maxColumns: number;
  fade: number;
}

const LAYERS: Record<'far' | 'near', LayerSpec> = {
  far: {
    font: [9, 13],
    speed: [3, 7],
    trail: [6, 12],
    bright: [0.1, 0.32],
    vividChance: 0,
    area: 46000,
    minColumns: 12,
    maxColumns: 34,
    fade: 0.055,
  },
  near: {
    font: [13, 19],
    speed: [7, 26],
    trail: [10, 22],
    bright: [0.35, 1],
    vividChance: 0.22,
    area: 30000,
    minColumns: 16,
    maxColumns: 46,
    fade: 0.085,
  },
};

const MatrixRain = () => {
  const theme = useTheme();
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const farRef = useRef<HTMLCanvasElement>(null);
  const nearRef = useRef<HTMLCanvasElement>(null);
  const repaintRef = useRef<(() => void) | null>(null);

  const targetBg = useRef<RGB>(FALLBACK_BG);
  const targetAccent = useRef<RGB>(FALLBACK_ACCENT);
  const liveBg = useRef<RGB>(FALLBACK_BG);
  const liveAccent = useRef<RGB>(FALLBACK_ACCENT);

  useEffect(() => {
    if (reduced) repaintRef.current?.();
  }, [theme, reduced]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const farCanvas = farRef.current;
    const nearCanvas = nearRef.current;
    if (!wrap || !farCanvas || !nearCanvas) return;

    targetBg.current = readVar('--c-bg', FALLBACK_BG);
    targetAccent.current = readVar('--c-accent', FALLBACK_ACCENT);
    liveBg.current = targetBg.current;
    liveAccent.current = targetAccent.current;

    let width = 0;
    let height = 0;
    let frame = 0;
    let last = 0;
    let running = true;

    const columns: Record<'far' | 'near', Column[]> = { far: [], near: [] };
    const contexts: Record<'far' | 'near', CanvasRenderingContext2D | null> = {
      far: null,
      near: null,
    };

    const buildColumns = (key: 'far' | 'near') => {
      const spec = LAYERS[key];
      const count = clamp(
        Math.round((width * height) / spec.area),
        spec.minColumns,
        spec.maxColumns,
      );
      const slot = width / count;
      const next: Column[] = [];

      for (let i = 0; i < count; i += 1) {
        const trail = Math.round(rnd(spec.trail[0], spec.trail[1]));
        const glyphs: string[] = new Array(trail);
        for (let g = 0; g < trail; g += 1) glyphs[g] = randomGlyph();

        next.push({
          x: (i + 0.5 + rnd(-0.34, 0.34)) * slot,
          y: rnd(-trail, height),
          speed: rnd(spec.speed[0], spec.speed[1]),
          size: Math.round(rnd(spec.font[0], spec.font[1])),
          trail,
          bright: rnd(spec.bright[0], spec.bright[1]),
          vivid: Math.random() < spec.vividChance,
          glyphs,
        });
      }

      columns[key] = next;
    };

    const clear = (key: 'far' | 'near') => {
      const ctx = contexts[key];
      if (!ctx) return;
      ctx.save();
      ctx.shadowBlur = 0;
      ctx.fillStyle = rgba(liveBg.current, 1);
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      const dpr = Math.min(MAX_DPR, window.devicePixelRatio || 1);

      (['far', 'near'] as const).forEach((key) => {
        const canvas = key === 'far' ? farCanvas : nearCanvas;
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
        }
        contexts[key] = ctx;

        buildColumns(key);
        clear(key);
      });
    };

    const paint = (key: 'far' | 'near', dt: number) => {
      const ctx = contexts[key];
      if (!ctx) return;

      const spec = LAYERS[key];
      const accent = liveAccent.current;
      const headColor = mix(accent, HEAD_MIX, 0.62);
      const bottom = height + spec.font[1] * LINE_HEIGHT * 2;

      ctx.fillStyle = rgba(liveBg.current, spec.fade);
      ctx.fillRect(0, 0, width, height);

      for (const col of columns[key]) {
        const rh = col.size * LINE_HEIGHT;
        col.y += col.speed * dt;

        if (col.y - col.trail > bottom / rh) {
          col.y = -rnd(0, col.trail);
          col.speed = rnd(spec.speed[0], spec.speed[1]);
        }

        if (col.trail > 2 && Math.random() < 0.06) {
          col.glyphs[Math.floor(Math.random() * col.trail)] = randomGlyph();
        }

        const head = Math.floor(col.y);
        ctx.font = `500 ${col.size}px ${MONO}`;

        for (let i = 0; i < col.trail; i += 1) {
          const top = (head - i) * rh;
          if (top < -rh || top > height) continue;

          if (i === 0) {
            if (col.vivid) {
              ctx.shadowBlur = 9;
              ctx.shadowColor = rgba(accent, 0.65);
            } else {
              ctx.shadowBlur = 0;
            }
            ctx.fillStyle = rgba(headColor, 0.5 + col.bright * 0.5);
          } else {
            const falloff = (1 - i / col.trail) ** 1.7;
            ctx.fillStyle = rgba(accent, falloff * col.bright * 0.85);
          }

          ctx.fillText(col.glyphs[i % col.glyphs.length], col.x, top);
        }
      }

      ctx.shadowBlur = 0;
    };

    const paintStatic = () => {
      liveBg.current = targetBg.current;
      liveAccent.current = targetAccent.current;
      clear('far');
      clear('near');
      paint('far', 0);
      paint('near', 0);
    };

    const tick = (now: number) => {
      if (!running) return;
      if (!last) last = now;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      liveBg.current = mix(liveBg.current, targetBg.current, 0.08);
      liveAccent.current = mix(liveAccent.current, targetAccent.current, 0.08);

      paint('far', dt);
      paint('near', dt);

      frame = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(frame);
      } else if (!running) {
        running = true;
        last = 0;
        frame = requestAnimationFrame(tick);
      }
    };

    repaintRef.current = reduced ? paintStatic : null;

    const observer = new ResizeObserver(() => {
      resize();
      if (reduced) paintStatic();
    });
    observer.observe(wrap);

    document.addEventListener('visibilitychange', onVisibility);

    resize();
    if (reduced) paintStatic();
    else frame = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      repaintRef.current = null;
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reduced]);

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden">
      <canvas ref={farRef} className="matrix-layer matrix-layer-far" />
      <canvas ref={nearRef} className="matrix-layer matrix-layer-near" />
    </div>
  );
};

export default MatrixRain;
