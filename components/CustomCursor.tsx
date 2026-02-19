"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isHidden, setIsHidden] = useState(true);

    useEffect(() => {
        const cursor = cursorRef.current;
        const dot = cursorDotRef.current;
        if (!cursor || !dot) return;

        const pos = { x: 0, y: 0 };
        const mouse = { x: 0, y: 0 };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            if (isHidden) setIsHidden(false);

            gsap.to(dot, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
            });
        };

        const handleMouseEnter = () => setIsHidden(false);
        const handleMouseLeave = () => setIsHidden(true);

        // Smooth follow for outer ring
        gsap.ticker.add(() => {
            pos.x += (mouse.x - pos.x) * 0.15;
            pos.y += (mouse.y - pos.y) * 0.15;
            gsap.set(cursor, { x: pos.x, y: pos.y });
        });

        // Detect hoverable elements
        const addHoverListeners = () => {
            const hoverables = document.querySelectorAll(
                "a, button, [data-cursor-hover], .project-card"
            );
            hoverables.forEach((el) => {
                el.addEventListener("mouseenter", () => setIsHovering(true));
                el.addEventListener("mouseleave", () => setIsHovering(false));
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseleave", handleMouseLeave);

        // Re-check for hoverable elements periodically
        addHoverListeners();
        const observer = new MutationObserver(addHoverListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);
            observer.disconnect();
        };
    }, [isHidden]);

    return (
        <>
            {/* Outer ring */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-[width,height,border-color] duration-300 ease-out"
                style={{
                    width: isHovering ? "80px" : "40px",
                    height: isHovering ? "80px" : "40px",
                    borderRadius: "50%",
                    border: `1.5px solid ${isHovering ? "#C5FB45" : "#E8E4DF"}`,
                    opacity: isHidden ? 0 : 1,
                }}
            />
            {/* Inner dot */}
            <div
                ref={cursorDotRef}
                className="fixed top-0 left-0 pointer-events-none z-[10001] -translate-x-1/2 -translate-y-1/2 transition-[width,height,background] duration-300 ease-out"
                style={{
                    width: isHovering ? "8px" : "5px",
                    height: isHovering ? "8px" : "5px",
                    borderRadius: "50%",
                    background: isHovering ? "#C5FB45" : "#E8E4DF",
                    opacity: isHidden ? 0 : 1,
                }}
            />
        </>
    );
}
