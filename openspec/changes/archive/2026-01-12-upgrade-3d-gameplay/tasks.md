## 1. Setup & Dependencies
- [x] 1.1 Install `three`, `@types/three`, `@react-three/fiber`, `@react-three/drei`.
- [x] 1.2 Install `@react-three/postprocessing` for visual effects.

## 2. Core 3D Implementation
- [x] 2.1 Refactor `GameBoard.tsx` to initialize R3F `Canvas`.
- [x] 2.2 Create `Snake3D` component to render segments as 3D cubes.
- [x] 2.3 Create `Food3D` component for standard food and special apples.
- [x] 2.4 Create `Environment3D` (Grid floor, Neon lighting).

## 3. Gameplay Features
- [x] 3.1 Update `useSnakeGame.ts` to support special "Apple" food types.
- [x] 3.2 Implement larger point rewards for eating apples.

## 4. Visual Polish
- [x] 4.1 Implement bloom post-processing for neon glow.
- [x] 4.2 Add smooth camera follow/lerping (optional).

## 5. Testing & Validation
- [x] 5.1 Verify 3D rendering and movement.
- [x] 5.2 Verify score correctly increases when eating apples.
