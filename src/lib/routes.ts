export const routePreload: Record<string, () => Promise<unknown>> = {
  '/about': () => import('../pages/AboutPage'),
  '/projects': () => import('../pages/ProjectsPage'),
  '/skills': () => import('../pages/SkillsPage'),
  '/certs': () => import('../pages/CertsPage'),
  '/blog': () => import('../pages/BlogPage'),
  '/contact': () => import('../pages/ContactPage'),
};

export const preloadRoute = (to: string) => {
  void routePreload[to]?.();
};
