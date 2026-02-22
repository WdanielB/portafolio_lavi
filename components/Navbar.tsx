"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePerformance } from "@/lib/usePerformanceStore";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
    const { isLowPerformance } = usePerformance();
    const navRef = useRef<HTMLElement>(null);
    const pillRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial Entrance
            gsap.fromTo(
                navRef.current,
                { y: -100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 2.5 }
            );

            // Morphing Logic: Transparent to blur/border when scrolled
            if (!isLowPerformance) {
                ScrollTrigger.create({
                    start: "top -50px",
                    onEnter: () => {
                        gsap.to(pillRef.current, {
                            backgroundColor: "rgba(13, 13, 18, 0.6)",
                            backdropFilter: "blur(24px)",
                            borderColor: "rgba(42, 42, 53, 0.5)",
                            boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
                            duration: 0.4,
                        });
                    },
                    onLeaveBack: () => {
                        gsap.to(pillRef.current, {
                            backgroundColor: "rgba(13, 13, 18, 0)",
                            backdropFilter: "blur(0px)",
                            borderColor: "rgba(42, 42, 53, 0)",
                            boxShadow: "0 0px 0px rgba(0,0,0,0)",
                            duration: 0.4,
                        });
                    }
                });
            }
        }, navRef);

        return () => ctx.revert();
    }, [isLowPerformance]);

    return (
        <nav
            ref={navRef}
            className="fixed top-6 md:top-8 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-5xl opacity-0"
        >
            {/* The Floating Island */}
            <div
                ref={pillRef}
                className="flex items-center justify-between rounded-[2rem] px-8 py-4 md:px-10 md:py-5 border border-transparent transition-all duration-300"
            >
                {/* Logo */}
                <a
                    href="/"
                    className="text-xl md:text-2xl font-bold tracking-[-0.04em] text-[#FAF8F5] hover:text-[#C9A84C] transition-colors duration-300"
                >
                    LAVI
                </a>

                {/* Nav Links */}
                <div className="hidden md:flex items-center gap-10">
                    {["Trabajo", "Filosofía", "Contacto"].map((link) => (
                        <a
                            key={link}
                            href={`#${link.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`}
                            className="text-xs uppercase tracking-[0.2em] font-medium text-[#FAF8F5]/60 hover:text-[#FAF8F5] transition-all duration-300 hover:-translate-y-[1px]"
                        >
                            {link}
                        </a>
                    ))}
                </div>

                {/* Magnetic CTA Button */}
                <a
                    href="#contact"
                    className="group relative overflow-hidden bg-[#C9A84C] text-[#0D0D12] text-xs font-bold uppercase tracking-[0.2em] px-6 py-3 md:px-8 md:py-3.5 rounded-full transition-all duration-500 hover:scale-[1.03]"
                    style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
                >
                    <span className="relative z-10 flex items-center justify-center">
                        Iniciar Proyecto
                    </span>
                    <span className="absolute inset-0 bg-[#FAF8F5] transform translate-y-[100%] transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-0" />
                </a>
            </div>
        </nav>
    );
}
