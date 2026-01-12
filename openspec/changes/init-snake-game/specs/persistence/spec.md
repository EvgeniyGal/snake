# Spec: Persistence

## ADDED Requirements

### Requirement: Local SQLite Storage
Data is stored in a local SQLite file.

#### Scenario: File Location
- **Given** the application starts
- **Then** it connects to a `snake.db` file in the project root (or specified data directory)

### Requirement: Score Persistence
Top scores are persisted.

#### Scenario: Save Score
- **Given** an authenticated user finishes a game with score X
- **When** the score is submitted
- **Then** a `Score` record is inserted with the user ID and timestamp

### Requirement: Leaderboard Retrieval
Leaderboard retrieves top scores.

#### Scenario: Global Top 10
- **Given** a request for the leaderboard
- **Then** the system returns the top 10 unique users by max score, ordered descending
