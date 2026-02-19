"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.fromTo(
            navRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 3.5 }
        );
    }, []);

    return (
        <nav
            ref={navRef}
            className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-8 md:px-16 py-6 mix-blend-difference opacity-0"
        >
            <a href="/" className="text-lg font-bold tracking-[0.2em] uppercase text-white">
                LAVI
            </a>

            <div className="hidden md:flex items-center gap-10">
                {["Work", "About", "Contact"].map((item) => (
                    <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="text-sm uppercase tracking-[0.15em] text-white/70 hover:text-[#C5FB45] transition-colors duration-300 relative group"
                    >
                        {item}
                        <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-[#C5FB45] group-hover:w-full transition-all duration-500" />
                    </a>
                ))}
            </div>

            <a
                href="#contact"
                className="text-xs uppercase tracking-[0.15em] px-6 py-3 rounded-full border border-white/30 text-white hover:bg-[#C5FB45] hover:text-[#0F0F0F] hover:border-[#C5FB45] transition-all duration-400"
            >
                Let&apos;s Talk
            </a>
        </nav>
    );
}
