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

            tl.fromTo(
                scrollIndicatorRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.6 },
                "-=0.3"
            );

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
            className="relative h-screen flex flex-col justify-end pb-32 md:pb-48 px-10 md:px-24 overflow-hidden"
        >
            <HeroBackground />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F]/60 via-transparent to-[#0F0F0F] pointer-events-none z-[1]" />
            <div className="absolute top-1/4 right-[-10%] w-[600px] h-[600px] rounded-full bg-[#C5FB45]/5 blur-[120px] z-[1]" />

            <div className="w-full max-w-7xl mx-auto flex flex-col justify-end h-full relative z-10">
                <div ref={headingRef} className="mb-20 md:mb-32">
                    <div className="overflow-hidden" style={{ perspective: "600px" }}>
                        <h1 className="hero-line text-[14vw] md:text-[10vw] font-serif font-bold leading-[0.9] tracking-[-0.03em] text-[#E8E4DF]">
                            We build
                        </h1>
                    </div>
                    <div className="overflow-hidden" style={{ perspective: "600px" }}>
                        <h1 className="hero-line text-[14vw] md:text-[10vw] font-serif font-bold leading-[0.9] tracking-[-0.03em]">
                            <span className="text-[#C5FB45]">digital</span>
                        </h1>
                    </div>
                    <div className="overflow-hidden" style={{ perspective: "600px" }}>
                        <h1 className="hero-line text-[14vw] md:text-[10vw] font-serif italic font-bold leading-[0.9] tracking-[-0.03em] text-[#E8E4DF]">
                            experiences.
                        </h1>
                    </div>
                </div>

                <div className="flex items-end justify-between">
                    <p
                        ref={subtitleRef}
                        className="text-sm md:text-lg text-[#888] max-w-lg leading-relaxed tracking-wide opacity-0"
                    >
                        Agencia de desarrollo web y diseño digital. Lima, Perú.
                    </p>

                    <div
                        ref={scrollIndicatorRef}
                        className="flex flex-col items-center gap-4 opacity-0"
                    >
                        <span className="text-[10px] uppercase tracking-[0.3em] text-[#666]">
                            Scroll
                        </span>
                        <div className="w-[1px] h-16 bg-[#333] relative overflow-hidden">
                            <div
                                className="absolute top-0 left-0 w-full h-full bg-[#C5FB45]"
                                style={{ animation: "scrollLine 2s ease-in-out infinite" }}
                            />
                        </div>
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
