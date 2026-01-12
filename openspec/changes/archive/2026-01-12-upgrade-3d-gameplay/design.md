# Design: 3D Game Architecture

## Technology Choice
- **Library**: `react-three-fiber` (R3F) ecosystem.
  - **Reason**: Standard React abstraction for Three.js, allows declarative scene construction.
- **Components**:
  - `Scene`: Main canvas container with Lights and Camera.
  - `Snake3D`: Component that renders the snake body as a series of Cubes or Spheres.
  - `Food3D`: Component rendering a glowing Apple model (or sphere proxy).
  - `Environment`: Grid floor with retro aesthetics (Neon lines).

## Visual Style
- **Aesthetic**: Cyberpunk/Neon Arcade.
- **Lighting**: Ambient light + Point lights attached to the snake head and food.
- **Effects**: Bloom effect using `@react-three/postprocessing` to make neon colors pop.

## Logic Integration
The `useSnakeGame` hook already provides `Point[]` coordinates.
- **Mapping**: 2D grid `(x, y)` maps to 3D world `(x, 0, -y)` (or similar plane mapping).
- **State Sync**: R3F components will subscribe to the React state changes from the hook. Due to the low frequency of updates (every 100-200ms), standard React rendering is performant enough without needing imperative frame-loop manipulation for positions.
