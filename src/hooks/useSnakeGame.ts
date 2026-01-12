import { useState, useEffect, useCallback, useRef } from 'react';

export type Point = { x: number, y: number };
export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
export type GameStatus = 'IDLE' | 'PLAYING' | 'GAMEOVER';

const GRID_SIZE = 20;
const INITIAL_SNAKE: Point[] = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION: Direction = 'UP';
const SPEED = 150;

export function useSnakeGame(onGameOver?: (score: number) => void) {
    const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
    const [food, setFood] = useState<Point>({ x: 5, y: 5 });
    const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
    const [status, setStatus] = useState<GameStatus>('IDLE');
    const [score, setScore] = useState(0);

    const directionRef = useRef(INITIAL_DIRECTION);

    const generateFood = useCallback((currentSnake: Point[]) => {
        let newFood: Point;
        while (true) {
            newFood = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE)
            };
            const onSnake = currentSnake.some(s => s.x === newFood.x && s.y === newFood.y);
            if (!onSnake) break;
        }
        return newFood;
    }, []);

    useEffect(() => {
        if (status === 'GAMEOVER') {
            onGameOver?.(score);
        }
    }, [status, score, onGameOver]);

    const startGame = useCallback(() => {
        setSnake(INITIAL_SNAKE);
        setDirection(INITIAL_DIRECTION);
        directionRef.current = INITIAL_DIRECTION;
        setScore(0);
        setStatus('PLAYING');
        setFood(generateFood(INITIAL_SNAKE));
    }, [generateFood]);

    const moveSnake = useCallback(() => {
        if (status !== 'PLAYING') return;

        setSnake(prev => {
            const head = prev[0];
            const newHead = { ...head };

            switch (directionRef.current) {
                case 'UP': newHead.y -= 1; break;
                case 'DOWN': newHead.y += 1; break;
                case 'LEFT': newHead.x -= 1; break;
                case 'RIGHT': newHead.x += 1; break;
            }

            // Check collisions with walls
            if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
                setStatus('GAMEOVER');
                return prev;
            }

            // Check collision with self
            // We don't check tail because tail will move, but here we check against 'prev' which includes tail.
            // Ideally if we don't grow, tail moves.
            // But strict collision check against current body is fine.

            if (prev.some(s => s.x === newHead.x && s.y === newHead.y)) {
                // Special case: if we are not growing, the tail will move away, so hitting the exact tail segment is fine?
                // Usually snake logic says hitting any part of body is death.
                // We will simplify: death.
                setStatus('GAMEOVER');
                return prev;
            }

            const newSnake = [newHead, ...prev];

            // Check Food
            if (newHead.x === food.x && newHead.y === food.y) {
                setScore(s => s + 10);
                setFood(generateFood(newSnake));
            } else {
                newSnake.pop();
            }
            return newSnake;
        });
    }, [status, food, generateFood]);

    useEffect(() => {
        if (status !== 'PLAYING') return;
        const interval = setInterval(moveSnake, SPEED);
        return () => clearInterval(interval);
    }, [status, moveSnake]);

    // Input handling
    const changeDirection = useCallback((dir: Direction) => {
        const current = directionRef.current;
        if (dir === 'UP' && current === 'DOWN') return;
        if (dir === 'DOWN' && current === 'UP') return;
        if (dir === 'LEFT' && current === 'RIGHT') return;
        if (dir === 'RIGHT' && current === 'LEFT') return;

        directionRef.current = dir;
        setDirection(dir);
    }, []);

    return { snake, food, direction, status, score, startGame, changeDirection, GRID_SIZE };
}
