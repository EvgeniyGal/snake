# Change: Upgrade to 3D Gameplay

## Why
To enhance user engagement and visual appeal, the game will be upgraded from a 2D grid to a 3D environment using React Three Fiber. Additionally, a special "Apple" food item will be implemented to add gameplay variety, as requested by the user.

## What Changes
- Replace 2D DOM-based rendering with a `react-three-fiber` Canvas.
- Implement 3D meshes for Snake segments and Food items.
- Introduce an "Apple" food item with a distinct 3D model and higher point value.
- Add lighting, shadows, and post-processing effects (Bloom) to create a premium neon aesthetic.
- Update game core to support 3D position mapping.

## Impact
- **Specs**: `game-core` (visual and gameplay requirements updated).
- **Code**: `components/game/GameBoard.tsx` (Complete rewrite), `hooks/useSnakeGame.ts` (Logic update for apples).
- **Dependencies**: Add `three`, `@react-three/fiber`, `@react-three/drei`.
