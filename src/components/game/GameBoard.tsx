"use client";

import { useEffect, useCallback } from 'react';
import { useSnakeGame } from '@/hooks/useSnakeGame';
import { submitScoreAction } from '@/app/actions/game';
import Scene3D from './Scene3D';

export default function GameBoard() {
    const handleGameOver = useCallback((finalScore: number) => {
        submitScoreAction(finalScore).catch(console.error);
    }, []);

    const { snake, food, foodType, status, score, startGame, changeDirection, GRID_SIZE } = useSnakeGame(handleGameOver);

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
        <div className="flex flex-col items-center justify-center p-4 w-full max-w-4xl mx-auto">
            <div className="flex justify-between w-full mb-6 items-center px-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
                    <span className="text-emerald-400 font-mono text-xl tracking-wider">SYSTEM ACTIVE</span>
                </div>
                <div className="text-4xl font-black text-white italic tracking-tighter shadow-emerald-500/20 drop-shadow-xl">
                    SCORE: <span className="text-emerald-500 font-mono">{score}</span>
                </div>
            </div>

            <div className="relative w-full aspect-square md:aspect-video lg:aspect-[21/9] rounded-2xl overflow-hidden border-4 border-emerald-500/50 shadow-[0_0_50px_rgba(16,185,129,0.2)] bg-black">
                {/* 3D Scene */}
                <Scene3D snake={snake} food={food} foodType={foodType} GRID_SIZE={GRID_SIZE} />

                {/* Game Over Overlay */}
                {status === 'GAMEOVER' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-20 backdrop-blur-sm transition-all duration-1000">
                        <h2 className="text-6xl font-black text-red-500 mb-2 uppercase tracking-tighter animate-bounce">Game Over</h2>
                        <div className="w-32 h-1 bg-red-500 mb-8" />
                        <div className="text-2xl text-white mb-8 font-mono">FINAL SCORE: {score}</div>
                        <button
                            onClick={startGame}
                            className="group relative px-12 py-4 bg-emerald-600 text-white font-bold rounded-full overflow-hidden hover:bg-emerald-500 transition-all shadow-[0_0_30px_rgba(16,185,129,0.5)] active:scale-95"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                RESTART SYSTEM
                            </span>
                        </button>
                    </div>
                )}

                {/* Start Screen */}
                {status === 'IDLE' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20 backdrop-blur-md">
                        <div className="mb-8 relative">
                            <h1 className="text-8xl font-black text-emerald-500 italic leading-none select-none drop-shadow-[0_0_20px_rgba(16,185,129,0.8)]">SNAKE</h1>
                            <div className="absolute -bottom-2 right-0 bg-white text-black px-2 py-0.5 text-xs font-bold uppercase tracking-widest">3D Edition</div>
                        </div>
                        <p className="text-emerald-500/60 font-mono mb-12 uppercase tracking-[0.3em] text-sm animate-pulse">Initializing Virtual Environment...</p>
                        <button
                            onClick={startGame}
                            className="bg-emerald-500 text-black px-12 py-5 rounded-full font-black text-xl hover:bg-white hover:scale-110 transition-all active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                        >
                            ENTER SIMULATION
                        </button>
                    </div>
                )}
            </div>

            {/* Controls Info */}
            <div className="mt-8 text-emerald-500/30 font-mono text-xs uppercase tracking-widest flex gap-8">
                <span>[W/A/S/D or Arrows] to Navigate</span>
                <span>[Space] to Action</span>
                <span className="text-red-500/50">Apples: 50pts</span>
            </div>

            {/* Mobile Controls */}
            <div className="mt-8 grid grid-cols-3 gap-4 sm:hidden select-none w-full max-w-xs px-4">
                <div />
                <button onTouchStart={() => changeDirection('UP')} className="h-16 bg-emerald-900/40 border border-emerald-500/20 rounded-xl flex items-center justify-center active:bg-emerald-500/60 transition"><span className="text-2xl">▲</span></button>
                <div />
                <button onTouchStart={() => changeDirection('LEFT')} className="h-16 bg-emerald-900/40 border border-emerald-500/20 rounded-xl flex items-center justify-center active:bg-emerald-500/60 transition"><span className="text-2xl">◀</span></button>
                <button onTouchStart={() => changeDirection('DOWN')} className="h-16 bg-emerald-900/40 border border-emerald-500/20 rounded-xl flex items-center justify-center active:bg-emerald-500/60 transition"><span className="text-2xl">▼</span></button>
                <button onTouchStart={() => changeDirection('RIGHT')} className="h-16 bg-emerald-900/40 border border-emerald-500/20 rounded-xl flex items-center justify-center active:bg-emerald-500/60 transition"><span className="text-2xl">▶</span></button>
            </div>
        </div>
    );
}

