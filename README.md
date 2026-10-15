# FFX Autobot Trading — Website

The official marketing website for **ST EA SB** — the Expert Advisor for
MetaTrader 5 powered by the Hidden Strategy by SB (V2.50, Secure Build).

## Tech Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS 4 + shadcn/ui + Framer Motion
- **Lead storage:** Turso (libsql) in production · SQLite (Prisma) locally

## Quick Start (local development)

```bash
bun install          # or npm install
bun run dev          # or npm run dev
```

Open http://localhost:3000 — the lead form saves to a local SQLite database
automatically. No extra setup needed.

## Production (Vercel + Turso)

1. Create a free database at [Turso](https://turso.tech) and copy the
   **database URL** and an **auth token**.
2. Create the `Lead` table with this SQL (Turso console):

```sql
CREATE TABLE IF NOT EXISTS "Lead" (
  "id"        INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "name"      TEXT NOT NULL,
  "email"     TEXT NOT NULL,
  "plan"      TEXT NOT NULL DEFAULT '',
  "message"   TEXT NOT NULL DEFAULT '',
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

3. On Vercel, set the environment variables (see `.env.example`):

```
TURSO_DATABASE_URL=libsql://your-db.turso.io
TURSO_AUTH_TOKEN=eyJ...
```

When both Turso variables are present, the lead form writes to Turso
automatically. When they are absent, it falls back to local SQLite.

## Project Structure

```
src/
  app/               # App Router pages + /api/leads endpoint
  components/site/   # All landing-page sections
  lib/leads.ts       # Lead storage (Turso / SQLite switch)
prisma/schema.prisma # Local Lead model
```

## Copyright

© 2025 FFX Autobot Trading — All rights reserved.
ST EA SB and the Hidden Strategy by SB are proprietary.
