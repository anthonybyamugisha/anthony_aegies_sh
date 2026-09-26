import { useSyncExternalStore } from 'react';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'anthony-theme';

const safeStorage = () => {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

const readInitial = (): Theme =>
  typeof document !== 'undefined' && document.documentElement.dataset.theme === 'light'
    ? 'light'
    : 'dark';

let current: Theme = readInitial();

const listeners = new Set<() => void>();

const emit = () => {
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const getTheme = () => current;

export const setTheme = (theme: Theme) => {
  current = theme;
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  safeStorage()?.setItem(STORAGE_KEY, theme);
  emit();
};

export const useTheme = () =>
  useSyncExternalStore(
    subscribe,
    getTheme,
    (): Theme => 'dark',
  );

type ThemeApplier = (next: Theme) => void;

let applier: ThemeApplier | null = null;

export const registerThemeApplier = (fn: ThemeApplier) => {
  applier = fn;
  return () => {
    if (applier === fn) applier = null;
  };
};

export const requestTheme = (next: Theme) => {
  if (next === current) return;
  if (applier) applier(next);
  else setTheme(next);
};

export const toggleTheme = () =>
  requestTheme(current === 'dark' ? 'light' : 'dark');
