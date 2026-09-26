# Anthony Aegies

Personal portfolio and terminal/HUD-styled site for **Anthony Byamugisha** — final-year Computer
Science student at Makerere University, focused on cybersecurity, security operations, threat
detection and SIEM log analysis.

Built as a data-driven React single-page app: all editable content lives in `src/config/`, so the
pages themselves contain no hardcoded personal details.

- **GitHub** — https://github.com/anthonybyamugisha
- **LinkedIn** — https://www.linkedin.com/in/anthonybyamugisha/
- **Email** — byamugishanthony@gmail.com
- **WhatsApp** — +256 748 161 708

## Features

- **Terminal / HUD aesthetic** — near-black surfaces, neon-green accent, JetBrains Mono, technical
  grid, CRT scanlines, and an inset HUD frame with corner brackets.
- **Dark and light themes** — CSS-variable driven, persisted to `localStorage`, with a pre-React
  bootstrap in `index.html` so there is no flash of the wrong theme on load.
- **Command-style route transitions** — a full-screen overlay types `./anthony.sh --route /projects`,
  logs `[ok]` lines, fills a progress bar, then wipes away. Built on
  `AnimatePresence mode="wait"` with route-level lazy loading and hover/focus chunk prefetching.
- **Zigzag theme transition** — switching themes plays a serrated-edge wipe carrying Matrix binary
  rain. The band fully covers the viewport at the midpoint so the theme swap is never visible. The
  rain is mounted *only* during this transition, never as a persistent background.
- **Matrix rain renderer** — dual-canvas (`src/components/layout/MatrixRain.tsx`) with independent
  per-column speed, glyph size, trail length, brightness and blur, DPR-aware, paused on tab blur.
- **Reveal-on-scroll** throughout, plus a dedicated contact panel, tag filtering on `/projects`,
  status filtering on certifications, skills proficiency bars, and a Hashnode-backed blog.
- **Certification filtering** — `all` / `completed` / `in progress` / `planned` tabs with live counts,
  on both the home page and `/certs`. The home page limits the grid to four cards and links out to
  `/certs` for the rest; the limit applies *after* filtering, so the "view all" link disappears when
  a filter already fits inside the limit.
- **Credential links** — each certification can carry a `credentialUrl`, rendered as a
  "show credential" link.
- **Spam protection** — the contact form uses a hidden honeypot field; bot submissions short-circuit
  without hitting the EmailJS quota.

Motion is reduced when the user asks for it. `useReducedMotion()` gates the Framer Motion work —
`App.tsx`, `MatrixRain`, `RouteTransition`, `ThemeTransition` and `Reveal` — and a global
`prefers-reduced-motion` block in `index.css` collapses CSS transitions, keyframe animations and
smooth scrolling to a single frame. The route wipe and page sweep are hidden outright. State changes
still happen; only the movement goes away.

## Tech stack

| | |
| --- | --- |
| React 18 + TypeScript 5 | UI and routing |
| Vite 5 | Dev server, build, manual vendor chunks |
| React Router 6 | Client-side routing |
| Tailwind CSS 3 | Utility styling, with theme tokens in CSS variables |
| Framer Motion 11 | Page, overlay and scroll-reveal animation |
| lucide-react | Icons |
| EmailJS | Contact form delivery |
| graphql-request | Hashnode blog queries |

## Getting started

Requires **Node.js 18+**.

```bash
npm install
npm run dev          # http://localhost:5173
```

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |
| `npx tsc -b --noEmit` | Type-check without emitting |
| `npm run deploy` | Convenience: `git add . && git commit && git push -u origin main` |

> `vite build` does not type-check. Run `npx tsc -b --noEmit` before deploying.

> `npm run deploy` commits **everything** in the working tree. Review `git status` first, or prefer
> running your own commit.

## Environment variables

Copy `.env.example` to `.env` and fill in what you need. All variables are optional — the site
degrades gracefully when they are absent.

```bash
cp .env.example .env
```

| Variable | Purpose | If unset |
| --- | --- | --- |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service | Contact panel shows an offline notice with a `mailto:` fallback instead of the form |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template | as above |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key | as above |
| `VITE_HASHNODE_HOST` | Hashnode GraphQL endpoint | Blog page shows a prompt to set the variable |
| `VITE_HASHNODE_TOKEN` | Hashnode API token | as above |

Never commit `.env` — it is already in `.gitignore`.

## Project structure

