# game-core Specification

## Purpose
Core gameplay logic and rendering for the 3D Snake Game.

## Requirements
### Requirement: Snake Movement
The snake moves continuously across the grid.

#### Scenario: Tick Movement
- **Given** game is running
- **When** tick interval passes
- **Then** snake moves one step in current direction visually interpolating to the new 3D position

### Requirement: Direction Control
Player controls snake direction via keyboard or mobile inputs.

#### Scenario: Input Handling
- **When** arrow keys or WASD are pressed
- **Then** snake direction changes accordingly

### Requirement: Food Consumption
Snake grows and scores points by eating food.

#### Scenario: Regular Food
- **When** snake head hits standard food
- **Then** snake grows and score increases by 10

#### Scenario: Apple Consumption
- **When** snake head hits an Apple
- **Then** snake grows and score increases by 50

### Requirement: Game Over
Collision with walls or self terminates the session.

#### Scenario: Collision
- **When** snake hits boundary or self
- **Then** game enters GAMEOVER state

### Requirement: 3D Visualization
The game provides a 3D perspective view.

#### Scenario: 3D Environment
- **Given** the simulation is active
- **Then** the board is rendered as a 3D grid with neon aesthetics
