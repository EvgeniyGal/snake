# Spec: Persistence

## ADDED Requirements

### Requirement: Local Storage
Data is stored locally.

#### Scenario: SQLite Connection
- **Given** app startup
- **Then** connected to local SQLite db

### Requirement: Score Persistence
Scores are saved.

#### Scenario: Save High Score
- **When** game ends
- **Then** score is saved to database

### Requirement: Leaderboard
Top scores are retrievable.

#### Scenario: Get Top 10
- **When** leaderboard requested
- **Then** top 10 scores returned
