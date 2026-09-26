const varColor = (name) => `rgb(var(${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: varColor('--c-bg'),
          900: varColor('--c-bg'),
          800: varColor('--c-surface'),
          700: varColor('--c-surface-2'),
          600: varColor('--c-surface-3'),
          500: varColor('--c-surface-3'),
          400: varColor('--c-border'),
        },
        neon: {
          DEFAULT: varColor('--c-accent'),
          bright: varColor('--c-accent-bright'),
          mid: varColor('--c-accent-mid'),
          dim: varColor('--c-accent-dim'),
          deep: varColor('--c-accent-deep'),
        },
        gray: {
          50: varColor('--c-ink-1'),
          100: varColor('--c-ink-1'),
          200: varColor('--c-ink-1'),
          300: varColor('--c-ink-2'),
          400: varColor('--c-ink-2'),
          500: varColor('--c-ink-3'),
          600: varColor('--c-ink-4'),
          700: varColor('--c-ink-5'),
          800: varColor('--c-ink-5'),
          900: varColor('--c-ink-5'),
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        neon: '0 0 12px rgb(var(--c-accent) / 0.35)',
        'neon-lg': '0 0 28px rgb(var(--c-accent) / 0.28)',
        'neon-inset': 'inset 0 0 20px rgb(var(--c-accent) / 0.08)',
      },
      animation: {
        blink: 'blink 1.1s step-end infinite',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite',
        'chevron-bounce': 'chevron-bounce 2.2s ease-in-out infinite',
        'grid-drift': 'grid-drift 24s linear infinite',
        flicker: 'flicker 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
