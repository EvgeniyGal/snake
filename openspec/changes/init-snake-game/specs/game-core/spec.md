# Spec: Game Core

## ADDED Requirements

### Requirement: Snake Movement
The snake moves continuously in the current direction.

#### Scenario: Basic Movement
- **Given** a running game
- **When** a tick occurs
- **Then** the snake head moves one grid cell in the current direction and the tail follows

### Requirement: Direction Control
The player controls the snake direction.

#### Scenario: Arrow Keys
- **Given** a running game
- **When** the user presses the 'ArrowUp' key
- **Then** the snake direction changes to UP (if not currently continuously moving DOWN)

### Requirement: Food Consumption
The snake grows when eating food.

#### Scenario: Eating Food
- **Given** the snake head moves onto a grid cell containing food
- **Then** the snake length increases by one segment
- **And** the score increases
- **And** new food is spawned at a random empty location

### Requirement: Game Over Conditions
The game ends on collision.

#### Scenario: Wall Collision
- **Given** the snake head moves outside the grid boundaries
- **Then** the game transitions to 'Game Over' state

#### Scenario: Self Collision
- **Given** the snake head moves onto a grid cell occupied by its own body
- **Then** the game transitions to 'Game Over' state
