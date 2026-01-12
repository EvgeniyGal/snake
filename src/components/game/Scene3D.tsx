"use client";

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { Point, FoodType } from '@/hooks/useSnakeGame';

interface Scene3DProps {
    snake: Point[];
    food: Point;
    foodType: FoodType;
    GRID_SIZE: number;
}

export default function Scene3D({ snake, food, foodType, GRID_SIZE }: Scene3DProps) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return (
            <div className="w-full h-full bg-black flex items-center justify-center text-emerald-500 font-mono">
                INITIALIZING ENGINE...
            </div>
        );
    }

    return (
        <div className="w-full h-full min-h-[400px] bg-neutral-900 rounded-lg overflow-hidden border-2 border-emerald-500/30">
            <Canvas shadows camera={{ position: [0, 15, 20], fov: 50 }}>
                <color attach="background" args={['#050505']} />
                <OrbitControls
                    enablePan={false}
                    maxPolarAngle={Math.PI / 2.1}
                    minDistance={5}
                    maxDistance={50}
                />

                {/* Lights */}
                <ambientLight intensity={1} />
                <pointLight position={[10, 10, 10]} intensity={100} color="#fff" />
                <pointLight position={[-10, 5, -10]} intensity={50} color="#10b981" />

                {/* Board / Floor */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
                    <planeGeometry args={[GRID_SIZE, GRID_SIZE]} />
                    <meshStandardMaterial color="#0a0a0a" />
                </mesh>

                {/* Visual Grid Lines */}
                {Array.from({ length: GRID_SIZE + 1 }).map((_, i) => (
                    <group key={i}>
                        <mesh position={[i - GRID_SIZE / 2, 0, 0]}>
                            <boxGeometry args={[0.05, 0.05, GRID_SIZE]} />
                            <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={2} />
                        </mesh>
                        <mesh position={[0, 0, i - GRID_SIZE / 2]}>
                            <boxGeometry args={[GRID_SIZE, 0.05, 0.05]} />
                            <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={2} />
                        </mesh>
                    </group>
                ))}

                {/* Game Entities */}
                {snake.map((segment, i) => (
                    <mesh key={i} position={[segment.x - GRID_SIZE / 2 + 0.5, 0.5, segment.y - GRID_SIZE / 2 + 0.5]}>
                        <boxGeometry args={[0.9, 0.9, 0.9]} />
                        <meshStandardMaterial
                            color={i === 0 ? "#00ffff" : "#10b981"}
                            emissive={i === 0 ? "#00ffff" : "#10b981"}
                            emissiveIntensity={i === 0 ? 3 : 1}
                        />
                    </mesh>
                ))}

                <mesh position={[food.x - GRID_SIZE / 2 + 0.5, 0.5, food.y - GRID_SIZE / 2 + 0.5]}>
                    <sphereGeometry args={[0.4, 16, 16]} />
                    <meshStandardMaterial
                        color={foodType === 'APPLE' ? "#ef4444" : "#f59e0b"}
                        emissive={foodType === 'APPLE' ? "#ef4444" : "#f59e0b"}
                        emissiveIntensity={4}
                    />
                </mesh>
            </Canvas>
        </div>
    );
}
