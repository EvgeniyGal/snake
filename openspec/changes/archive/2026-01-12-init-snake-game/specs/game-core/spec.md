# Spec: Game Core

## ADDED Requirements

### Requirement: Snake Movement
The snake moves continuously.

#### Scenario: Tick Movement
- **Given** game is running
- **When** tick interval passes
- **Then** snake moves one step in current direction

### Requirement: Direction Control
Player controls direction.

#### Scenario: Arrow Key Input
- **When** arrow key is pressed
- **Then** snake direction changes

### Requirement: Food Consumption
Snake eats food.

#### Scenario: Eating
- **When** snake head hits food
- **Then** snake grows
- **And** score increases

### Requirement: Game Over
Collision ends game.

#### Scenario: Wall Collision
- **When** snake hits wall
- **Then** game ends

#### Scenario: Self Collision
- **When** snake hits self
- **Then** game ends
