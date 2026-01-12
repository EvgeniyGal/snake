"use client";

import { useEffect, useState, useCallback } from 'react';
import { useSnakeGame } from '@/hooks/useSnakeGame';
import { submitScoreAction } from '@/app/actions/game';

export default function GameBoard() {
    const handleGameOver = useCallback((finalScore: number) => {
        submitScoreAction(finalScore).catch(console.error);
    }, []);

    const { snake, food, status, score, startGame, changeDirection, GRID_SIZE } = useSnakeGame(handleGameOver);

    // Keyboard controls
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowUp': changeDirection('UP'); break;
                case 'ArrowDown': changeDirection('DOWN'); break;
                case 'ArrowLeft': changeDirection('LEFT'); break;
                case 'ArrowRight': changeDirection('RIGHT'); break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [changeDirection]);

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="mb-4 text-2xl font-bold text-emerald-400">Score: {score}</div>

            <div
                className="relative bg-gray-900 border-2 border-emerald-500 rounded-lg shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                    gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
                    width: 'min(90vw, 400px)',
                    height: 'min(90vw, 400px)',
                }}
            >
                {/* Render Snake */}
                {snake.map((segment, index) => (
                    <div
                        key={`${segment.x}-${segment.y}-${index}`}
                        className={`${index === 0 ? 'bg-emerald-400' : 'bg-emerald-600'} rounded-sm`}
                        style={{
                            gridColumnStart: segment.x + 1,
                            gridRowStart: segment.y + 1,
                        }}
                    />
                ))}

                {/* Render Food */}
                <div
                    className="bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-pulse"
                    style={{
                        gridColumnStart: food.x + 1,
                        gridRowStart: food.y + 1,
                    }}
                />

                {/* Game Over Overlay */}
                {status === 'GAMEOVER' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10">
                        <h2 className="text-3xl font-bold text-red-500 mb-4">Game Over</h2>
                        <button
                            onClick={startGame}
                            className="px-6 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition"
                        >
                            Play Again
                        </button>
                    </div>
                )}

                {/* Start Screen */}
                {status === 'IDLE' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10">
                        <h2 className="text-3xl font-bold text-emerald-500 mb-4">Snake Game</h2>
                        <button
                            onClick={startGame}
                            className="px-6 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition"
                        >
                            Start Game
                        </button>
                    </div>
                )}
            </div>

            {/* Mobile Controls */}
            <div className="mt-8 grid grid-cols-3 gap-2 sm:hidden select-none">
                <div />
                <button
                    onTouchStart={() => changeDirection('UP')}
                    onClick={() => changeDirection('UP')}
                    className="p-4 bg-gray-800 rounded active:bg-gray-700 flex items-center justify-center"
                >
                    ⬆️
                </button>
                <div />
                <button onTouchStart={() => changeDirection('LEFT')} onClick={() => changeDirection('LEFT')} className="p-4 bg-gray-800 rounded active:bg-gray-700 flex items-center justify-center">⬅️</button>
                <button onTouchStart={() => changeDirection('DOWN')} onClick={() => changeDirection('DOWN')} className="p-4 bg-gray-800 rounded active:bg-gray-700 flex items-center justify-center">⬇️</button>
                <button onTouchStart={() => changeDirection('RIGHT')} onClick={() => changeDirection('RIGHT')} className="p-4 bg-gray-800 rounded active:bg-gray-700 flex items-center justify-center">➡️</button>
            </div>
        </div>
    );
}
