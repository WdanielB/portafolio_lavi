"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePerformance } from "@/lib/usePerformanceStore";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const { isLowPerformance } = usePerformance();
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 2.8 });

            // Staggered line reveal
            const lines = headingRef.current?.querySelectorAll(".hero-line");
            if (lines) {
                lines.forEach((line, i) => {
                    tl.fromTo(
                        line,
                        isLowPerformance
                            ? { opacity: 0 }
                            : { y: "150%", rotateX: -50, opacity: 0 },
                        {
                            ...(isLowPerformance
                                ? { opacity: 1 }
                                : { y: "0%", rotateX: 0, opacity: 1 }),
                            duration: isLowPerformance ? 0.6 : 1.4,
                            ease: isLowPerformance ? "power2.out" : "power4.out",
                        },
                        i * 0.15
                    );
                });
            }

            // Reveal description
            tl.fromTo(
                textRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
                "-=0.8"
            );

            // Parallax image
            if (!isLowPerformance) {
                gsap.to(".hero-bg", {
                    yPercent: 30,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, [isLowPerformance]);

    return (
        <section
            ref={sectionRef}
            className="relative h-[100dvh] w-full overflow-hidden flex flex-col justify-end pb-24 md:pb-40"
        >
            {/* Background Image (Midnight Luxe / Luxury Architecture) */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2600&auto=format&fit=crop"
                    alt="Luxury Dark Interior"
                    className="hero-bg w-full h-[120%] object-cover scale-105"
                />
            </div>

            {/* Heavy Obsidian Gradient Overlay */}
            <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0D0D12] via-[#0D0D12]/60 to-transparent" />

            {/* Content Container (Bottom Left Aligned) */}
            <div className="w-[90%] md:w-[85%] lg:w-[80%] max-w-6xl mx-auto relative z-10 flex flex-col">
                <div ref={headingRef} className="max-w-4xl">
                    <div className="overflow-hidden" style={{ perspective: "1000px" }}>
                        <h1 className="hero-line text-[10vw] sm:text-6xl md:text-7xl lg:text-[6.5rem] xl:text-[7.5rem] font-sans font-bold leading-[0.9] tracking-[-0.04em] text-[#FAF8F5]">
                            Digital
                        </h1>
                    </div>
                    <div className="overflow-hidden" style={{ perspective: "1000px" }}>
                        <h1 className="hero-line text-[10vw] sm:text-6xl md:text-7xl lg:text-[6.5rem] xl:text-[7.5rem] font-sans font-bold leading-[0.9] tracking-[-0.04em] text-[#FAF8F5]">
                            craftsmanship <span className="font-serif italic text-[#C9A84C] font-normal leading-none relative top-[-0.1em]">meets</span>
                        </h1>
                    </div>
                    <div className="overflow-hidden mt-2 md:mt-4" style={{ perspective: "1000px" }}>
                        <h1 className="hero-line text-[14vw] sm:text-7xl md:text-8xl lg:text-[8rem] xl:text-[9.5rem] font-serif italic text-[#FAF8F5] leading-[0.8] tracking-[-0.02em]">
                            absolute precision.
                        </h1>
                    </div>
                </div>

                <div
                    ref={textRef}
                    className="mt-12 md:mt-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 border-t border-[#2A2A35]/50 pt-8"
                >
                    <p className="text-[#FAF8F5]/60 text-sm md:text-base max-w-sm leading-relaxed">
                        Somos una agencia boutique especializada en desarrollo web de alto rendimiento y diseño experiencial.
                    </p>
                    <div className="flex items-center gap-4">
                        <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
                        <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#FAF8F5]/80">
                            Lima, PE — Abierto a proyectos
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
