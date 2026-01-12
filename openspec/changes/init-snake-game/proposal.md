# Change: Initialize Snake Game with Auth and SQLite

## Why
The user requires a full-stack Web Snake Game to serve as a demonstrative Next.js application with authentication, persistence, and complex game logic.

## What Changes
- Initialize Next.js App Router project structure.
- Configure Tailwind CSS.
- Set up SQLite database with Drizzle ORM.
- Implement User Authentication (NextAuth.js).
- Implement Game Loop and Canvas rendering.
- Create API endpoints for Score submission and retrieval.

## Impact
- Affected specs: `auth`, `game-core`, `persistence`
- Affected code: `app/*`, `lib/db/*`, `components/*`
