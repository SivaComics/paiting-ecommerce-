# Auréline

A boutique art marketplace prototype — original paintings, sculpture, and photography from independent and gallery-represented artists. Built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## AI Features (Ask Auré & Room Preview)

Two features call the real Claude API and need an Anthropic API key:

- **Ask Auré** (`/api/concierge`) — a chat-based art advisor grounded on the mock catalog.
- **AI Room Preview** (`/api/room-preview`, on any artwork detail page) — Claude Vision suggests a wall placement for an uploaded room photo; the artwork is then composited client-side with drag/resize/rotate controls to fine-tune.

Set your key in `.env.local` (not committed):

```
ANTHROPIC_API_KEY=sk-ant-...
```

Without a key, both features fail gracefully with an in-UI message rather than erroring.

## What's Real vs. Mocked

- All catalog data (artworks, artists, collections, orders, favorites) lives in `src/lib/data/` as static TypeScript — there is no database or authentication. The Collector Dashboard is a fixed mock user.
- Artwork/artist imagery is generated locally (`src/lib/placeholder-art.ts`) as deterministic abstract SVGs, so the whole catalog renders identically offline without depending on an external image host.
- "Reserve This Piece," favoriting, and the certificate viewer are UI-only interactions (no backend/persistence).
- Ask Auré and Room Preview are the only two features that make real network calls, to the Anthropic API.
