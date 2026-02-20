"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { usePerformance } from "@/lib/usePerformanceStore";

/**
 * CustomCursor — Fixed performance issues:
 * 1. Moved isHidden to a ref instead of state so the useEffect doesn't
 *    re-run (and re-register the gsap ticker) on every mouse move.
 * 2. The ticker reference is stored and properly cleaned up.
 * 3. In low-power mode, cursor is completely disabled (native cursor used).
 */
export default function CustomCursor() {
    const { isLowPerformance } = usePerformance();
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorDotRef = useRef<HTMLDivElement>(null);
    // ✅ Using refs instead of state — avoids re-triggering useEffect
    const isHoveringRef = useRef(false);
    const isHiddenRef = useRef(true);

    useEffect(() => {
        if (isLowPerformance) return;

        const cursor = cursorRef.current;
        const dot = cursorDotRef.current;
        if (!cursor || !dot) return;

        const pos = { x: 0, y: 0 };
        const mouse = { x: 0, y: 0 };

        // Show cursor on first move
        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;

            if (isHiddenRef.current) {
                isHiddenRef.current = false;
                gsap.to([cursor, dot], { opacity: 1, duration: 0.3 });
            }

            gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1 });
        };

        const handleMouseLeave = () => {
            isHiddenRef.current = true;
            gsap.to([cursor, dot], { opacity: 0, duration: 0.3 });
        };
        const handleMouseEnter = () => {
            isHiddenRef.current = false;
            gsap.to([cursor, dot], { opacity: 1, duration: 0.3 });
        };

        // ✅ Stored ticker ref for proper cleanup
        const tickerHandler = () => {
            pos.x += (mouse.x - pos.x) * 0.15;
            pos.y += (mouse.y - pos.y) * 0.15;

            const scale = isHoveringRef.current ? 2 : 1;
            const color = isHoveringRef.current ? "#C5FB45" : "#E8E4DF";

            gsap.set(cursor, { x: pos.x, y: pos.y });
            gsap.set(cursor, {
                width: isHoveringRef.current ? 80 : 40,
                height: isHoveringRef.current ? 80 : 40,
                borderColor: color,
            });
            gsap.set(dot, {
                width: isHoveringRef.current ? 8 : 5,
                height: isHoveringRef.current ? 8 : 5,
                backgroundColor: color,
            });
            void scale;
        };
        gsap.ticker.add(tickerHandler);

        // Detect hoverable elements — use event delegation to avoid per-element listeners
        const handleDocMouseOver = (e: MouseEvent) => {
            const target = e.target as Element;
            const isHoverable = target.closest("a, button, [data-cursor-hover], .project-card");
            if (isHoverable !== null) {
                if (!isHoveringRef.current) {
                    isHoveringRef.current = true;
                }
            } else {
                if (isHoveringRef.current) {
                    isHoveringRef.current = false;
                }
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseover", handleDocMouseOver);
        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            gsap.ticker.remove(tickerHandler);
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseover", handleDocMouseOver);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [isLowPerformance]);

    // Don't render in low-power — let browser use native cursor
    if (isLowPerformance) return null;

    return (
        <>
            {/* Outer ring */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: "1.5px solid #E8E4DF",
                    opacity: 0,
                    transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease",
                }}
            />
            {/* Inner dot */}
            <div
                ref={cursorDotRef}
                className="fixed top-0 left-0 pointer-events-none z-[10001] -translate-x-1/2 -translate-y-1/2"
                style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "#E8E4DF",
                    opacity: 0,
                }}
            />
        </>
    );
}
