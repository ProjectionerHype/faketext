# FakeText.fun

A free fake chat & comment screenshot generator targeting the domain `faketext.fun`. Built as a heavily SEO-optimized React + Vite single-page app.

## Stack
- pnpm monorepo (workspace) — main artifact at `artifacts/faketext` (web, previewPath `/`).
- React + Vite + TypeScript + Tailwind v4, wouter routing, framer-motion, react-icons, lucide-react.
- `html-to-image` for PNG download / clipboard copy.

## Structure
- `src/App.tsx` — wouter router with `BASE_URL` base.
- `src/index.css` — purple→magenta theme, full light/dark CSS variables.
- `src/components/SiteShell.tsx` — header/footer/dark-mode toggle.
- `src/components/GeneratorLayout.tsx` — shared layout with download/copy PNG.
- `src/components/MessageEditor.tsx` — chat message + contact panel + Avatar/StatusBar primitives.
- `src/components/CommentEditor.tsx` — post panel + comments editor + verified badge.
- `src/pages/Landing.tsx` — SEO-rich landing (hero, app grids, how-it-works, use-cases, FAQ, JSON-LD).
- `src/pages/chats/*` — WhatsApp, iMessage, Instagram, Messenger, Telegram, Discord simulators.
- `src/pages/comments/*` — YouTube, Instagram, Twitter/X, TikTok, Facebook generators.
- `public/robots.txt`, `public/sitemap.xml`, `public/favicon.svg`.

## SEO
- Each page sets title/description/canonical via `useSeo`.
- Sitemap & robots reference `https://faketext.fun`.
- JSON-LD WebApplication schema injected on landing.
- Footer disclaimer: "For entertainment & educational use only".

## Disabled artifacts
- `artifacts/api-server` and `artifacts/mockup-sandbox` are present but not used by the live product.
