# Project Context

## Purpose
A modern, web-based implementation of the classic Snake game featuring user authentication, role-based access control (RBAC), and persistent high scores. The goal is to create a polished, responsive gaming experience that serves as a robust example of a full-stack Next.js application.

## Tech Stack
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite
- **Authentication**: Role-based Authentication (likely Auth.js/NextAuth or similar provider)
- **Deployment**: Vercel (recommended) or Docker

## Project Conventions

### Code Style
- **Formatting**: Prettier with standard settings.
- **Linting**: ESLint with Next.js defaults.
- **Naming**: PascalCase for components, camelCase for functions/vars, kebab-case for files.
- **Components**: Functional components with Hooks. Strong typing for all props and state.

### Architecture Patterns
- **Directory Structure**: Next.js App Router (`app/` directory).
- **Data Fetching**: Server Components for fetching high scores/user data.
- **Mutations**: Server Actions for handling game submissions and profile updates.
- **Game Logic**: Client-side React hooks or a dedicated game loop manager for the Snake mechanics.
- **Database Access**: Type-safe interactions (e.g., using an ORM like Drizzle or Prisma is recommended for SQLite).

### Testing Strategy
- **Unit Testing**: Jest/Vitest for game logic (collision detection, movement).
- **Integration Testing**: Testing authentication flows and API routes.
- **E2E**: Playwright or Cypress for full game loops (optional but good).

### Git Workflow
- Feature branches (`feature/game-loop`, `fix/collision-bug`).
- Pull Requests with descriptive summaries.
- Semantic Versioning for releases.

## Domain Context
- **Game Mechanics**: Grid-based movement, snake growth upon consuming food, collision with walls (optional mode) or self.
- **Roles**:
    - `Player`: Standard user. Can play and save scores.
    - `Admin`: Can manage users, delete fraudulent scores, and view analytics.

## Important Constraints
- **Performance**: Game loop must be smooth (60 FPS target).
- **Responsiveness**: Playable on both Desktop and Mobile (touch controls).
- **Offline Capable**: Basic gameplay should work offline (PWA potential), syncing scores when online.

## External Dependencies
- SQLite driver (e.g., `better-sqlite3` or `libsql`).
- Authentication library (e.g., `next-auth`).
- Typography/Icons (e.g., `lucide-react`, Google Fonts).
