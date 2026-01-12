# Design: Snake Game Architecture

## System Overview
The application follows a standard Next.js App Router architecture.

### 1. Game Engine
- **Client-Side Rendering**: The actual game loop runs in the browser using `requestAnimationFrame` or `setInterval`.
- **State Management**: React `useState` / `useReducer` to track snake position, food, and score.
- **Input Handling**: Keyboard event listeners attached to the window/document.

### 2. Authentication
- **Provider**: NextAuth.js (Auth.js v5).
- **Strategy**: Credentials provider (username/password) for simplicity in a self-contained app, or OAuth if configured.
- **Session**: JWT based sessions.

### 3. Database
- **Engine**: SQLite.
- **ORM**: Drizzle ORM or Prisma (Drizzle preferred for lightweight nature).
- **Schema**:
  - `User`: id, username, password_hash, role, created_at.
  - `Score`: id, user_id, score, played_at.

### 4. Data Flow
1. User logs in.
2. User plays game (Client-side).
3. On Game Over, client sends score to Server Action.
4. Server validates session and writes to SQLite.
5. Leaderboard component fetches top scores via Server Component.
