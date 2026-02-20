"use client";

import { useEffect, useRef, ReactNode } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePerformance } from "@/lib/usePerformanceStore";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
    children: ReactNode;
}

/**
 * Hybrid GSAP + Lenis scroll controller.
 * - rafHandler is stored as a const BEFORE gsap.ticker.add so we can
 *   pass the exact same reference to gsap.ticker.remove (bug fix).
 * - In low-power mode: Lenis is skipped entirely → native scroll (far cheaper).
 * - gsap.ticker.lagSmoothing(0) prevents GSAP from compensating for
 *   background tabs, keeping Lenis perfectly in sync.
 */
export default function SmoothScroll({ children }: SmoothScrollProps) {
    const { isLowPerformance } = usePerformance();
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Low-power: use native scroll, zero overhead
        if (isLowPerformance) {
            document.documentElement.style.scrollBehavior = "smooth";
            return () => {
                document.documentElement.style.scrollBehavior = "auto";
            };
        }

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            smoothWheel: true,
        });

        lenisRef.current = lenis;

        // Sync GSAP ScrollTrigger with Lenis scroll position
        lenis.on("scroll", ScrollTrigger.update);

        // ✅ FIX: Store handler ref BEFORE adding to ticker so we can remove
        // the EXACT same function reference in cleanup (was a memory leak before)
        const rafHandler = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(rafHandler);

        // Prevents GSAP from adding lag compensation that desyncs Lenis
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            // ✅ Now correctly removes the stored reference — no more leak
            gsap.ticker.remove(rafHandler);
        };
    }, [isLowPerformance]);

    return <>{children}</>;
}