```
src/
  App.tsx                     Router, lazy routes, page transitions, overlays
  index.css                   Theme variables, component classes, keyframes
  assets/images/              Static images
  components/
    layout/
      Navbar.tsx              Terminal nav, clock, status, theme toggle
      Footer.tsx              Dedicated footer with social channels
      BackgroundFx.tsx        Grid, glows, vignette, scanlines
      HudFrame.tsx            Inset viewport frame and corner brackets
      MatrixRain.tsx          Dual-canvas binary rain (transition only)
      RouteTransition.tsx     Command-style route wipe
      ThemeTransition.tsx     Zigzag theme-swap wipe
    ui/                       Reusable primitives
      Reveal.tsx              Scroll-reveal wrapper
      SectionHeading.tsx      Numbered section heading
      SectionNav.tsx          Top/bottom prev-next section links
      ActionButton.tsx        primary / outline / muted button
      ThemeToggle.tsx         Dark/light switch
      ProjectCard.tsx
      SkillBar.tsx
    About.tsx Projects.tsx Skills.tsx Certifications.tsx
    Contact.tsx Hero.tsx      Section components
  config/                     All editable content
    site.data.ts              Identity, contact details, socials, hero CTAs
    nav.data.ts               Navigation routes and icons
    projects.data.ts          Projects and filter tags
    skills.data.ts            Proficiency and stack groups
    certifications.data.ts    Certifications, education, experience, stats
  lib/
    theme.ts                  Theme store, persistence, transition applier
    routes.ts                 Lazy route loaders and prefetch helper
  pages/                      Route-level components (lazy loaded)
public/
  robots.txt                  Allow-all + sitemap pointer
```

## Routes

`/` · `/about` · `/projects` · `/skills` · `/certs` · `/blog` · `/contact` · `*` (404)

The home page renders every section; the remaining routes render a single section each.

## Customization

Most edits need no component changes:

- **Profile, email, phone, WhatsApp, socials, location, hero CTAs** — `src/config/site.data.ts`.
  Setting `whatsapp` adds a WhatsApp row that links through `wa.me`; adding `phone` and `resumeUrl`
  reveals a `tel:` row in the contact panel and swaps the hero's secondary CTA to a download button.
- **Navigation** — `src/config/nav.data.ts`.
- **Projects, skills, certifications, education, experience** — the matching files in `src/config/`.
  Certification records take a `status` of `CERTIFIED`, `IN PROGRESS` or `PLANNED`; the filter tabs
  and the header counts are derived from that field, so nothing needs updating by hand.
- **Certifications on the home page** — `src/pages/HomePage.tsx` renders
  `<Certifications limit={4} showFilters />`. Raise or drop the limit to change how many cards appear
  before the `/certs` link; drop `showFilters` to hide the tabs.
- **Colours and spacing** — the `--c-*` custom properties at the top of `src/index.css`. Both themes
  are defined there; Tailwind colour tokens in `tailwind.config.js` resolve from those variables, so
  changing a variable updates utilities, components and the canvas rain together.
- **SEO title, description, and Open Graph tags** — `index.html`. These still contain `YOUR_`
  placeholders and should be filled in before deploying.
- **Theme transition timing and zigzag shape** — `TOTAL_MS`, `BAND_AMP` and `BAND_TEETH` at the top
  of `src/components/layout/ThemeTransition.tsx`.

## Before you deploy

`YOUR_` placeholders remain in three files. Searching for `YOUR_` should return hits only in these
locations once you are done:

| File | Placeholder | What to put there |
| --- | --- | --- |
| `index.html` | `YOUR_SITE_URL` | Live origin, used by `canonical`, `og:url` and JSON-LD `url` |
| `index.html` | `YOUR_OG_IMAGE_URL` | Absolute 1200×630 image URL for link previews |
| `index.html` | `YOUR_VERIFICATION_CODE` | Google Search Console verification token |
| `sitemap.xml` | `YOUR_SITE_URL` | Same origin, as the prefix for every `<loc>` |

Also confirm:

- `public/robots.txt` has the same origin in its `Sitemap:` line.
- `sitemap.xml` lists every indexable route. `/about` and `/skills` are not listed by default.
- EmailJS variables exist in the host's build environment, not only in your local `.env` — Vite
  inlines them at build time, so a stale build ships the offline notice.
- A real submission has been sent through the form end to end.

## Deployment

`npm run build` outputs a static site to `dist/`, deployable to any static host.

`vercel.json` rewrites all paths to `/index.html` so client-side routes resolve on refresh. Netlify
users need an equivalent redirect.

Note that the Vite dev server and most static hosts return HTTP 200 for unknown paths, so the 404
page is client-side only — check it renders by visiting a bogus URL directly.
