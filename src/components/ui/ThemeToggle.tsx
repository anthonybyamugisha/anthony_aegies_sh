import { Moon, Sun } from 'lucide-react';
import { useTheme, toggleTheme } from '../../lib/theme';

const ThemeToggle = () => {
  const theme = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      title={isDark ? 'Light theme' : 'Dark theme'}
      className="flex items-center justify-center w-8 h-8 border border-neon/25 text-neon transition-all duration-300 hover:border-neon hover:shadow-neon hover:bg-neon/10"
    >
      {isDark ? (
        <Sun className="w-4 h-4 animate-flicker" strokeWidth={1.5} />
      ) : (
        <Moon className="w-4 h-4" strokeWidth={1.5} />
      )}
    </button>
  );
};

export default ThemeToggle;
