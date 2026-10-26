# MedLink RCM

Next.js (App Router) port of the MedLink RCM redesign prototype. Every page is a real, statically generated route (`/`, `/services`, `/dental-billing`, `/audit`, ...).

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Structure

- `lib/pages.js` — site content (nav, copy, stats) and page markup builders
- `app/page.tsx`, `app/[slug]/page.tsx` — routes and per-page metadata
- `components/` — header/mega menu, footer, theme toggle, and `PageContent` (accordion, savings calculator, resource filters, audit form)
- `app/globals.css` — design tokens and styles (light/dark)
- `public/images/` — photography
