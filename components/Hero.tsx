"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePerformance } from "@/lib/usePerformanceStore";
import HeroBackground from "@/components/HeroBackground";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const { isLowPerformance } = usePerformance();
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const scrollIndicatorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 3.2 });

            // Animate each line — reduced in low-power mode
            const lines = headingRef.current?.querySelectorAll(".hero-line");
            if (lines) {
                lines.forEach((line, i) => {
                    tl.fromTo(
                        line,
                        isLowPerformance
                            ? { opacity: 0 }
                            : { y: "100%", rotateX: -40 },
                        {
                            ...(isLowPerformance
                                ? { opacity: 1 }
                                : { y: "0%", rotateX: 0 }),
                            duration: isLowPerformance ? 0.5 : 1.2,
                            ease: isLowPerformance ? "power2.out" : "power4.out",
                        },
                        i * 0.15
                    );
                });
            }

            // Subtitle
            tl.fromTo(
                subtitleRef.current,
                { y: isLowPerformance ? 10 : 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: isLowPerformance ? 0.4 : 0.8,
                    ease: "power3.out",
                },
                "-=0.5"
            );

            // Scroll indicator
            tl.fromTo(
                scrollIndicatorRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.6 },
                "-=0.3"
            );

            // Parallax on scroll — skip in low-power (expensive scrub)
            if (!isLowPerformance) {
                gsap.to(headingRef.current, {
                    y: -150,
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
            className="relative h-screen flex flex-col justify-end pb-28 md:pb-40 px-10 md:px-24 overflow-hidden"
        >
            {/* Three.js background — component handles low-power fallback internally */}
            <HeroBackground />

            {/* Static gradient overlay on top of the canvas */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F]/60 via-transparent to-[#0F0F0F] pointer-events-none z-[1]" />

            {/* Accent glow */}
            <div className="absolute top-1/4 right-[-10%] w-[600px] h-[600px] rounded-full bg-[#C5FB45]/5 blur-[120px] z-[1]" />

            <div ref={headingRef} className="relative z-10 mb-14 md:mb-20">
                <div className="overflow-hidden" style={{ perspective: "600px" }}>
                    <h1 className="hero-line text-[12vw] md:text-[9vw] font-serif font-bold leading-[0.9] tracking-[-0.03em] text-[#E8E4DF]">
                        Creative
                    </h1>
                </div>
                <div className="overflow-hidden" style={{ perspective: "600px" }}>
                    <h1 className="hero-line text-[12vw] md:text-[9vw] font-serif font-bold leading-[0.9] tracking-[-0.03em]">
                        <span className="text-[#C5FB45]">Developer</span>
                        <span className="text-[#E8E4DF]"> &</span>
                    </h1>
                </div>
                <div className="overflow-hidden" style={{ perspective: "600px" }}>
                    <h1 className="hero-line text-[12vw] md:text-[9vw] font-serif italic font-bold leading-[0.9] tracking-[-0.03em] text-[#E8E4DF]">
                        Designer
                    </h1>
                </div>
            </div>

            <div className="relative z-10 flex items-end justify-between">
                <p
                    ref={subtitleRef}
                    className="text-sm md:text-base text-[#666] max-w-sm leading-relaxed tracking-wide opacity-0"
                >
                    Crafting immersive digital experiences through code, motion, and design.
                    Based in Lima, Perú.
                </p>

                <div
                    ref={scrollIndicatorRef}
                    className="flex flex-col items-center gap-2 opacity-0"
                >
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#666]">
                        Scroll
                    </span>
                    <div className="w-[1px] h-12 bg-[#333] relative overflow-hidden">
                        <div
                            className="absolute top-0 left-0 w-full h-full bg-[#C5FB45]"
                            style={{ animation: "scrollLine 2s ease-in-out infinite" }}
                        />
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(0%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
        </section>
    );
}
