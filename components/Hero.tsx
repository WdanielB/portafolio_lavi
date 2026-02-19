"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const scrollIndicatorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 3.2 });

            // Animate each line of the heading
            const lines = headingRef.current?.querySelectorAll(".hero-line");
            if (lines) {
                lines.forEach((line, i) => {
                    tl.fromTo(
                        line,
                        { y: "100%", rotateX: -40 },
                        {
                            y: "0%",
                            rotateX: 0,
                            duration: 1.2,
                            ease: "power4.out",
                        },
                        i * 0.15
                    );
                });
            }

            // Subtitle
            tl.fromTo(
                subtitleRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                "-=0.5"
            );

            // Scroll indicator
            tl.fromTo(
                scrollIndicatorRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.6 },
                "-=0.3"
            );

            // Parallax on scroll
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
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative h-screen flex flex-col justify-end pb-16 px-8 md:px-16 overflow-hidden"
        >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F] via-[#0F0F0F] to-[#1a1a1a]" />

            {/* Accent circle */}
            <div className="absolute top-1/4 right-[-10%] w-[600px] h-[600px] rounded-full bg-[#C5FB45]/5 blur-[120px]" />

            <div ref={headingRef} className="relative z-10 mb-8">
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
                    className="text-sm md:text-base text-[#666] max-w-md leading-relaxed tracking-wide opacity-0"
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
                        <div className="absolute top-0 left-0 w-full h-full bg-[#C5FB45] animate-pulse"
                            style={{ animation: "scrollLine 2s ease-in-out infinite" }} />
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
