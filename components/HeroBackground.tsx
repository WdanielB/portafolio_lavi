"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { usePerformance } from "@/lib/usePerformanceStore";

/**
 * Three.js particle field for the Hero background.
 * Uses BufferGeometry for maximum efficiency (no deprecated Geometry).
 * The render loop is conditional — paused in low-power mode.
 * Uses useRef for the Three.js objects (equivalent to Vue's shallowRef —
 * no deep reactivity overhead on heavy 3D objects).
 */
export default function HeroBackground() {
    const { isLowPerformance } = usePerformance();
    const mountRef = useRef<HTMLDivElement>(null);
    // useRef = shallowRef equivalent — Three.js objects stored without Vue/React reactivity
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const animFrameRef = useRef<number | null>(null);
    const isActiveRef = useRef(true);

    useEffect(() => {
        if (isLowPerformance || !mountRef.current) return;

        const mount = mountRef.current;
        const w = mount.clientWidth;
        const h = mount.clientHeight;

        // --- Scene Setup ---
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
        camera.position.z = 80;
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({
            antialias: false, // disabled for perf — particles don't need MSAA
            alpha: true,
            powerPreference: "high-performance",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // cap at 2x — no benefit above that
        renderer.setSize(w, h);
        renderer.setClearColor(0x000000, 0);
        mount.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // --- Particles using BufferGeometry (most efficient approach) ---
        const PARTICLE_COUNT = 1200;
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const opacities = new Float32Array(PARTICLE_COUNT);
        const speeds = new Float32Array(PARTICLE_COUNT);

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 200; // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 200; // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 100; // z
            opacities[i] = Math.random();
            speeds[i] = 0.002 + Math.random() * 0.005;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            color: 0xc5fb45,
            size: 0.5,
            transparent: true,
            opacity: 0.55,
            sizeAttenuation: true,
            depthWrite: false,
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        // --- Mouse parallax (subtle) ---
        const mouse = { x: 0, y: 0 };
        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = (e.clientX / window.innerWidth - 0.5) * 0.3;
            mouse.y = (e.clientY / window.innerHeight - 0.5) * 0.3;
        };
        window.addEventListener("mousemove", handleMouseMove);

        // --- Render Loop — continuous horizontal circular rotation ---
        const clock = new THREE.Clock();
        const tick = () => {
            if (!isActiveRef.current) return;
            animFrameRef.current = requestAnimationFrame(tick);
            const elapsed = clock.getElapsedTime();

            // Slow, continuous horizontal orbit around Y-axis
            particles.rotation.y = elapsed * 0.08 + mouse.x * 0.4;
            // Subtle vertical tilt driven only by mouse for organic feel
            particles.rotation.x = mouse.y * 0.25;

            // Soft pulsing opacity
            material.opacity = 0.45 + Math.sin(elapsed * 0.6) * 0.1;

            renderer.render(scene, camera);
        };
        tick();

        // --- Resize Handler ---
        const handleResize = () => {
            if (!mount) return;
            const nw = mount.clientWidth;
            const nh = mount.clientHeight;
            camera.aspect = nw / nh;
            camera.updateProjectionMatrix();
            renderer.setSize(nw, nh);
        };
        window.addEventListener("resize", handleResize);

        // --- Cleanup — dispose everything to avoid memory leaks ---
        return () => {
            isActiveRef.current = false;
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
            geometry.dispose();
            material.dispose();
            renderer.dispose();
            if (mount.contains(renderer.domElement)) {
                mount.removeChild(renderer.domElement);
            }
        };
    }, [isLowPerformance]);

    // In low-power mode: don't render the canvas at all
    if (isLowPerformance) {
        return (
            <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F] via-[#0F0F0F] to-[#1a1a1a]" />
        );
    }

    return (
        <div
            ref={mountRef}
            className="absolute inset-0"
            style={{ zIndex: 0 }}
            aria-hidden="true"
        />
    );
}
